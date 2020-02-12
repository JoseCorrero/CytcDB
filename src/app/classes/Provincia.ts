// Provincia.ts

import Poblacion from './Poblacion';

export default class Provincia {

    id: number;
    nombre: string;
    poblaciones: Poblacion[];

    constructor(id: number, nombre: string, poblaciones: Poblacion[]) {
        this.id = id;
        this.nombre = nombre;
        this.poblaciones = poblaciones;
    }
}