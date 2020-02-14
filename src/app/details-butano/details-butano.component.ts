import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InstalacionesService } from '../services/instalaciones.service';
import { PoblacionesService } from '../services/poblaciones.service';
import { ContratantesService } from '../services/contratantes.service';
import { EstadosService } from '../services/estados.service';
import { TiposTrabajoService } from '../services/tipos-trabajo.service';

import Instalacion from '../classes/Instalacion';
import Poblacion from '../classes/Poblacion';
import Contratante from '../classes/Contratante';
import Estado from '../classes/Estado';
import TipoTrabajo from '../classes/TipoTrabajo';

import DropboxManager from '../classes/DropboxManager';

@Component({
  selector: 'app-details-butano',
  templateUrl: './details-butano.component.html',
  styleUrls: ['./details-butano.component.css']
})
export class DetailsButanoComponent implements OnInit {

  instalacion: Instalacion = new Instalacion();

  id: number;
  tipo: number = 3; // Tipo = Butano = 3

  constructor(private router: Router,
    private route: ActivatedRoute,
    private instServ: InstalacionesService,
    private poblServ: PoblacionesService,
    private contServ: ContratantesService,
    private estServ: EstadosService,
    private trabServ: TiposTrabajoService) { }

  ngOnInit() {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    this.route.params.subscribe(params => {
      this.id = params.id;

      this.instServ.getInstalacion(this.id, this.tipo)
        .subscribe((instalacion: any) => {
          instalacion = instalacion[0];

          this.instalacion = new Instalacion(
            this.id,
            instalacion.EsBaja,
            this.tipo,
            instalacion.Direccion,            
            new Poblacion(null, ''),
            new Contratante(null, ''),
            instalacion.FechaInstalacion ? new Date(instalacion.FechaInstalacion).toLocaleDateString("es-ES", options) : null,
            instalacion.Agente,
            instalacion.Instaladores,
            instalacion.Presupuesto,
            instalacion.IRIS_Cobrado,
            instalacion.Observaciones,
            null, null, // IRC
            instalacion.IRIS_Nombre,
            instalacion.IRIS_Apellidos,
            instalacion.IRIS_Dni,
            instalacion.IRIS_Telefonos,
            instalacion.IRIS_AparatoExistente,
            instalacion.IRIS_AparatosVendidos,
            new Estado(null, ''),
            instalacion.IRISC_FechaContrato ? new Date(instalacion.IRISC_FechaContrato).toLocaleDateString("es-ES", options) : null,
            instalacion.IRISC_Observaciones,
            null, null, null, null, null, null, null, null, null, null, null, null, // Gas natural
            instalacion.IRISM_FechaMantenimiento ? new Date(instalacion.IRISM_FechaMantenimiento).toLocaleDateString("es-ES", options) : null, 
            new TipoTrabajo(null, '')
            );

          if (instalacion.Id_Poblacion)
            this.poblServ.getPoblacion(instalacion.Id_Poblacion).subscribe((pobl: any) => {
              pobl = pobl[0];
              this.instalacion.poblacion = new Poblacion(pobl.Id, pobl.Nombre);
            });

          if (instalacion.Id_Contratante)
            this.contServ.getContratante(instalacion.Id_Contratante).subscribe((cont: any) => {
              cont = cont[0];
              this.instalacion.contratante = new Contratante(cont.Id, cont.Nombre);
            });

          if (instalacion.IRISC_Id_Estado)
            this.estServ.getEstado(instalacion.IRISC_Id_Estado).subscribe((est: any) => {
              est = est[0];
              this.instalacion.irisc_estado = new Estado(est.Id, est.Nombre);
            });

          if (instalacion.IRISB_Id_TipoTrabajo)
            this.trabServ.getTipoTrabajo(instalacion.IRISB_Id_TipoTrabajo).subscribe((trab: any) => {
              trab = trab[0];
              this.instalacion.irisb_tipoTrabajo = new TipoTrabajo(trab.Id, trab.Nombre);
            });
        });
    });
  }

  openFolder() {
    DropboxManager.openFolder("Butano/" + this.id);
  }
}
