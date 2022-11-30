import React, { useContext } from 'react';
import { useState } from 'react';
import {
    Container,
    Flex,
    FormControl,
    Input,
    VStack,
    Heading,
    Text,
    SimpleGrid,
    Button,
    Image,
} from '@chakra-ui/react';
import {register} from '../service/user';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleInput = async (event) => {
        switch(event.target.name) {
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
    }

    const handleSubmit = async (event) => {
        if(email === '' || username === '' || name === '' || password === '' || password2 === '') {
            alert('Data is missing');
            return;
        }
        if(password !== password2) {
            alert('Password do not match')
            return;
        }
        const email_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const username_format = /^[a-zA-Z0-9_]+$/
        if(!email.match(email_format)) {
            alert('Email is not valid');
            return;
        }
        if(!username.match(username_format)) {
            alert('Username is not valid');
            return;
        }
        event.preventDefault();
        const data = {
            email: email,
            username: username,
            name: name,
            password: password,
        }
        const response = await register(data);
        if(response.data.message === "Register success") {
            alert('Register success')
        } else if (response.data.message === "Email or username already exist") {
            alert("Email or username already exist")
        } else{
            alert('Register failed')
        }
    }
    return (
        <Container maxWidth='100%'>
            <Container
                maxWidth={{ base: '100%', md: '50%', sm: '100%' }}
                marginLeft={{ base: '0%', md: '50%', sm: '0%' }}
            >
                <Flex h='100vh'>
                    <VStack
                        w='full'
                        h='full'
                        paddingRight={[5, 16, 20, 32, 40, 56]}
                        paddingLeft={[5, 16, 20, 32, 40, 56]}
                        spacing={10}
                        paddingTop={28}
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
                                <Input placeholder='Username' name='username' value={username} onChange={handleInput} />
                            </FormControl>
                            <FormControl>
                                <Input placeholder='Name' name='name' value={name} onChange={handleInput}/>
                            </FormControl>
                            <FormControl>
                                <Input placeholder='Email' name='email' value={email} onChange={handleInput} />
                            </FormControl>
                            <FormControl>
                                <Input placeholder='Password' name='password' value={password} onChange={handleInput} />
                            </FormControl>
                            <FormControl>
                                <Input placeholder='Confirm Password' name='password2' value={password2} onChange={handleInput} />
                            </FormControl>
                            <Button size='lg' w='full' onClick={handleSubmit}>
                                Sign Up
                            </Button>
                            <Text color='brand.500'> OR </Text>
                            <Text color='brand.500' textAlign='center'>
                                Already on Binotify?
                            </Text>
                            <Text color='brand.200' textAlign='center'>
                                <button
                                    color='white'
                                    onClick={() => props.onFormSwitch('login')}
                                >
                                    Log in
                                </button>
                            </Text>
                        </SimpleGrid>
                    </VStack>
                </Flex>
            </Container>
        </Container>
    );
};

export default Register;
