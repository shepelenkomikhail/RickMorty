import {Box, Image} from "@chakra-ui/react";

export default function Header() {
    return (
        <header>
            <Box bg={'teal.100'} borderBottom={'1px'} borderColor={'cyan.200'}>
                <a href={'https://rickandmortyapi.com/'} target={'_blank'}>
                    <Image src={'/images/rm.png'} w={1/6} ml={2}/>
                </a>
            </Box>
        </header>
    )
}