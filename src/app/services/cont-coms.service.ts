// cont-coms.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import DataToSql from '../classes/DataToSql';

@Injectable({
  providedIn: 'root'
})
export class ContComsService {

  uri = 'http://' + window.location.hostname + ':8080/contComs';

  constructor(private http: HttpClient) { }

  addContCom(subvencion, numeroSolicitud, facturado, numeroCertificacion) {
    numeroSolicitud = DataToSql.stringToSql(numeroSolicitud);
    numeroCertificacion = DataToSql.stringToSql(numeroCertificacion);

    const obj = {
      subvencion, 
      numeroSolicitud, 
      facturado, 
      numeroCertificacion
    };
    return this.http
            .post(`${this.uri}/add`, obj);
  }

  getContComs(numeroSolicitud, numeroCertificacion) {
    numeroSolicitud = DataToSql.stringToSql(numeroSolicitud);
    numeroCertificacion = DataToSql.stringToSql(numeroCertificacion);

    return this.http
            .get(`${this.uri}`, { 
              params: {
                numeroSolicitud: numeroSolicitud,
                numeroCertificacion: numeroCertificacion
              }
            });
  }

  getContCom(id) {
    return this.http
            .get(`${this.uri}/${id}`);
  }

  updateContCom(id, subvencion, numeroSolicitud, facturado, numeroCertificacion) {
    numeroSolicitud = DataToSql.stringToSql(numeroSolicitud);
    numeroCertificacion = DataToSql.stringToSql(numeroCertificacion);

    const obj = {
      subvencion, 
      numeroSolicitud, 
      facturado, 
      numeroCertificacion
    };
    return this.http
            .put(`${this.uri}/update/${id}`, obj);
  }

  deleteContCom(id) {
    return this.http
            .delete(`${this.uri}/delete/${id}`);
  }
}
