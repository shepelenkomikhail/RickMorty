import {Card, CardHeader, CardBody, Image, Heading, Text, Flex} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";
interface CharacterCardProps {
    image: string,
    name: string,
    species: string,
    status: string,
    id: number
}
export default function CharacterCard({image, name, species, status, id}: CharacterCardProps) {
    const navigate = useNavigate();

    return (
        <Card w={250} _hover={{transform: 'scale(1.01)', cursor: "pointer"}}
              onClick={()=>{navigate('/character', {state: {id}})}}>
            <CardHeader p={0}>
                <Image src={image} alt={name + 'Image'} rounded={'md'}></Image>
            </CardHeader>
            <CardBody pt={4} bg={'gray.50'}>
                <Flex alignItems={'center'} justifyContent={'center'} direction={'column'}>
                    <Heading fontSize={'xl'} mb={2}>{name}</Heading>
                    <Text><b>Species:</b> {species}</Text>
                    <Text><b>Status:</b> {status}</Text>
                </Flex>
            </CardBody>
        </Card>
    );
}