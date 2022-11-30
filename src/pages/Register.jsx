import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

export const Register = () => {
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
                                <Input placeholder='Full Name' />
                            </FormControl>
                            <FormControl>
                                <Input placeholder='Username' />
                            </FormControl>
                            <FormControl>
                                <Input placeholder='Name' />
                            </FormControl>
                            <FormControl>
                                <Input placeholder='Email' />
                            </FormControl>
                            <FormControl>
                                <Input placeholder='Password' />
                            </FormControl>
                            <FormControl>
                                <Input placeholder='Confirm Password' />
                            </FormControl>
                            <Button size='lg' w='full'>
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
                </Flex>
            </Container>
        </Container>
    );
};

export default Register;
