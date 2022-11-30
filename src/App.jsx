import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './pages/Login';

import theme from './themes/';
import './themes/styles.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <ChakraProvider theme={theme}>
            <div bgGradient='linear(to-b, black.200, grey.500'>
                <Login />
                {/* <Register /> */}
            </div>
        </ChakraProvider>
    );
}

export default App;
