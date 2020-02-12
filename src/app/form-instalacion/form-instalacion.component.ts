import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ProvinciasService } from '../services/provincias.service';
import { PoblacionesService } from '../services/poblaciones.service';
import { ContratantesService } from '../services/contratantes.service';

import Provincia from '../classes/Provincia';
import Poblacion from '../classes/Poblacion';
import Contratante from '../classes/Contratante';
import { CreatePoblacionComponent } from '../create-poblacion/create-poblacion.component';

@Component({
  selector: 'app-form-instalacion',
  templateUrl: './form-instalacion.component.html',
  styleUrls: ['./form-instalacion.component.css']
})
export class FormInstalacionComponent implements OnInit {
  
  fgInstalacion: FormGroup;

  provincias: Provincia[];
  contratantes: Contratante[];
  
  constructor(public dialog: MatDialog,
              private fb: FormBuilder,
              private provServ: ProvinciasService,
              private poblServ: PoblacionesService,
              private contServ: ContratantesService) {

    this.createForm();
    this.provincias = [];
    this.contratantes = [];
  }

  ngOnInit() {
    this.loadPoblaciones();

    this.contServ.getContratantes('').subscribe((contratantes: any[]) => {
      contratantes.forEach((contratante:any) => {
        this.contratantes.push(new Contratante(contratante.Id, contratante.Nombre));
      });
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreatePoblacionComponent, {
      width: '300px',
      data: this.provincias
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadPoblaciones();
    });
  }

  private loadPoblaciones() {
    this.provincias = [];

    this.provServ.getProvincias('').subscribe((provincias: any[]) => {
      provincias.forEach((provincia: any) => {
        this.poblServ.getPoblaciones(provincia.Id, '').subscribe((poblaciones: any[]) => {
          let array: Poblacion[] = [];
          
          poblaciones.forEach((poblacion: any) => {
            array.push(new Poblacion(poblacion.Id, poblacion.Nombre));
          });

          this.provincias.push(new Provincia(provincia.Id, provincia.Nombre, array));
        });
      });
    });
  }

  private createForm() {
    this.fgInstalacion = this.fb.group({
      direccion: [ '' ],
      poblacion: [ null ],
      contratante: [ null ],
      fechaInstalacion: [ null ],
      agente: [ '' ],
      instaladores: [ '' ],
      presupuesto: [ null , Validators.compose([Validators.max(99999999.99), Validators.min(0)]) ],
      observaciones: [ '' ]
    });
  }
}
