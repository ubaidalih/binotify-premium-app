import React, { useCallback } from 'react';
import { useState } from 'react';
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
} from '@chakra-ui/react';
import { register } from '../service/user';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const linkToSubscription = useCallback(
        () => navigate('/Subscription', { replace: true }),
        [navigate]
    );
    const linkToPenyanyi = useCallback(
        () => navigate('/SongList', { replace: true }),
        [navigate]
    );

    const handleInput = async (event) => {
        switch (event.target.name) {
            case 'email':
                setEmail(event.target.value);
                break;
            case 'username':
                setUsername(event.target.value);
                break;
            case 'name':
                setName(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
            case 'password2':
                setPassword2(event.target.value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        if (
            email === '' ||
            username === '' ||
            name === '' ||
            password === '' ||
            password2 === ''
        ) {
            alert('Data is missing');
            return;
        }
        if (password !== password2) {
            alert('Password do not match');
            return;
        }
        const email_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const username_format = /^[a-zA-Z0-9_]+$/;
        if (!email.match(email_format)) {
            alert('Email is not valid');
            return;
        }
        if (!username.match(username_format)) {
            alert('Username is not valid');
            return;
        }
        event.preventDefault();
        const data = {
            email: email,
            username: username,
            name: name,
            password: password,
        };
        const response = await register(data);
        if (response.data.message === 'Register success') {
            alert('Register success');
            const cookies = new Cookies();
            cookies.set('token', response.data.token, { path: '/' });
            const decoded = jwt_decode(response.data.token);
            if (decoded.isAdmin) {
                // link to page subscription
                linkToSubscription();
            } else {
                // link to page list lagu
                linkToPenyanyi();
            }
        } else {
            alert(response.data.message);
        }
    };
    return (
        <Container maxWidth='100%' height='100vh' overflow='scroll'>
            <Container
                maxWidth={{ base: '100%', md: '50%', sm: '100%' }}
                marginLeft={{ base: '0%', md: '50%', sm: '0%' }}
            >
                <VStack height='100%'>
                    <VStack
                        w='full'
                        h='full'
                        paddingRight={[5, 16, 20, 32, 40, 56]}
                        paddingLeft={[5, 16, 20, 32, 40, 56]}
                        spacing={10}
                        paddingTop={28}
                        paddingBottom={28}
                        bg='#121212'
                    >
                        <Image src='src\assets\Binotifylogo.png' />
                        <VStack spacing={3} alignItems='flex-start'>
                            <Heading size='2xl' color='white'>
                                Sign up for a Binotify account.
                            </Heading>
                        </VStack>
                        <SimpleGrid w='full' rowGap={5}>
                            <FormControl>
                                <Input
                                    placeholder='Username'
                                    name='username'
                                    value={username}
                                    onChange={handleInput}
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    placeholder='Name'
                                    name='name'
                                    value={name}
                                    onChange={handleInput}
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    placeholder='Email'
                                    name='email'
                                    value={email}
                                    onChange={handleInput}
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    placeholder='Password'
                                    name='password'
                                    value={password}
                                    onChange={handleInput}
                                    type={show ? 'text' : 'password'}
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    placeholder='Confirm Password'
                                    name='password2'
                                    value={password2}
                                    onChange={handleInput}
                                    type={show ? 'text' : 'password'}
                                />
                            </FormControl>
                            <Button size='lg' w='full' onClick={handleSubmit}>
                                Sign Up
                            </Button>
                            <Text color='brand.500'> OR </Text>
                            <Text color='brand.500' textAlign='center'>
                                Already on Binotify?
                            </Text>
                            <Text color='brand.200' textAlign='center'>
                                <button color='white'>
                                    <Link to={`/`}>Log in</Link>
                                </button>
                            </Text>
                        </SimpleGrid>
                    </VStack>
                </VStack>
            </Container>
        </Container>
    );
};

export default Register;
