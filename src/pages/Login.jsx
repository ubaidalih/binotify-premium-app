import React, { useCallback } from 'react';
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

export const Login = () => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const linkToIndex = useCallback(
        () => navigate('/Index', { replace: true }),
        [navigate]
    );

    return (
        <Container maxWidth='100%'>
            <Container
                maxWidth={{ base: '100%', md: '50%', sm: '100%' }}
                marginLeft={{ base: '0%', md: '50%', sm: '0%' }}
            >
                <VStack h='100vh'>
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
                                Music for Everyone
                            </Heading>
                        </VStack>
                        <SimpleGrid w='full' rowGap={5}>
                            <FormControl>
                                <Input placeholder='Email' />
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Input
                                        type={show ? 'text' : 'password'}
                                        placeholder='Password'
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

                            <Button size='lg' w='full' onClick={linkToIndex}>
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
