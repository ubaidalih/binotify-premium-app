import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
// import Songs from './pages/Songs';
import { SongList } from './pages/SongList';
import { AddSong } from './pages/AddSong';
import { EditSong } from './pages/EditSong';
import Index from './pages/Index';
import { Navbar } from './Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './themes/';
import './themes/styles.css';
import image from './assets/turnpike-blur.jpg';
import { LayoutGroup } from 'framer-motion';
import {Subscription} from './pages/Subscription';

function App() {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    };

    return (
        <ChakraProvider theme={theme}>
            <div
                className='App'
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Login />}></Route>
                        <Route path='/Register' element={<Register />} />
                        <Route path='/Index' element={<Index />} />
                        <Route path='/SongList' element={<><Navbar /><SongList /></>} />
                        <Route path='/AddSong' element={<><Navbar /><AddSong /></>} />
                        <Route path='/EditSong' element={<><Navbar /><EditSong /></>} />
                        <Route path='/Subscription' element={<><Navbar /><Subscription /></>} />

                    </Routes>
                </BrowserRouter>
            </div>
        </ChakraProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
