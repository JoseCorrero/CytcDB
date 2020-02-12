// tipos-trabajo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TiposTrabajoService {

  uri = 'http://' + window.location.hostname + ':8080/tipos-trabajo';

  constructor(private http: HttpClient) { }

  addTipoTrabajo(nombre) {
    const obj = {
      nombre
    };
    return this.http
            .post(`${this.uri}/add`, obj);
  }

  getTiposTrabajo(nombre) {
    return this.http
            .get(`${this.uri}`, { 
              params: {
                nombre: nombre
              }
            });
  }

  getTipoTrabajo(id) {
    return this.http
            .get(`${this.uri}/${id}`);
  }

  updateTipoTrabajo(id, nombre) {
    const obj = {
      nombre
    };
    return this.http
            .put(`${this.uri}/update/${id}`, obj);
  }

  deleteTipoTrabajo(id) {
    return this.http
            .delete(`${this.uri}/delete/${id}`);
  }
}
