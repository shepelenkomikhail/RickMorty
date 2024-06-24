import {ChakraProvider} from "@chakra-ui/react";
import Footer from "./Components/Footer.tsx";
import Header from "./Components/Header.tsx";
import Search from "./Components/Search.tsx";
import CardList from "./Components/CardList.tsx";

export default function App() {
    return (
        <ChakraProvider>
            <Header />
            <Search />
            <CardList />
            <Footer />
        </ChakraProvider>
    )
}
