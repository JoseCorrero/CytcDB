// provincias.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  uri = 'http://' + window.location.hostname + ':8080/provincias';

  constructor(private http: HttpClient) { }

  addProvincia(nombre) {
    const obj = {
      nombre
    };
    return this.http
            .post(`${this.uri}/add`, obj);
  }

  getProvincias(nombre) {
    return this.http
            .get(`${this.uri}`, { 
              params: {
                nombre: nombre
              }
            });
  }

  getProvincia(id) {
    return this.http
            .get(`${this.uri}/${id}`);
  }

  updateProvincia(id, nombre) {
    const obj = {
      nombre
    };
    return this.http
            .put(`${this.uri}/update/${id}`, obj);
  }

  deleteProvincia(id) {
    return this.http
            .delete(`${this.uri}/delete/${id}`);
  }
}
