// cont-dists.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import DataToSql from '../classes/DataToSql';

@Injectable({
  providedIn: 'root'
})
export class ContDistsService {

  uri = 'http://' + window.location.hostname + ':8080/contDists';

  constructor(private http: HttpClient) { }

  addContDist(campana, fechaGrabCont, fechaGrabCert, cups, regularizacion, numCertRegul, 
              subvencion, subvFacturada, cobradoSubv, numCertSubv, colaboracion, 
              colabFacturada, cobradoColab, numCertColab, numSolicitudZeus, 
              subvencionIdi, idiFacturado, tipo) {

    campana = DataToSql.stringToSql(campana);
    cups = DataToSql.stringToSql(cups);
    numCertRegul = DataToSql.stringToSql(numCertRegul);
    numCertSubv = DataToSql.stringToSql(numCertSubv);
    numCertColab = DataToSql.stringToSql(numCertColab);
    numSolicitudZeus = DataToSql.stringToSql(numSolicitudZeus);

    fechaGrabCont = DataToSql.dateToSql(fechaGrabCont);
    fechaGrabCert = DataToSql.dateToSql(fechaGrabCert);

    const obj = {
      campana, fechaGrabCont, fechaGrabCert, cups, regularizacion, numCertRegul, 
      subvencion, subvFacturada, cobradoSubv, numCertSubv, colaboracion, 
      colabFacturada, cobradoColab, numCertColab, numSolicitudZeus, 
      subvencionIdi, idiFacturado, tipo
    };
    
    return this.http
            .post(`${this.uri}/add`, obj);
  }

  getContDists(campana, cups) {
    campana = DataToSql.stringToSql(campana);
    cups = DataToSql.stringToSql(cups);
    
    return this.http
            .get(`${this.uri}`, { 
              params: {
                campana: campana,
                cups: cups
              }
            });
  }

  getContDist(id) {
    return this.http
            .get(`${this.uri}/${id}`);
  }

  updateContDist(id, campana, fechaGrabCont, fechaGrabCert, cups, regularizacion, numCertRegul, 
                  subvencion, subvFacturada, cobradoSubv, numCertSubv, colaboracion, 
                  colabFacturada, cobradoColab, numCertColab, numSolicitudZeus, 
                  subvencionIdi, idiFacturado, tipo) {

    campana = DataToSql.stringToSql(campana);
    cups = DataToSql.stringToSql(cups);
    numCertRegul = DataToSql.stringToSql(numCertRegul);
    numCertSubv = DataToSql.stringToSql(numCertSubv);
    numCertColab = DataToSql.stringToSql(numCertColab);
    numSolicitudZeus = DataToSql.stringToSql(numSolicitudZeus);

    fechaGrabCont = DataToSql.dateToSql(fechaGrabCont);
    fechaGrabCert = DataToSql.dateToSql(fechaGrabCert);

    const obj = {
      campana, fechaGrabCont, fechaGrabCert, cups, regularizacion, numCertRegul, 
      subvencion, subvFacturada, cobradoSubv, numCertSubv, colaboracion, 
      colabFacturada, cobradoColab, numCertColab, numSolicitudZeus, 
      subvencionIdi, idiFacturado, tipo
    };
    return this.http
            .put(`${this.uri}/update/${id}`, obj);
  }

  deleteContDist(id) {
    return this.http
            .delete(`${this.uri}/delete/${id}`);
  }
}
