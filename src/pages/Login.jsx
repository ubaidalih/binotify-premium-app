import React, { useContext } from 'react';
import { Container, Flex, VStack } from '@chakra-ui/react';

var username = '',
    password = '';

export const Login = () => {
    return (
        <Container maxWidth='container.xl' p={0} bg='red'>
            <Flex h='100vh' py={20}>
                <VStack
                    w='full'
                    h='full'
                    p={10}
                    spacing={10}
                    alignItems='flex-start'
                    bg='grey'
                ></VStack>
                <VStack
                    w='full'
                    h='full'
                    p={10}
                    spacing={10}
                    alignItems='flex-start'
                    bg='black'
                ></VStack>
            </Flex>
        </Container>
    );
};
