// estados.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  uri = 'http://' + window.location.hostname + ':8080/estados';

  constructor(private http: HttpClient) { }

  addEstado(nombre) {
    const obj = {
      nombre
    };
    return this.http
            .post(`${this.uri}/add`, obj);
  }

  getEstados(nombre) {
    return this.http
            .get(`${this.uri}`, { 
              params: {
                nombre: nombre
              }
            });
  }

  getEstado(id) {
    return this.http
            .get(`${this.uri}/${id}`);
  }

  updateEstado(id, nombre) {
    const obj = {
      nombre
    };
    return this.http
            .put(`${this.uri}/update/${id}`, obj);
  }

  deleteEstado(id) {
    return this.http
            .delete(`${this.uri}/delete/${id}`);
  }
}
