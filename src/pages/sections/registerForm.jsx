import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    Text,
    SimpleGrid,
    Button,
    TagLabel,
    Image,
} from '@chakra-ui/react';

const registerForm = () => {
    return (
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
                    <Input placeholder='Username' />
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
                    Already on Binotify? Log in
                </Text>
            </SimpleGrid>
        </VStack>
    );
};

export default registerForm;
