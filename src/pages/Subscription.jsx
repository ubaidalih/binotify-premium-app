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
    cookieStorageManager,
} from '@chakra-ui/react';
import { read, remove } from '../service/song';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { approval, reject, getSubs } from '../service/subscription';
import ReactPaginate from 'react-paginate';

export const Subscription = () => {
    function Items({ currentItems }) {
        return (
            <>
                {currentItems &&
                    currentItems.map((item) => (
                        <div>
                            <h3>Item #{item}</h3>
                        </div>
                    ))}
            </>
        );
    }

    function PaginatedItems({ itemsPerPage }) {
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        // Simulate fetching items from another resources.
        // (This could be items from props; or items loaded in a local state
        // from an API endpoint with useEffect and useState)
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const currentItems = items.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(items.length / itemsPerPage);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };
        return (
            <>
                <Items currentItems={currentItems} />
                <ReactPaginate
                    breakLabel='...'
                    nextLabel='next >'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel='< previous'
                    renderOnZeroPageCount={null}
                />
            </>
        );
    }

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

    return (
        // tambah header, judul, dan tombol tambah lagu
        <div>
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
                        {subs.map((subs, index) => (
                            <Tr key={subs.creator_id}>
                                <Td>{index + 1}</Td>
                                <Td>{subs.subscriber_id}</Td>
                                <Td>{subs.status}</Td>
                                <Td>
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
            </TableContainer>
            <PaginatedItems itemsPerPage={5} />
        </div>
    );
};

export default Subscription;
