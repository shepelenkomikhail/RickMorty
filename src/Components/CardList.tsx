import { Wrap, Spinner, Center, Button, ButtonGroup } from "@chakra-ui/react";
import ResponseType from "../Types/ResponseType.ts";
import { useEffect, useState } from "react";
import CharacterType from "../Types/CharacterType.ts";
import CharacterCard from "./CharacterCard.tsx";

export default function CardList() {
    const [characters, setCharacters] = useState<CharacterType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = 42;
    const maxVisibleButtons = 6;

    const fetchData = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch('https://rickandmortyapi.com/api/character/?page=' + page);
            if (!response.ok) {
                throw new Error('Data fetch went wrong!');
            }
            const data: ResponseType = await response.json();
            setCharacters(data.results);
            console.log(data.results);
        } catch (err) {
            setError('Error fetching data');
        } finally {
            setTimeout(() =>{setLoading(false)}, 1000);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const createButtons = () => {
        const buttons = [];
        let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
        let endPage = Math.min(totalPages, currentPage + Math.floor(maxVisibleButtons / 2));

        if (currentPage <= Math.floor(maxVisibleButtons / 2)) {
            endPage = Math.min(totalPages, maxVisibleButtons);
        }

        if (currentPage > totalPages - Math.floor(maxVisibleButtons / 2)) {
            startPage = Math.max(1, totalPages - maxVisibleButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <Button
                    key={i}
                    variant={i === currentPage ? 'solid' : 'outline'}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </Button>
            );
        }
        return buttons;
    };

    const buttons = createButtons();

    if (loading) {
        return <Center m={8}><Spinner size={'xl'} /></Center>;
    }
    if (error) {
        return <Center>{error}</Center>;
    }
    return (
        <>
            <Wrap align={'center'} justify={'center'} mb={4} mx={6} spacing={4}>
                {characters.map((character: CharacterType) => {
                    return <CharacterCard
                        key={character.id}
                        image={character.image}
                        name={character.name}
                        species={character.species}
                        status={character.status}
                    />
                })}
            </Wrap>
            <Center>
                <ButtonGroup variant='outline' spacing='2' mb={2}>
                    {currentPage > 1 && (
                        <Button onClick={() => setCurrentPage(currentPage - 1)}>{'<'}</Button>
                    )}
                    {buttons}
                    {currentPage < totalPages && (
                        <Button onClick={() => setCurrentPage(currentPage + 1)}>{'>'}</Button>
                    )}
                </ButtonGroup>
            </Center>
        </>
    );
}
