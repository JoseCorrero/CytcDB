// ContratoDistribuidora.ts

export default class ContratoDistribuidora {

    id: number;
    campana: string;
    fechaGrabCont: string;
    fechaGrabCert: string;
    cups: string;
    regularizacion: number;
    numCertRegul: string;
    subvencion: number;
    subvFacturada: number;
    cobradoSubv: number;
    numCertSubv: string;
    colaboracion: number;
    colabFacturada: number;
    cobradoColab: number;
    numCertColab: string;
    numSolicitudZeus: string;
    subvencionIdi: number;
    idiFacturado: number;
    tipo: number;

    constructor(id: number, 
                campana: string, fechaGrabCont: string, fechaGrabCert: string, 
                cups: string, regularizacion: number, numCertRegul: string, 
                subvencion: number, subvFacturada: number, cobradoSubv: number, numCertSubv: string, 
                colaboracion: number, colabFacturada: number, cobradoColab: number, numCertColab: string, 
                numSolicitudZeus: string, subvencionIdi: number, idiFacturado: number, 
                tipo: number) {

        this.id = id;
        this.campana = campana;
        this.fechaGrabCont = fechaGrabCont;
        this.fechaGrabCert = fechaGrabCert;
        this.cups = cups;
        this.regularizacion = regularizacion;
        this.numCertRegul = numCertRegul;
        this.subvencion = subvencion;
        this.subvFacturada = subvFacturada;
        this.cobradoSubv = cobradoSubv;
        this.numCertSubv = numCertSubv;
        this.colaboracion =colaboracion;
        this.colabFacturada =colabFacturada;
        this.cobradoColab = cobradoColab;
        this.numCertColab =numCertColab;
        this.numSolicitudZeus = numSolicitudZeus;
        this.subvencionIdi = subvencionIdi;
        this.idiFacturado = idiFacturado;
        this.tipo = tipo;
    }
}