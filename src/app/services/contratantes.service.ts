// contratantes.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContratantesService {

  uri = 'http://' + window.location.hostname + ':8080/contratantes';

  constructor(private http: HttpClient) { }

  addContratante(nombre) {
    const obj = {
      nombre
    };
    return this.http
            .post(`${this.uri}/add`, obj);
  }

  getContratantes(nombre) {
    return this.http
            .get(`${this.uri}`, { 
              params: {
                nombre: nombre
              }
            });
  }

  getContratante(id) {
    return this.http
            .get(`${this.uri}/${id}`);
  }

  updateContratante(id, nombre) {
    const obj = {
      nombre
    };
    return this.http
            .put(`${this.uri}/update/${id}`, obj);
  }

  deleteContratante(id) {
    return this.http
            .delete(`${this.uri}/delete/${id}`);
  }
}
