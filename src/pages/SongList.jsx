import React, { useCallback } from 'react';
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
    const [songs, setSong] = useState([]);
    useEffect(() => {
        getSongs();
    }, []);
    const navigate = useNavigate();
    const linkToPenyanyi = useCallback(
        () => navigate('/SongList', { replace: true }),
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

    const handleEdit = async (id) => {};

    return (
        // tambah header, judul, dan tombol tambah lagu
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>No.</Th>
                        <Th>Title</Th>
                        <Th>Audio Path</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {songs.map((song, index) => (
                        <Tr key={song.song_id}>
                            <Td>{index + 1}</Td>
                            <Td>{song.judul}</Td>
                            <Td>{song.audio_path}</Td>
                            <Td>
                                <Button
                                    colorScheme='blue'
                                    onClick={() => handleEdit(song.song_id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    colorScheme='red'
                                    onClick={() => handleDelete(song.song_id)}
                                >
                                    Delete
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default SongList;
