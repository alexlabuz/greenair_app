import { Parc } from "./Parc";

export class Mesure {
    public aqi: number | undefined;
    public temperature: number | undefined;
    public humidite: number | undefined;
    public date: Date | undefined;

    public parc: Parc | undefined;

    constructor() {
        
    }
}