import { Wrap, Spinner, Center, Button, ButtonGroup, Input } from "@chakra-ui/react";
import ResponseType from "../Types/ResponseType.ts";
import { useContext, useEffect, useState } from "react";
import CharacterType from "../Types/CharacterType.ts";
import CharacterCard from "./CharacterCard.tsx";
import { MyContext } from "../Context/MyProvider.tsx";

function search(query: string, characters: CharacterType[]) {
    return characters.filter((character: CharacterType) => {
        return character.name.toLowerCase().includes(query.toLowerCase());
    });
}

export default function CardList() {
    const [characters, setCharacters] = useState<CharacterType[]>([]);
    const [filteredCharacters, setFilteredCharacters] = useState<CharacterType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = 42;
    const maxVisibleButtons = 6;

    const context = useContext(MyContext);
    const { loading, setLoading } = context;

    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        if (query !== '') {
            setFilteredCharacters(search(query, characters));
        } else {
            setFilteredCharacters(characters);
        }
    }, [query, characters]);

    const fetchData = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch('https://rickandmortyapi.com/api/character/?page=' + page);
            if (!response.ok) {
                throw new Error('Data fetch went wrong!');
            }
            const data: ResponseType = await response.json();
            setCharacters(data.results);
            setFilteredCharacters(data.results);
        } catch (err) {
            setError('Error fetching data');
        } finally {
            setTimeout(() => { setLoading(false) }, 300);
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
            <Center w={'full'} m={8}>
                <Input
                    type="text"
                    placeholder="Search.."
                    borderWidth={'1px'}
                    w={{ base: '80%', sm: '30%' }}
                    onChange={(e) => { setQuery(e.target.value) }}
                />
            </Center>
            <Wrap align={'center'} justify={'center'} mb={4} mx={6} spacing={4}>
                {filteredCharacters.map((character: CharacterType) => {
                    return <CharacterCard
                        key={character.id}
                        image={character.image}
                        name={character.name}
                        species={character.species}
                        status={character.status}
                        id={character.id}
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