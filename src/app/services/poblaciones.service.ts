// poblaciones.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PoblacionesService {

  uri = 'http://' + window.location.hostname + ':8080/poblaciones';

  constructor(private http: HttpClient) { }

  addPoblacion(id_provincia, nombre) {
    const obj = {
      id_provincia,
      nombre
    };
    return this.http
            .post(`${this.uri}/add`, obj);
  }

  getPoblaciones(id_provincia, nombre) {
    return this.http
            .get(`${this.uri}`, { 
              params: {
                id_provincia: id_provincia,
                nombre: nombre
              }
            });
  }

  getPoblacion(id) {
    return this.http
            .get(`${this.uri}/${id}`);
  }

  updatePoblacion(id, id_provincia, nombre) {
    const obj = {
      id_provincia,
      nombre
    };
    return this.http
            .put(`${this.uri}/update/${id}`, obj);
  }

  deletePoblacion(id) {
    return this.http
            .delete(`${this.uri}/delete/${id}`);
  }
}
