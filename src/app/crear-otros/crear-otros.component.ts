import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { FormInstalacionComponent } from '../form-instalacion/form-instalacion.component';
import { FormIrisComponent } from '../form-iris/form-iris.component';

import { InstalacionesService } from '../services/instalaciones.service';

import DropboxManager from '../classes/DropboxManager';

@Component({
  selector: 'app-crear-otros',
  templateUrl: './crear-otros.component.html',
  styleUrls: ['./crear-otros.component.css']
})
export class CrearOtrosComponent implements OnInit {
  
  @ViewChild(FormInstalacionComponent, null) formInstalacion: FormInstalacionComponent;
  @ViewChild(FormIrisComponent, null) formIris: FormIrisComponent;

  fgInstalacion: FormGroup;
  fgIris: FormGroup;

  tipo: number = 5; // Tipo = Otros = 5
  
  constructor(private router: Router,
              private instServ: InstalacionesService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fgInstalacion = this.formInstalacion.fgInstalacion;
    this.fgIris = this.formIris.fgIris;
  }

  validate() {
    return (this.fgInstalacion.pristine && this.fgIris.pristine) || 
           (this.fgInstalacion.invalid || this.fgIris.invalid);
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
      null, null, // IRC
      this.fgIris.get('nombre').value, // IRIS
      this.fgIris.get('apellidos').value, 
      this.fgIris.get('dni').value, 
      this.fgIris.get('telefonos').value, 
      this.fgIris.get('aparatoExistente').value, 
      this.fgIris.get('aparatosVendidos').value, 
      null, null, null, // Completa
      null, null, null, null, null, null, null, null, null, null, null, null, // Gas natural
      null, // Mantenimiento
      null, // Butano
      this.tipo // Tipo = Otros = 5
    ).subscribe((res: any) => {
      console.log(res);
      this.snackBar.open(res.status, "Aceptar", {
        duration: 5000
      });
      
      DropboxManager.createFolder("/Otros/" + res.id);
      this.router.navigate(['/detalles-otros/', res.id]);
    });
  }
}
