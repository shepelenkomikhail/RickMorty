import {Card, CardHeader, CardBody, Image, Heading, Text} from '@chakra-ui/react';
interface CharacterCardProps {
    image, name, species, status,
}
export default function CharacterCard({image, name, species, status}: CharacterCardProps) {
    return (
        <Card w={250} _hover={{transform: 'scale(1.01)', cursor: "pointer"}}
              onClick={()=>{console.log('Click ;-)')}}>
            <CardHeader p={0}>
                <Image src={image} alt={name + 'Image'} rounded={'md'}></Image>
            </CardHeader>
            <CardBody align={'center'} justify={'center'} pt={4} bg={'gray.50'}>
                <Heading fontSize={'xl'} mb={2}>{name}</Heading>
                <Text><b>Species:</b> {species}</Text>
                <Text><b>Status:</b> {status}</Text>
            </CardBody>
        </Card>
    );
}