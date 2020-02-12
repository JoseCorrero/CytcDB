// mercados.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MercadosService {

  uri = 'http://' + window.location.hostname + ':8080/mercados';

  constructor(private http: HttpClient) { }

  addMercado(nombre) {
    const obj = {
      nombre
    };
    return this.http
            .post(`${this.uri}/add`, obj);
  }

  getMercados(nombre) {
    return this.http
            .get(`${this.uri}`, { 
              params: {
                nombre: nombre
              }
            });
  }

  getMercado(id) {
    return this.http
            .get(`${this.uri}/${id}`);
  }

  updateMercado(id, nombre) {
    const obj = {
      nombre
    };
    return this.http
            .put(`${this.uri}/update/${id}`, obj);
  }

  deleteMercado(id) {
    return this.http
            .delete(`${this.uri}/delete/${id}`);
  }
}
