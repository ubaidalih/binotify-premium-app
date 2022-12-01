import React, { useCallback, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import {
    Container,
    FormControl,
    Input,
    VStack,
    Heading,
    Flex,
    Tooltip,
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
} from '@chakra-ui/react';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { approval, reject, getSubs } from '../service/subscription';
import '../themes/pagination.css';

export const Subscription = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [subs, setSubs] = useState([]);
    useEffect(() => {
        getSubscriber();
    }, []);

    const getSubscriber = async () => {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const decoded = jwt_decode(token);
        const config = {
            headers: {
                authorization: token,
            },
        };
        const response = await getSubs(config);
        setSubs(response.data);
    };

    const handleReject = async (creator_id, subscriber_id) => {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const config = {
            headers: {
                authorization: token,
            },
        };
        const data = {
            creator_id,
            subscriber_id,
        };
        const response = await reject(data, config);
        window.location.reload(false);
    };

    const handleAprroval = async (creator_id, subscriber_id) => {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const config = {
            headers: {
                authorization: token,
            },
        };
        const data = {
            creator_id,
            subscriber_id,
        };

        const response = await approval(data, config);
        window.location.reload(false);
    };
    const PER_PAGE = 5;
    const offset = currentPage * PER_PAGE;
    const currentPageData = (
        <TableContainer>
            <Table variant='simple'>
                <Thead bg='brand.100' maxWidth='100%'>
                    <Tr>
                        <Th color='brand.500'>Artist</Th>
                        <Th color='brand.500'>User</Th>
                        <Th color='brand.500'>Status</Th>
                        <Th color='brand.500'>Action</Th>
                    </Tr>
                </Thead>
                <Tbody color='brand.500'>
                    {subs
                        .filter((subs) => subs.status === 'PENDING')
                        .slice(offset, offset + PER_PAGE)
                        .map((subs, index) => {
                            return (
                                <Tr key={subs.creator_id} bg='black'>
                                    <Td>{index + 1}</Td>
                                    <Td>{subs.subscriber_id}</Td>
                                    <Td>{subs.status}</Td>
                                    <Td>
                                        {' '}
                                        <Button
                                            colorScheme='blue'
                                            borderRadius='none'
                                            onClick={() =>
                                                handleAprroval(
                                                    subs.creator_id,
                                                    subs.subscriber_id
                                                )
                                            }
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            colorScheme='red'
                                            borderRadius='none'
                                            _hover={{
                                                bg: 'red',
                                                color: 'white',
                                            }}
                                            onClick={() =>
                                                handleReject(
                                                    subs.creator_id,
                                                    subs.subscriber_id
                                                )
                                            }
                                        >
                                            Reject
                                        </Button>
                                    </Td>
                                </Tr>
                            );
                        })}
                </Tbody>
            </Table>
        </TableContainer>
    );
    const pageCount = Math.ceil(subs.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    return (
        // tambah header, judul, dan tombol tambah lagu
        <div>
            <Container maxWidth='100%' height='100vh'>
                {currentPageData}
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
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

export default Subscription;
