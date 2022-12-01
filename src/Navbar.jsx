import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useColorModeValue,
    Stack,
    Image,
    Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';

const Links = ['Add Song'];
const LinksAdmin = ['Subscription'];

const NavLink = ({ children }) => (
    <Link
        px={2}
        py={1}
        bg='brand.100'
        color='brand.500'
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('black', 'gray.700'),
            color: 'brand.200',
        }}
        href={'#'}
    >
        {children}
    </Link>
);

export const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLogin, setIsLogin] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setName] = useState(false);

    useEffect(() => {
        getIsAdmin();
        getName();
    }, []);
    const getIsAdmin = async () => {
        const cookies = new Cookies();
        const token = cookies.get('token');
        setIsAdmin(jwt_decode(token).isAdmin);
    };
    const getName = async () => {
        const cookies = new Cookies();
        const token = cookies.get('token');
        setName(jwt_decode(token).name);
    };
    
    const navigate = useNavigate();
    const linkToLogin = useCallback(
        () => navigate('/', { replace: true }),
        [navigate]
    );

    const handleLogout = async (event) => {
        event.preventDefault();
        const cookies = new Cookies();
        cookies.remove('token');
        linkToLogin();
    };

    return (
        <>
            <Box bg={useColorModeValue('brand.100', 'gray.900')} px={4}>
                <Flex
                    h={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box maxWidth='150px'>
                            <Image src='src\assets\Binotifylogo.png' />
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}
                        >
                            {isAdmin
                                ? LinksAdmin.map((link) => (
                                      <NavLink key={link}>{link}</NavLink>
                                  ))
                                : Links.map((link) => (
                                      <NavLink key={link}>{link}</NavLink>
                                  ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        {/* <Button
                            variant={'solid'}
                            colorScheme={'teal'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<AddIcon />}
                        >
                            Action
                        </Button> */}
                        <Text paddingRight="20px"> {name} </Text>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}
                            >
                                <Avatar
                                    size='md'
                                    src={'src/assets/profPic.jpg'}
                                />
                            </MenuButton>
                            <MenuList
                                borderRadius='none'
                                bg='brand.50'
                                borderColor='brand.50'
                            >
                                <MenuItem color='brand.500' bg='brand.50' onClick={handleLogout}>
                                    Log out
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <Box p={4}></Box>
        </>
    );
};

export default Navbar;
