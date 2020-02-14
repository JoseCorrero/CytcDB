import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { FormInstalacionComponent } from '../form-instalacion/form-instalacion.component';
import { FormIrisComponent } from '../form-iris/form-iris.component';
import { FormCompletaComponent } from '../form-completa/form-completa.component';
import { FormMantenimientoComponent } from '../form-mantenimiento/form-mantenimiento.component';
import { FormButanoComponent } from '../form-butano/form-butano.component';

import { InstalacionesService } from '../services/instalaciones.service';

import DateManager from '../classes/DateManager';

@Component({
  selector: 'app-edit-butano',
  templateUrl: './edit-butano.component.html',
  styleUrls: ['./edit-butano.component.css']
})
export class EditButanoComponent implements OnInit {

  @ViewChild(FormInstalacionComponent, null) formInstalacion: FormInstalacionComponent;
  @ViewChild(FormIrisComponent, null) formIris: FormIrisComponent;
  @ViewChild(FormCompletaComponent, null) formCompleta: FormCompletaComponent;
  @ViewChild(FormMantenimientoComponent, null) formMantenimiento: FormMantenimientoComponent;
  @ViewChild(FormButanoComponent, null) formButano: FormButanoComponent;

  fgInstalacion: FormGroup;
  fgIris: FormGroup;
  fgCompleta: FormGroup;
  fgMantenimiento: FormGroup;
  fgButano: FormGroup;

  tipo: number = 3; // Tipo = Butano = 3
  esBaja: number;
  changed: boolean = false;

  idInstalacion: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private instServ: InstalacionesService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fgInstalacion = this.formInstalacion.fgInstalacion;
    this.fgIris = this.formIris.fgIris;
    this.fgCompleta = this.formCompleta.fgCompleta;
    this.fgMantenimiento = this.formMantenimiento.fgMantenimiento;
    this.fgButano = this.formButano.fgButano;

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
          this.fgInstalacion.get('cobrado').setValue(instalacion.IRIS_Cobrado),
          this.fgInstalacion.get('observaciones').setValue(instalacion.Observaciones);
          this.fgIris.get('nombre').setValue(instalacion.IRIS_Nombre); // IRIS
          this.fgIris.get('apellidos').setValue(instalacion.IRIS_Apellidos);
          this.fgIris.get('dni').setValue(instalacion.IRIS_Dni);
          this.fgIris.get('telefonos').setValue(instalacion.IRIS_Telefonos);
          this.fgIris.get('aparatoExistente').setValue(instalacion.IRIS_AparatoExistente);
          this.fgIris.get('aparatosVendidos').setValue(instalacion.IRIS_AparatosVendidos);
          this.fgCompleta.get('estado').setValue(instalacion.IRISC_Id_Estado); // Completa
          this.fgCompleta.get('fechaContrato').setValue(instalacion.IRISC_FechaContrato);
          this.fgCompleta.get('observaciones').setValue(instalacion.IRISC_Observaciones);
          this.fgMantenimiento.get('fechaMantenimiento').setValue( // Mantenimiento
            instalacion.IRISM_FechaMantenimiento ?  new Date(instalacion.IRISM_FechaMantenimiento) : null
          );
          this.fgButano.get('tipoTrabajo').setValue(instalacion.IRISB_Id_TipoTrabajo); // Butano
        });
    });
  }

  validate() {
    return (!this.changed &&
            this.fgInstalacion.pristine && this.fgIris.pristine && this.fgCompleta.pristine && 
            this.fgMantenimiento.pristine && this.fgButano.pristine) ||
           (this.fgInstalacion.invalid || this.fgIris.invalid || this.fgCompleta.invalid || 
            this.fgMantenimiento.invalid || this.fgButano.invalid);
  }

  switchEsBaja() {
    if (this.esBaja == 1)
      this.esBaja = 0;
    else
      this.esBaja = 1;

    this.changed = !this.changed;
  }

  update() {
    let fM = null;

    if(this.fgMantenimiento.get('fechaMantenimiento').value)
      fM = this.fgMantenimiento.get('fechaMantenimiento').value;
    else
      fM = DateManager.addYearsToDate(
            this.fgInstalacion.get('fechaInstalacion').value, 
            this.fgMantenimiento.get('years').value);

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
      this.fgButano.get('tipoTrabajo').value, // Butano
      this.tipo // Tipo = Butano = 3
    ).subscribe((res: any) => {
      console.log(res);
      this.snackBar.open(res.status, "Aceptar", {
        duration: 5000
      });
      
      this.router.navigate(['/detalles-butano/', this.idInstalacion]);
    });
  }
}