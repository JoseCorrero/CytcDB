// ContratoComercializadora.ts

export default class ContratoComercializadora {

    id: number;
    subvencion: number;
    numeroSolicitud: string;
    facturado: number;
    numeroCertificacion: string;
    fechaGrabCont: string;

    constructor(id: number, subvencion: number, numeroSolicitud: string,
                facturado: number, numeroCertificacion: string, fechaGrabCont: string) {

        this.id = id;
        this.subvencion = subvencion;
        this.numeroSolicitud = numeroSolicitud;
        this.facturado = facturado;
        this.numeroCertificacion = numeroCertificacion;
        this.fechaGrabCont = fechaGrabCont;
    }
}