import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { FormInstalacionComponent } from '../form-instalacion/form-instalacion.component';
import { FormIrcComponent } from '../form-irc/form-irc.component';

import { InstalacionesService } from '../services/instalaciones.service';

import DropboxManager from '../classes/DropboxManager';

@Component({
  selector: 'app-crear-irc',
  templateUrl: './crear-irc.component.html',
  styleUrls: ['./crear-irc.component.css']
})
export class CrearIrcComponent implements OnInit {
  
  @ViewChild(FormInstalacionComponent, null) formInstalacion: FormInstalacionComponent;
  @ViewChild(FormIrcComponent, null) formIrc: FormIrcComponent;

  fgInstalacion: FormGroup;
  fgIrc: FormGroup;

  tipo: number = 1; // Tipo = IRC = 1
  
  constructor(private router: Router,
              private instServ: InstalacionesService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fgInstalacion = this.formInstalacion.fgInstalacion;
    this.fgIrc = this.formIrc.fgIrc;
  }

  validate() {
    return (this.fgInstalacion.pristine && this.fgIrc.pristine) || 
           (this.fgInstalacion.invalid || this.fgIrc.invalid);
  }

  create() {
    this.instServ.addInstalacion(
      0, // Es baja = false = 0
      this.fgInstalacion.get('direccion').value, // Instalación
      this.fgInstalacion.get('poblacion').value, 
      this.fgInstalacion.get('contratante').value, 
      this.fgInstalacion.get('fechaInstalacion').value, 
      this.fgInstalacion.get('agente').value, 
      this.fgInstalacion.get('instaladores').value, 
      this.fgInstalacion.get('presupuesto').value, 
      this.fgInstalacion.get('cobrado').value,
      this.fgInstalacion.get('observaciones').value, 
      this.fgIrc.get('numLlaves').value, // IRC
      this.fgIrc.get('facturado').value, 
      null, null, null, null, null, null, // IRIS
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
      
      DropboxManager.createFolder("/IRC/" + res.id);
      this.router.navigate(['/detalles-irc/', res.id]);
    });
  }
}