// mantenimientos.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import DataToSql from '../classes/DataToSql';

@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  uri = 'http://' + window.location.hostname + ':8080/mantenimientos';

  constructor(private http: HttpClient) { }

  getMantenimientos(fecha) {
    fecha = DataToSql.dateToSql(fecha);

    return this.http
            .get(`${this.uri}`, { 
              params: {
                fecha: fecha
              }
            });
  }
}
