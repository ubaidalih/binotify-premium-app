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
import {
    ArrowRightIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
} from '@chakra-ui/icons';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { approval, reject, getSubs } from '../service/subscription';
import { useTable, usePagination } from 'react-table';

export const Subscription = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [subs, setSubs] = useState([]);
    useEffect(() => {
        getSubscriber();
    }, []);
    const items = subs;

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
    };
    const PER_PAGE = 5;
    const offset = currentPage * PER_PAGE;
    const currentPageData = (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Artist</Th>
                        <Th>User</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {subs
                        .slice(offset, offset + PER_PAGE)
                        .map((subs, index) => {
                            return (
                                <Tr key={subs.creator_id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{subs.subscriber_id}</Td>
                                    <Td>{subs.status}</Td>
                                    <Td>
                                        {' '}
                                        <Button
                                            colorScheme='blue'
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
    const pageCount = Math.ceil(items.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    return (
        // tambah header, judul, dan tombol tambah lagu
        <div>
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
            {/* <CustomTable columns={columns} data={subs} />
            {console.log(subs.status)} */}
            {/* <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Artist</Th>
                            <Th>User</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {' '}
                        {subs.map((subs, index) => (
                            <Tr key={subs.creator_id}>
                                <Td>{index + 1}</Td>
                                <Td>{subs.subscriber_id}</Td>
                                <Td>{subs.status}</Td>
                                <Td>
                                    {' '}
                                    <Button
                                        colorScheme='blue'
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
                        ))}
                    </Tbody>
                </Table>
            </TableContainer> */}
        </div>
    );
};

export default Subscription;
