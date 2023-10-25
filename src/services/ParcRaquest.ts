import { plainToClass } from "class-transformer";
import { baseUrl } from "../main";
import { Parc } from "../models/Parc";

export async function getParcById(id: string): Promise<Parc> {
    const response = await fetch(`${baseUrl}/Park/${id}`)
    const data = await response.json();
    return plainToClass(Parc, data);
}