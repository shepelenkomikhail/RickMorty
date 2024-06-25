import {ChakraProvider} from "@chakra-ui/react";
import Footer from "./Components/Footer.tsx";
import Header from "./Components/Header.tsx";
import CardList from "./Components/CardList.tsx";
import MyProvider from "./Context/MyProvider.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterDetails from "./Components/CharacterDetails.tsx";

export default function App() {
    return (
        <ChakraProvider>
            <MyProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Header />
                                <CardList />
                                <Footer />
                            </>
                        }/>
                        <Route path='/character' element={<CharacterDetails />}/>
                    </Routes>
                </Router>
            </MyProvider>
        </ChakraProvider>
    )
}
