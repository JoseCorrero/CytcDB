// Instalacion.ts

import Poblacion from './Poblacion';
import Contratante from './Contratante';
import Estado from './Estado';
import Mercado from './Mercado';
import ContratoComercializadora from './ContratoComercializadora';
import ContratoDistribuidora from './ContratoDistribuidora';
import TipoTrabajo from './TipoTrabajo';

export default class Instalacion {

    id: number;
    esBaja: number;
    direccion: string;
    poblacion: Poblacion;
    contratante: Contratante;
    fechaInstalacion: Date;
    agente: string;
    instaladores: string;
    presupuesto: number;
    iris_cobrado: number;
    observaciones: string;

    irc_numLlaves: number;
    irc_facturado: number;

    iris_nombre: string;
    iris_apellidos: string;
    iris_dni: string;
    iris_telefonos: string;
    iris_aparatoExistente: string;
    iris_aparatosVendidos: string;

    irisc_estado: Estado;
    irisc_fechaContrato: Date;
    irisc_observaciones: string;

    irisgn_mercado: Mercado;
    irisgn_fechaPuestaGas: Date;
    irisgn_tiposAparato: string;
    irisgn_piezas: string;
    irisgn_tiroForzado: number;
    irisgn_soporteExterior: number;
    irisgn_idi: number;
    irisgn_facturado1: number;
    irisgn_facturado2: number;
    irisgn_contCom: ContratoComercializadora;
    irisgn_contDist: ContratoDistribuidora;
    irisgn_contObservaciones: string;

    irism_fechaMantenimiento: Date;

    irisb_tipoTrabajo: TipoTrabajo;

    tipo: number;

    constructor(id = null,
                esBaja = null,
                tipo = null,
                direccion = null,
                poblacion = null,
                contratante = null,
                fechaInstalacion = null,
                agente = null,
                instaladores = null,
                presupuesto = null,
                iris_cobrado = null,
                observaciones = null,
            
                irc_numLlaves = null,
                irc_facturado = null,
            
                iris_nombre = null,
                iris_apellidos = null,
                iris_dni = null,
                iris_telefonos = null,
                iris_aparatoExistente = null,
                iris_aparatosVendidos = null,
            
                irisc_estado = null,
                irisc_fechaContrato = null,
                irisc_observaciones = null,
            
                irisgn_mercado = null,
                irisgn_fechaPuestaGas = null,
                irisgn_tiposAparato = null,
                irisgn_piezas = null,
                irisgn_tiroForzado = null,
                irisgn_soporteExterior = null,
                irisgn_idi = null,
                irisgn_facturado1 = null,
                irisgn_facturado2 = null,
                irisgn_contCom = null,
                irisgn_contDist = null,
                irisgn_contObservaciones = null,
            
                irism_fechaMantenimiento = null,
            
                irisb_tipoTrabajo = null) {

        this.id = id; 
        this.esBaja = esBaja; 
        this.direccion = direccion; 
        this.poblacion = poblacion; 
        this.contratante = contratante; 
        this.fechaInstalacion = fechaInstalacion; 
        this.agente = agente; 
        this.instaladores = instaladores; 
        this.presupuesto = presupuesto; 
        this.iris_cobrado = iris_cobrado; 
        this.observaciones = observaciones; 
    
        this.irc_numLlaves = irc_numLlaves; 
        this.irc_facturado = irc_facturado; 
    
        this.iris_nombre = iris_nombre; 
        this.iris_apellidos = iris_apellidos; 
        this.iris_dni = iris_dni; 
        this.iris_telefonos = iris_telefonos; 
        this.iris_aparatoExistente = iris_aparatoExistente; 
        this.iris_aparatosVendidos = iris_aparatosVendidos; 
    
        this.irisc_estado = irisc_estado; 
        this.irisc_fechaContrato = irisc_fechaContrato; 
        this.irisc_observaciones = irisc_observaciones; 
    
        this.irisgn_mercado = irisgn_mercado; 
        this.irisgn_fechaPuestaGas = irisgn_fechaPuestaGas; 
        this.irisgn_tiposAparato = irisgn_tiposAparato; 
        this.irisgn_piezas = irisgn_piezas; 
        this.irisgn_tiroForzado = irisgn_tiroForzado; 
        this.irisgn_soporteExterior = irisgn_soporteExterior; 
        this.irisgn_idi = irisgn_idi; 
        this.irisgn_facturado1 = irisgn_facturado1; 
        this.irisgn_facturado2 = irisgn_facturado2; 
        this.irisgn_contCom = irisgn_contCom; 
        this.irisgn_contDist = irisgn_contDist; 
        this.irisgn_contObservaciones = irisgn_contObservaciones; 
    
        this.irism_fechaMantenimiento = irism_fechaMantenimiento; 
    
        this.irisb_tipoTrabajo = irisb_tipoTrabajo; 
    
        this.tipo = tipo; 
    }
}