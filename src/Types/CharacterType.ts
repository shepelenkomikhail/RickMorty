import LocationType from './LocationType';
export default interface CharacterType {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: LocationType;
    location: LocationType;
    image: string;
    episode: string[];
    url: string;
    created: string;
}