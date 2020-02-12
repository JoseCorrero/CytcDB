import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { FormInstalacionComponent } from '../form-instalacion/form-instalacion.component';
import { FormIrcComponent } from '../form-irc/form-irc.component';

import { InstalacionesService } from '../services/instalaciones.service';

@Component({
  selector: 'app-edit-irc',
  templateUrl: './edit-irc.component.html',
  styleUrls: ['./edit-irc.component.css']
})
export class EditIrcComponent implements OnInit {

  @ViewChild(FormInstalacionComponent, null) formInstalacion: FormInstalacionComponent;
  @ViewChild(FormIrcComponent, null) formIrc: FormIrcComponent;

  fgInstalacion: FormGroup;
  fgIrc: FormGroup;

  tipo: number = 1; // Tipo = IRC = 1
  esBaja: number;
  changed: boolean = false;

  idInstalacion: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private instServ: InstalacionesService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fgInstalacion = this.formInstalacion.fgInstalacion;
    this.fgIrc = this.formIrc.fgIrc;

    this.route.params.subscribe(params => {
      this.idInstalacion = params.id;

      this.instServ.getInstalacion(this.idInstalacion, this.tipo)
        .subscribe((instalacion: any) => {
          instalacion = instalacion[0];
          this.esBaja = instalacion.EsBaja;
          this.fgInstalacion.get('direccion').setValue(instalacion.Direccion); // Instalación
          this.fgInstalacion.get('poblacion').setValue(instalacion.Id_Poblacion);
          this.fgInstalacion.get('contratante').setValue(instalacion.Id_Contratante);
          this.fgInstalacion.get('fechaInstalacion').setValue(instalacion.FechaInstalacion);
          this.fgInstalacion.get('agente').setValue(instalacion.Agente);
          this.fgInstalacion.get('instaladores').setValue(instalacion.Instaladores);
          this.fgInstalacion.get('presupuesto').setValue(instalacion.Presupuesto);
          this.fgInstalacion.get('observaciones').setValue(instalacion.Observaciones);
          this.fgIrc.get('numLlaves').setValue(instalacion.IRC_NumLlaves); // IRC
          this.fgIrc.get('facturado').setValue(instalacion.IRC_Facturado);
        });
    });
  }

  validate() {
    return (!this.changed &&
            this.fgInstalacion.pristine && this.fgIrc.pristine) || 
           (this.fgInstalacion.invalid || this.fgIrc.invalid);
  }

  switchEsBaja() {
    if(this.esBaja == 1)
      this.esBaja = 0;
    else
      this.esBaja = 1;

    this.changed = !this.changed;
  }

  update() {
    this.route.params.subscribe(params => {
      this.instServ.updateInstalacion(
        this.idInstalacion,
        this.esBaja, // Es baja
        this.fgInstalacion.get('direccion').value, // Instalación
        this.fgInstalacion.get('poblacion').value,
        this.fgInstalacion.get('contratante').value,
        this.fgInstalacion.get('fechaInstalacion').value,
        this.fgInstalacion.get('agente').value,
        this.fgInstalacion.get('instaladores').value,
        this.fgInstalacion.get('presupuesto').value,
        this.fgInstalacion.get('observaciones').value,
        this.fgIrc.get('numLlaves').value, // IRC
        this.fgIrc.get('facturado').value,
        null, null, null, null, null, null, null, // IRIS
        null, null, null, // Completa
        null, null, null, null, null, null, null, null, null, null, null, null, // Gas natural
        null, // Mantenimiento
        null, // Butano
        this.tipo // Tipo = IRC = 1
      ).subscribe((res: any) => {
        console.log(res);
        this.snackBar.open(res.status, "Aceptar", {
          duration: 5000
        });
      
        this.router.navigate(['/detalles-irc/', this.idInstalacion]);
      });
    });
  }
}