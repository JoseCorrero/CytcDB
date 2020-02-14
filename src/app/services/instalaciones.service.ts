// instalaciones.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import DataToSql from '../classes/DataToSql';

@Injectable({
  providedIn: 'root'
})
export class InstalacionesService {

  uri = 'http://' + window.location.hostname + ':8080/instalaciones';

  constructor(private http: HttpClient) { }

  addInstalacion(esBaja, direccion, id_poblacion, id_contratante, fechaInstalacion, 
                 agente, instaladores, presupuesto, iris_cobrado, observaciones, 
                 irc_numLlaves, irc_facturado, 
                 iris_nombre, iris_apellidos, iris_dni, iris_telefonos, 
                 iris_aparatoExistente, iris_aparatosVendidos, 
                 irisc_id_estado, irisc_fechaContrato, irisc_observaciones, 
                 irisgn_id_mercado, irisgn_fechaPuestaGas, irisgn_tiposAparato, irisgn_piezas, 
                 irisgn_tiroForzado, irisgn_soporteExterior, irisgn_idi, irisgn_facturado1, irisgn_facturado2, 
                 irisgn_id_contCom, irisgn_id_contDist, irisgn_contObservaciones, 
                 irism_fechaMantenimiento, 
                 irisb_id_tipoTrabajo, 
                 tipo) {
    
    direccion = DataToSql.stringToSql(direccion);
    agente = DataToSql.stringToSql(agente);
    instaladores = DataToSql.stringToSql(instaladores);
    observaciones = DataToSql.stringToSql(observaciones);
    iris_nombre = DataToSql.stringToSql(iris_nombre);
    iris_apellidos = DataToSql.stringToSql(iris_apellidos);
    iris_dni = DataToSql.stringToSql(iris_dni);
    iris_telefonos = DataToSql.stringToSql(iris_telefonos);
    iris_aparatoExistente = DataToSql.stringToSql(iris_aparatoExistente);
    iris_aparatosVendidos = DataToSql.stringToSql(iris_aparatosVendidos);
    irisc_observaciones = DataToSql.stringToSql(irisc_observaciones);
    irisgn_tiposAparato = DataToSql.stringToSql(irisgn_tiposAparato);
    irisgn_piezas = DataToSql.stringToSql(irisgn_piezas);
    irisgn_contObservaciones = DataToSql.stringToSql(irisgn_contObservaciones);

    fechaInstalacion = DataToSql.dateToSql(fechaInstalacion);
    irisc_fechaContrato = DataToSql.dateToSql(irisc_fechaContrato);
    irisgn_fechaPuestaGas = DataToSql.dateToSql(irisgn_fechaPuestaGas);
    irism_fechaMantenimiento = DataToSql.dateToSql(irism_fechaMantenimiento);

    const obj = {
      esBaja, direccion, id_poblacion, id_contratante, fechaInstalacion, 
      agente, instaladores, presupuesto, iris_cobrado, observaciones, 
      irc_numLlaves, irc_facturado, 
      iris_nombre, iris_apellidos, iris_dni, iris_telefonos, 
      iris_aparatoExistente, iris_aparatosVendidos, 
      irisc_id_estado, irisc_fechaContrato, irisc_observaciones, 
      irisgn_id_mercado, irisgn_fechaPuestaGas, irisgn_tiposAparato, irisgn_piezas, 
      irisgn_tiroForzado, irisgn_soporteExterior, irisgn_idi, irisgn_facturado1, irisgn_facturado2, 
      irisgn_id_contCom, irisgn_id_contDist, irisgn_contObservaciones, 
      irism_fechaMantenimiento, 
      irisb_id_tipoTrabajo, 
      tipo
    };
    
    return this.http
            .post(`${this.uri}/add`, obj);
  }

