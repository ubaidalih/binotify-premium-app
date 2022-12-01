import React, { useCallback } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
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
} from '@chakra-ui/react';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import {update} from '../service/song';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import {useLocation} from 'react-router-dom';

export const EditSong = () => {
    const [judul, setJudul] = useState('');
    const [audio, setAudio] = useState('');
    const titleRef = useRef(null);
    const fileRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const linkToPenyanyi = useCallback(
        () => navigate('/SongList', { replace: true }),
        [navigate]
    );
    const handleInput = async (event) => {
        switch(event.target.name) {
            case 'judul':
                setJudul(event.target.value);
                break;
            case 'audio':
                setAudio(event.target.value);
                break;
            default:
                break;
        }
    }
    const handleSubmit = async (event) => {
        if(judul === '' && fileRef.current.files[0].size === 0) {
            alert('Data is missing');
            return;
        }
        event.preventDefault();
        const cookies = new Cookies();
        const token = cookies.get('token');
        const decoded = jwt_decode(token);
        const config = {
            headers: {
                authorization: token,
                'Accept': "multipart/form-data",
                'Content-Type' : "multipart/form-data"
            },
        }
        var formData = new FormData();
        formData.append("audio", fileRef.current.files[0]);
        formData.append("judul", judul);
        formData.append("song_id", location.state.id);
        const response = await update(formData, config);
        if(response) {
            alert('Succeed to edit song');
            linkToPenyanyi()
        } else {
            alert("Failed to edit song.")
        }
    }

    return (
        <Container maxWidth='100%' height='100vh' overflow='scroll'>
            <Container
                maxWidth={{ base: '100%', md: '50%', sm: '100%' }}
                marginLeft={{ base: '0%', md: '50%', sm: '0%' }}
            >
                <VStack height='100%'>
                    <VStack
                        w='full'
                        h='full'
                        paddingRight={[5, 16, 20, 32, 40, 56]}
                        paddingLeft={[5, 16, 20, 32, 40, 56]}
                        paddingBottom={28}
                        spacing={10}
                        paddingTop={28}
                        bg='#121212'
                    >
                        <Image src='src\assets\Binotifylogo.png' />
                        <VStack spacing={3} alignItems='flex-start'>
                            <Heading size='2xl' color='white'>
                                EDIT Song
                            </Heading>
                        </VStack>
                        <SimpleGrid w='full' rowGap={5}>
                            <FormControl>
                                <Input placeholder='Judul' name='judul' value={judul} onChange={handleInput} />
                            </FormControl>
                            <FormControl>
                                <Input type="file" name='audio' ref={fileRef} accept=".mp3"/>
                            </FormControl>

                            <Button size='lg' w='full' onClick={handleSubmit}>
                                {/* <Link to={`Index/`}></Link> */}
                                EDIT SONG
                            </Button>
                        </SimpleGrid>
                    </VStack>
                </VStack>
            </Container>
        </Container>
    );
};

export default EditSong;
