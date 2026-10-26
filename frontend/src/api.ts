export interface Empleado {
    id: number;
    nombre: string;
    apellido: string;
    direccion: string;
    puesto: string;
    edad: number;
    telefono: number;
}

export const API = "http://localhost:8080/api";

export class HttpError extends Error {
    status: number;
    constructor(status: number) {
        super(`HTTP ${status}`);
        this.status = status;
    }
}

export async function getJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) throw new HttpError(response.status);
    return (await response.json()) as T;
}