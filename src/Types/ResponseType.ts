import CharacterType from "./CharacterType.ts";

export default interface ResponseType {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: CharacterType[];
}