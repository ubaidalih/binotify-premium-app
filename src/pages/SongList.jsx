import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import { useEffect } from 'react';
import {
    Container,
    FormControl,
    Input,
    VStack,
    Heading,
    Text,
    SimpleGrid,
    Button,
    Image,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react';
import { read, remove } from '../service/song';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';

export const SongList = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [song, setSong] = useState([]);
    useEffect(() => {
        getSongs();
    }, []);
    const navigate = useNavigate();
    const linkToEdit = useCallback(
        (song_id) =>
            navigate('/EditSong', { replace: true, state: { id: song_id } }),
        [navigate]
    );

    const getSongs = async () => {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const decoded = jwt_decode(token);
        const data = {
            creator_id: decoded.user_id,
            subscriber_id: -1,
        };
        const response = await read(data);
        setSong(response.data);
    };

    const handleDelete = async (id) => {
        // event.preventDefault();
        const cookies = new Cookies();
        const token = cookies.get('token');
        const config = {
            headers: {
                authorization: token,
            },
        };
        const data = {
            song_id: id,
        };
        const response = await remove(data, config);
        window.location.reload(false);
    };

    const handleEdit = async (id) => {
        linkToEdit(id);
    };
    const PER_PAGE = 5;
    const offset = currentPage * PER_PAGE;
    const currentPageData = (
        <TableContainer>
            <Table variant='simple'>
                <Thead bg='brand.100'>
                    <Tr>
                        <Th color='brand.500'>No.</Th>
                        <Th color='brand.500'>Title</Th>
                        <Th color='brand.500'>Audio Path</Th>
                        <Th color='brand.500'>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {song
                        .slice(offset, offset + PER_PAGE)
                        .map((song, index) => {
                            return (
                                <Tr key={song.song_id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{song.judul}</Td>
                                    <Td>{song.audio_path}</Td>
                                    <Td>
                                        <Button
                                            colorScheme='blue'
                                            onClick={() =>
                                                handleEdit(song.song_id)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            colorScheme='red'
                                            onClick={() =>
                                                handleDelete(song.song_id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </Td>
                                </Tr>
                            );
                        })}
                </Tbody>
            </Table>
        </TableContainer>
    );
    const pageCount = Math.ceil(song.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    return (
        <div>
            <Container maxWidth='100%' height='100vh'>
                {currentPageData}
                <ReactPaginate
                    previousLabel={'PREVIOUS'}
                    nextLabel={'NEXT'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
            </Container>
        </div>
    );
};

export default SongList;
