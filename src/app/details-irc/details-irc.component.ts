import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InstalacionesService } from '../services/instalaciones.service';
import { PoblacionesService } from '../services/poblaciones.service';
import { ContratantesService } from '../services/contratantes.service';

import Instalacion from '../classes/Instalacion';
import Poblacion from '../classes/Poblacion';
import Contratante from '../classes/Contratante';

import DropboxManager from '../classes/DropboxManager';

@Component({
  selector: 'app-details-irc',
  templateUrl: './details-irc.component.html',
  styleUrls: ['./details-irc.component.css']
})
export class DetailsIrcComponent implements OnInit {

  instalacion: Instalacion = new Instalacion();

  id: number;
  tipo: number = 1; // Tipo = IRC = 1

  constructor(private router: Router,
    private route: ActivatedRoute,
    private instServ: InstalacionesService,
    private poblServ: PoblacionesService,
    private contServ: ContratantesService) { }

  ngOnInit() {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    this.route.params.subscribe(params => {
      this.id = params.id;

      this.instServ.getInstalacion(this.id, this.tipo)
        .subscribe((instalacion: any) => {
          instalacion = instalacion[0];

          this.instalacion = new Instalacion(this.id,
            instalacion.EsBaja,
            this.tipo,
            instalacion.Direccion,
            new Poblacion(null, ''),
            new Contratante(null, ''),
            instalacion.FechaInstalacion ? new Date(instalacion.FechaInstalacion).toLocaleDateString("es-ES", options) : null,
            instalacion.Agente,
            instalacion.Instaladores,
            instalacion.Presupuesto,
            instalacion.Observaciones,
            instalacion.IRC_NumLlaves,
            instalacion.IRC_Facturado);

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
        });
    });
  }

  openFolder() {
    DropboxManager.openFolder("IRC/" + this.id);
  }
}
