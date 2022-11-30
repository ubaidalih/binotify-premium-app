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
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import {login} from '../service/user';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';

export const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const linkToIndex = useCallback(
        () => navigate('/Index', { replace: true }),
        [navigate]
    );
    const handleInput = async (event) => {
        switch(event.target.name) {
            case 'email':
                setEmail(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
            default:
                break;
        }
    }
    const handleSubmit = async (event) => {
        if(email === '' || password === '') {
            alert('Data is missing');
            return;
        }
        event.preventDefault();
        const data = {
            email: email,
            password: password,
        }
        const response = await login(data);
        if(response.data.message === "Login success") {
            alert('Login success')
            const cookies = new Cookies();
            cookies.set('token', response.data.token, { path: '/' });
            console.log(cookies.get('token'));
            const decoded = jwt_decode(response.data.token)
            if(decoded.isAdmin){
                // link to page subscription
                linkToIndex()
            }
            else{
                // link to page list lagu
                linkToIndex()
            }
        } else {
            alert(response.data.message)
        }
    }

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
                        paddingBottom={28}
                        spacing={10}
                        paddingTop={28}
                        bg='#121212'
                    >
                        <Image src='src\assets\Binotifylogo.png' />
                        <VStack spacing={3} alignItems='flex-start'>
                            <Heading size='2xl' color='white'>
                                Music for Everyone
                            </Heading>
                        </VStack>
                        <SimpleGrid w='full' rowGap={5}>
                            <FormControl>
                                <Input placeholder='Email' name='email' value={email} onChange={handleInput} />
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Input
                                        type={show ? 'text' : 'password'}
                                        placeholder='Password'
                                        name='password' value={password} onChange={handleInput}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button
                                            h='1.75rem'
                                            size='sm'
                                            onClick={handleClick}
                                            borderRadius='none'
                                            bgColor='brand.400'
                                            color='white'
                                        >
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <Button size='lg' w='full' onClick={handleSubmit}>
                                {/* <Link to={`Index/`}></Link> */}
                                LOG IN
                            </Button>
                            <Text color='brand.500'> OR </Text>

                            <Text color='brand.500' textAlign='center'>
                                Don't have an account?
                            </Text>
                            <Text color='brand.200' textAlign='center'>
                                <button color='white'>
                                    <Link to={`Register/`}>Sign up!</Link>
                                </button>
                            </Text>
                        </SimpleGrid>
                    </VStack>
                </VStack>
            </Container>
        </Container>
    );
};

export default Login;
