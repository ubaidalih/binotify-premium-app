import React, { useContext } from 'react';
import { Container, Flex, VStack } from '@chakra-ui/react';
import Forms from './sections/registerForm.jsx';
var username = '',
    password = '';

export const Login = () => {
    return (
        <Container maxWidth='100%' bg='gray'>
            <Container
                maxWidth={{ base: '100%', md: '50%', sm: '100%' }}
                marginLeft={{ base: '0%', md: '50%', sm: '0%' }}
                bg='#121212'
            >
                <Flex h='100vh'>
                    <Forms />
                </Flex>
            </Container>
        </Container>
    );
};