  getInstalaciones(esBaja, direccion, poblacion, preFecha, postFecha, contratante, apellidos, tipo) {
    direccion = DataToSql.stringToSql(direccion);
    apellidos = DataToSql.stringToSql(apellidos);
    
    preFecha = DataToSql.dateToSql(preFecha);
    postFecha = DataToSql.dateToSql(postFecha);

    return this.http
            .get(`${this.uri}`, { 
              params: {
                esBaja: esBaja,
                direccion: direccion,
                poblacion: poblacion,
                preFecha: preFecha,
                postFecha: postFecha,
                contratante: contratante,
                apellidos: apellidos,
                tipo: tipo
              }
            });
  }

  getInstalacion(id, tipo) {
    return this.http
            .get(`${this.uri}/${id}`, { 
              params: {
                tipo: tipo
              }
            });
  }

  updateInstalacion(id, 
                    esBaja, direccion, id_poblacion, id_contratante, fechaInstalacion, 
                    agente, instaladores, presupuesto, iris_cobrado, observaciones, 
                    irc_numLlaves, irc_facturado, 
                    iris_nombre, iris_apellidos, iris_dni, iris_telefonos, 
                    iris_aparatoExistente, iris_aparatosVendidos, 
                    irisc_id_estado, irisc_fechaContrato, irisc_observaciones, 
                    irisgn_id_mercado, irisgn_fechaPuestaGas, irisgn_tiposAparato, irisgn_piezas, 
                    irisgn_tiroForzado, irisgn_soporteExterior, irisgn_idi, irisgn_facturado1, irisgn_facturado2, 
                    irisgn_id_contCom, irisgn_id_contDist, irisgn_contObservaciones, 
                    irism_fechaMantenimiento, 
                    irisb_id_tipoTrabajo, 
                    tipo) {

    direccion = DataToSql.stringToSql(direccion);
    agente = DataToSql.stringToSql(agente);
    instaladores = DataToSql.stringToSql(instaladores);
    observaciones = DataToSql.stringToSql(observaciones);
    iris_nombre = DataToSql.stringToSql(iris_nombre);
    iris_apellidos = DataToSql.stringToSql(iris_apellidos);
    iris_dni = DataToSql.stringToSql(iris_dni);
    iris_telefonos = DataToSql.stringToSql(iris_telefonos);
    iris_aparatoExistente = DataToSql.stringToSql(iris_aparatoExistente);
    iris_aparatosVendidos = DataToSql.stringToSql(iris_aparatosVendidos);
    irisc_observaciones = DataToSql.stringToSql(irisc_observaciones);
    irisgn_tiposAparato = DataToSql.stringToSql(irisgn_tiposAparato);
    irisgn_piezas = DataToSql.stringToSql(irisgn_piezas);
    irisgn_contObservaciones = DataToSql.stringToSql(irisgn_contObservaciones);

    fechaInstalacion = DataToSql.dateToSql(fechaInstalacion);
    irisc_fechaContrato = DataToSql.dateToSql(irisc_fechaContrato);
    irisgn_fechaPuestaGas = DataToSql.dateToSql(irisgn_fechaPuestaGas);
    irism_fechaMantenimiento = DataToSql.dateToSql(irism_fechaMantenimiento);
                
    const obj = {
      esBaja, direccion, id_poblacion, id_contratante, fechaInstalacion, 
      agente, instaladores, presupuesto, iris_cobrado, observaciones, 
      irc_numLlaves, irc_facturado, 
      iris_nombre, iris_apellidos, iris_dni, iris_telefonos, 
      iris_aparatoExistente, iris_aparatosVendidos, 
      irisc_id_estado, irisc_fechaContrato, irisc_observaciones, 
      irisgn_id_mercado, irisgn_fechaPuestaGas, irisgn_tiposAparato, irisgn_piezas, 
      irisgn_tiroForzado, irisgn_soporteExterior, irisgn_idi, irisgn_facturado1, irisgn_facturado2, 
      irisgn_id_contCom, irisgn_id_contDist, irisgn_contObservaciones, 
      irism_fechaMantenimiento, 
      irisb_id_tipoTrabajo, 
      tipo
    };
    return this.http
            .put(`${this.uri}/update/${id}`, obj);
  }

  deleteInstalacion(id) {
    return this.http
            .delete(`${this.uri}/delete/${id}`);
  }
}
