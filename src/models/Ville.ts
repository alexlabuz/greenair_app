import { Parc } from "./Parc";

export class Ville {
    public id: number | undefined;
    public nom: String | undefined;
    public latitude: number | undefined;
    public longitude: number | undefined;

    public parks: Parc[] | undefined;

    constructor() {
        
    }
}