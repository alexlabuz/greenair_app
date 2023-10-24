import { Parc } from "./Parc";

export class Ville {
    public nom: String | undefined;
    public latitude: number | undefined;
    public longitude: number | undefined;

    public parcs: Parc[] | undefined;

    constructor() {
        
    }
}