import {
    FormControl,
    Input,
    VStack,
    Heading,
    Text,
    SimpleGrid,
    Button,
    Image,
} from '@chakra-ui/react';

const loginForm = () => {
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
                    Music for Everyone
                </Heading>
            </VStack>
            <SimpleGrid w='full' rowGap={5}>
                <FormControl>
                    <Input placeholder='Email' />
                </FormControl>
                <FormControl>
                    <Input placeholder='Password' />
                </FormControl>

                <Button size='lg' w='full'>
                    LOG IN
                </Button>
                <Text color='brand.500'> OR </Text>
                <Text color='brand.500' textAlign='center'>
                    Don't have an account? Sign up now!
                </Text>
            </SimpleGrid>
        </VStack>
    );
};

export default loginForm;
