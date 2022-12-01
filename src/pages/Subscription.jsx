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
import { approval, reject , getSubs } from '../service/subscription';

export const Subscription = () => {
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
        setSubs(response.data)
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
            subscriber_id
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
            subscriber_id 
        };

        const response = await approval(data, config);
    };

    return (
        // tambah header, judul, dan tombol tambah lagu
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
                                    onClick={() => handleAprroval(subs.creator_id, subs.subscriber_id)}
                                >
                                    Approve
                                </Button>
                                <Button
                                    colorScheme='red'
                                    onClick={() => handleReject(subs.creator_id, subs.subscriber_id)}
                                >
                                    Reject
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default Subscription;
