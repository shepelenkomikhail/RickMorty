import { useEffect, useState } from "react";
import CharacterType from "../Types/CharacterType.ts";
import {Box, Center, Heading, Image, Text} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export default function CharacterDetails() {
    const [character, setCharacter] = useState<CharacterType | null>(null);
    const location = useLocation();
    const { id } = location.state;
    console.log(id);

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
            fetchCharacter(id);
        }
    }, [id]);

    if (!character) {
        return <Text>Loading...</Text>;
    }

    return (
        <Center mt={24}>
            <Box borderWidth={1} p={6} borderRadius={'lg'} boxShadow={'lg'}
                 align={'center'} justify={'center'}>
                <Heading>{character.name}</Heading>
                <Image src={character.image} alt={character.name} borderRadius={'lg'} />
                <Text><b>Species:</b> {character.species}</Text>
                <Text><b>Status:</b> {character.status}</Text>
                <Text><b>Gender:</b> {character.gender}</Text>
                <Text><b>Origin:</b> {character.origin.name}</Text>
            </Box>
        </Center>
    );
}
