import { Parc } from "./Parc";

export class Mesure {
    public id: number | undefined;
    public aqi: number | undefined;
    public temperature: number | undefined;
    public humidite: number | undefined;
    public dateHeure: Date | undefined;

    public parc: Parc | undefined;

    constructor() {
        
    }
}