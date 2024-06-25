import {Center, Input} from "@chakra-ui/react";
import {useEffect, useState} from "react";

export default function Search() {
    const [query, setQuery] = useState<string>('');
    useEffect(() => {}, [query]);
    return (
        <Center w={'full'} m={8}>
            <Input type="text" placeholder="Search.." borderWidth={'1px'} w={'30%'}
                   onChange={(e) => {setQuery(e.target.value)}}/>
        </Center>
    )
}