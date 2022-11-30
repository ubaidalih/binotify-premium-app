import React, { useState } from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import theme from './themes/';
import './themes/styles.css';
import image from './assets/turnpike-blur.jpg';

function App() {
    const [currentForm, setCurrentForm] = useState('register');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    };

    return (
        <ChakraProvider theme={theme}>
            <div
                className='App'
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {currentForm === 'login' ? (
                    <Login onFormSwitch={toggleForm} />
                ) : (
                    <Register onFormSwitch={toggleForm} />
                )}
            </div>
        </ChakraProvider>
    );
}

export default App;
