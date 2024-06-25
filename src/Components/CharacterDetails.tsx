import {useContext, useEffect, useState} from "react";
import CharacterType from "../Types/CharacterType.ts";
import {Box, Button, Center, Flex, Heading, Image, Spinner, Text} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {ArrowBackIcon} from '@chakra-ui/icons';
import {MyContext} from "../Context/MyProvider.tsx";

export default function CharacterDetails() {
    const [character, setCharacter] = useState<CharacterType | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state;

    const context = useContext(MyContext);
    const { setLoading } = context;

    const fetchCharacter = async (id: number) => {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/character/' + id);
            if (!response.ok) {
                throw new Error('Data fetch went wrong!');
            }
            const data: CharacterType = await response.json();
            setCharacter(data);
        } catch (err) {
            console.log('Error fetching data', err);
        }
    };

    useEffect(() => {
        if (id) {
            setLoading(false);
            fetchCharacter(id);
        }
    }, [id]);

    if (!character) {
        return <Center m={8}><Spinner size={'xl'} /></Center>;
    }

    return (
        <>
            <Header/>
            <Center my={10}>
                <Box borderWidth={1} p={6} borderRadius={'lg'} boxShadow={'lg'}
                     align={'center'} justify={'center'} position="relative">
                    <Flex width="100%" align="center" position='absolute' top={0} left={0} transform={'translate(-8%, -25%)'}>
                        <Button
                            onClick={() => navigate(-1)}
                            mr={4}
                            variant={'solid'}
                            bg={'teal.100'}
                        ><ArrowBackIcon mr={2} />Back</Button>
                    </Flex>
                    <Heading flex="1" textAlign="center">{character.name}</Heading>
                    <Image src={character.image} alt={character.name} borderRadius={'lg'} my={4} />
                    <Text><b>Species:</b> {character.species}</Text>
                    <Text><b>Status:</b> {character.status}</Text>
                    <Text><b>Gender:</b> {character.gender}</Text>
                    <Text><b>Origin:</b> {character.origin.name}</Text>
                    <Text><b>Location:</b> {character.location.name}</Text>
                    <Text>{character.type !== '' && <b>Type:</b>} {character.type}</Text>
                    <Text><b>Created:</b> {new Date(character.created).toLocaleString()}</Text>
                </Box>
            </Center>
            <Footer/>
        </>
    );
}
