import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { FormInstalacionComponent } from '../form-instalacion/form-instalacion.component';
import { FormIrisComponent } from '../form-iris/form-iris.component';
import { FormCompletaComponent } from '../form-completa/form-completa.component';
import { FormMantenimientoComponent } from '../form-mantenimiento/form-mantenimiento.component';

import { InstalacionesService } from '../services/instalaciones.service';

import DateManager from '../classes/DateManager';
import DropboxManager from '../classes/DropboxManager';

@Component({
  selector: 'app-crear-solar',
  templateUrl: './crear-solar.component.html',
  styleUrls: ['./crear-solar.component.css']
})
export class CrearSolarComponent implements OnInit {

  @ViewChild(FormInstalacionComponent, null) formInstalacion: FormInstalacionComponent;
  @ViewChild(FormIrisComponent, null) formIris: FormIrisComponent;
  @ViewChild(FormCompletaComponent, null) formCompleta: FormCompletaComponent;
  @ViewChild(FormMantenimientoComponent, null) formMantenimiento: FormMantenimientoComponent;

  fgInstalacion: FormGroup;
  fgIris: FormGroup;
  fgCompleta: FormGroup;
  fgMantenimiento: FormGroup;

  tipo: number = 4; // Tipo = Solar = 4
  
  constructor(private router: Router,
              private instServ: InstalacionesService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fgInstalacion = this.formInstalacion.fgInstalacion;
    this.fgIris = this.formIris.fgIris;
    this.fgCompleta = this.formCompleta.fgCompleta;
    this.fgMantenimiento = this.formMantenimiento.fgMantenimiento;
  }

  validate() {
    return (this.fgInstalacion.pristine && this.fgIris.pristine && this.fgCompleta.pristine &&
            this.fgMantenimiento.pristine) || 
           (this.fgInstalacion.invalid || this.fgIris.invalid || this.fgCompleta.invalid || 
            this.fgMantenimiento.invalid);
  }

  create() {
    let fM = null;

    if(this.fgMantenimiento.get('fechaMantenimiento').value)
      fM = this.fgMantenimiento.get('fechaMantenimiento').value;
    else
      fM = DateManager.addYearsToDate(
            this.fgInstalacion.get('fechaInstalacion').value, 
            this.fgMantenimiento.get('years').value);

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
      this.fgCompleta.get('estado').value, // Completa
      this.fgCompleta.get('fechaContrato').value,
      this.fgCompleta.get('observaciones').value,
      null, null, null, null, null, null, null, null, null, null, null, null, // Gas natural
      fM, // Mantenimiento 
      null, // Butano
      this.tipo // Tipo = Solar = 4
    ).subscribe((res: any) => {
      console.log(res);
      this.snackBar.open(res.status, "Aceptar", {
        duration: 5000
      });
      
      DropboxManager.createFolder("/Solar/" + res.id);
      this.router.navigate(['/detalles-solar/', res.id]);
    });
  }
}
