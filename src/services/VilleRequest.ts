import { plainToClass } from "class-transformer";
import { baseUrl } from "../main";
import { Ville } from "../models/Ville";

export async function getAllVille(): Promise<Ville[]> {
    const response = await fetch(`${baseUrl}/ville`);
    const data = (await response.json()).items;
    return data.map((i: any) => plainToClass(Ville, i));
}

export async function getVilleById(id: string): Promise<Ville> {
    const response = await fetch(`${baseUrl}/Ville/${id}`)
    const data = await response.json();
    return plainToClass(Ville, data);
}