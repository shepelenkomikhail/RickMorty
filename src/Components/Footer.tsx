import {Flex, Text} from "@chakra-ui/react";
import {useContext} from "react";
import {MyContext} from "../Context/MyProvider.tsx";

export default function Footer() {
    const context = useContext(MyContext);
    const { loading } = context;

    return (
        <footer style={loading ? {position: 'fixed', bottom: 0, width: '100%'} : {} }>
            <Flex alignItems={"center"} justifyContent={'center'} borderTop={'1px'} borderColor={'gray.200'}
                 mt={2} pt={2} pb={2} bg={'teal.100'}>
                <Text as={'b'}>By Mykhailo Shepelenko</Text>
            </Flex>
        </footer>
    );
}