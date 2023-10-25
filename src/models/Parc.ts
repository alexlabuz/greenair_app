import { Mesure } from "./Mesure";
import { Ville } from "./Ville";

export class Parc {
    public id: number | undefined;
    public nom: string | undefined;
    public latitude: number | undefined;
    public longitude: number | undefined;

    public ville: Ville | undefined;
    public mesures: Mesure[] | undefined;

    constructor() {
        
    }

    public get lastMesure(): Mesure | undefined {
        return this.mesures![0];
    }
}