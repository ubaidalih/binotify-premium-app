import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './pages/Login';

function App() {
    const [count, setCount] = useState(0);

    return (
        <ChakraProvider>
            <Login />
        </ChakraProvider>
    );
}

export default App;
