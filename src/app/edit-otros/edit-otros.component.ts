import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { FormInstalacionComponent } from '../form-instalacion/form-instalacion.component';
import { FormIrisComponent } from '../form-iris/form-iris.component';

import { InstalacionesService } from '../services/instalaciones.service';

@Component({
  selector: 'app-edit-otros',
  templateUrl: './edit-otros.component.html',
  styleUrls: ['./edit-otros.component.css']
})
export class EditOtrosComponent implements OnInit {

  @ViewChild(FormInstalacionComponent, null) formInstalacion: FormInstalacionComponent;
  @ViewChild(FormIrisComponent, null) formIris: FormIrisComponent;

  fgInstalacion: FormGroup;
  fgIris: FormGroup;

  tipo: number = 5; // Tipo = Otros = 5
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
          this.fgIris.get('nombre').setValue(instalacion.IRIS_Nombre); // IRIS
          this.fgIris.get('apellidos').setValue(instalacion.IRIS_Apellidos);
          this.fgIris.get('dni').setValue(instalacion.IRIS_Dni);
          this.fgIris.get('telefonos').setValue(instalacion.IRIS_Telefonos);
          this.fgIris.get('cobrado').setValue(instalacion.IRIS_Cobrado);
          this.fgIris.get('aparatoExistente').setValue(instalacion.IRIS_AparatoExistente);
          this.fgIris.get('aparatosVendidos').setValue(instalacion.IRIS_AparatosVendidos);
        });
    });
  }

  validate() {
    return (!this.changed &&
            this.fgInstalacion.pristine && this.fgIris.pristine) || 
           (this.fgInstalacion.invalid || this.fgIris.invalid);
  }

  switchEsBaja() {
    if (this.esBaja == 1)
      this.esBaja = 0;
    else
      this.esBaja = 1;

    this.changed = !this.changed;
  }

  update() {
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
      null, null, // IRC
      this.fgIris.get('nombre').value, // IRIS
      this.fgIris.get('apellidos').value, 
      this.fgIris.get('dni').value, 
      this.fgIris.get('telefonos').value, 
      this.fgIris.get('cobrado').value, 
      this.fgIris.get('aparatoExistente').value, 
      this.fgIris.get('aparatosVendidos').value, 
      null, // Completa
      null,
      null,
      null, null, null, null, null, null, null, null, null, null, null, null, // Gas natural
      null, // Mantenimiento
      null, // Butano
      this.tipo // Tipo = Otros = 5
    ).subscribe((res: any) => {
      console.log(res);
      this.snackBar.open(res.status, "Aceptar", {
        duration: 5000
      });
      
      this.router.navigate(['/detalles-otros/', this.idInstalacion]);
    });
  }
}
