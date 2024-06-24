import {Box, Text} from "@chakra-ui/react";

export default function Footer() {
    return (
        <footer>
            <Box align={"center"} borderTop={'1px'} borderColor={'gray.200'}
                 mt={2} pt={2} pb={2} bg={'teal.100'}>
                <Text as={'b'}>By Mykhailo Shepelenko</Text>
            </Box>
        </footer>
    );
}