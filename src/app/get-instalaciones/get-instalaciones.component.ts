import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { TableInstComponent } from '../table-inst/table-inst.component';

import { ProvinciasService } from '../services/provincias.service';
import { PoblacionesService } from '../services/poblaciones.service';
import { ContratantesService } from '../services/contratantes.service';

import Provincia from '../classes/Provincia';
import Poblacion from '../classes/Poblacion';
import Contratante from '../classes/Contratante';

@Component({
  selector: 'app-get-instalaciones',
  templateUrl: './get-instalaciones.component.html',
  styleUrls: ['./get-instalaciones.component.css']
})
export class GetInstalacionesComponent implements OnInit, AfterViewInit {

  @ViewChild('ircs', null) tableIrc: TableInstComponent;
  @ViewChild('gasnatural', null) tableGasNatural: TableInstComponent;
  @ViewChild('butano', null) tableButano: TableInstComponent;
  @ViewChild('solar', null) tableSolar: TableInstComponent;
  @ViewChild('otros', null) tableOtros: TableInstComponent;

  fgFiltros: FormGroup;

  provincias: Provincia[];
  contratantes: Contratante[];

  constructor(private fb: FormBuilder,
              private provServ: ProvinciasService,
              private poblServ: PoblacionesService,
              private contServ: ContratantesService) {

    this.createForm();
    this.provincias = [];
    this.contratantes = [];
  }

  validate() {
    return this.fgFiltros.invalid;
  }

  search() {    
    this.tableIrc.search(
      this.fgFiltros.get('esBaja').value, 
      this.fgFiltros.get('direccion').value, 
      this.fgFiltros.get('poblacion').value, 
      this.fgFiltros.get('preFecha').value, 
      this.fgFiltros.get('postFecha').value, 
      this.fgFiltros.get('contratante').value, 
      this.fgFiltros.get('apellidos').value);

    this.tableGasNatural.search(
      this.fgFiltros.get('esBaja').value,  
      this.fgFiltros.get('direccion').value, 
      this.fgFiltros.get('poblacion').value, 
      this.fgFiltros.get('preFecha').value, 
      this.fgFiltros.get('postFecha').value, 
      this.fgFiltros.get('contratante').value, 
      this.fgFiltros.get('apellidos').value);

    this.tableButano.search(
      this.fgFiltros.get('esBaja').value, 
      this.fgFiltros.get('direccion').value, 
      this.fgFiltros.get('poblacion').value, 
      this.fgFiltros.get('preFecha').value, 
      this.fgFiltros.get('postFecha').value, 
      this.fgFiltros.get('contratante').value, 
      this.fgFiltros.get('apellidos').value);

    this.tableSolar.search(
      this.fgFiltros.get('esBaja').value, 
      this.fgFiltros.get('direccion').value, 
      this.fgFiltros.get('poblacion').value, 
      this.fgFiltros.get('preFecha').value, 
      this.fgFiltros.get('postFecha').value, 
      this.fgFiltros.get('contratante').value, 
      this.fgFiltros.get('apellidos').value);

    this.tableOtros.search(
      this.fgFiltros.get('esBaja').value, 
      this.fgFiltros.get('direccion').value, 
      this.fgFiltros.get('poblacion').value, 
      this.fgFiltros.get('preFecha').value, 
      this.fgFiltros.get('postFecha').value, 
      this.fgFiltros.get('contratante').value, 
      this.fgFiltros.get('apellidos').value);
  }

  clear() {
    this.fgFiltros.get('esBaja').setValue(null);
    this.fgFiltros.get('direccion').setValue('');
    this.fgFiltros.get('poblacion').setValue(null);
    this.fgFiltros.get('preFecha').setValue(null);
    this.fgFiltros.get('postFecha').setValue(null);
    this.fgFiltros.get('contratante').setValue(null);
    this.fgFiltros.get('apellidos').setValue('');
  }

  ngOnInit() {
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

    this.contServ.getContratantes('').subscribe((contratantes: any[]) => {
      contratantes.forEach((contratante:any) => {
        this.contratantes.push(new Contratante(contratante.Id, contratante.Nombre));
      });
    });
  }

  ngAfterViewInit() {
    this.search();
  }
  
  private createForm() {
    this.fgFiltros = this.fb.group({
      esBaja: [ null ],
      direccion: [ '' ],
      poblacion: [ null ],
      preFecha: [ null ],
      postFecha: [ null ],
      contratante: [ null ],
      apellidos: [ '' ]
    });
  }
}
