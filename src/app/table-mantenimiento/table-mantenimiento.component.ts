import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { MantenimientosService } from '../services/mantenimientos.service';
import { PoblacionesService } from '../services/poblaciones.service';

@Component({
  selector: 'app-table-mantenimiento',
  templateUrl: './table-mantenimiento.component.html',
  styleUrls: ['./table-mantenimiento.component.css']
})
export class TableMantenimientoComponent implements OnInit {

  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  displayedColumns: string[] = ['Direccion', 'Poblacion', 'Nombre', 'FechaMantenimiento', 'Tipo', 'Opciones'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  
  poblaciones: Map<number, string>;
  hoy: Date;

  constructor(private mantServ: MantenimientosService,
              private poblServ: PoblacionesService) {

    this.poblaciones = new Map<number, string>();
    this.hoy = new Date();
  }

  days(fecha) {
    if(fecha) {
      var parts = fecha.match(/(\d+)/g);
      fecha = new Date(parts[2], parts[1]-1, parts[0]);
      return (fecha.getTime() - this.hoy.getTime()) / (1000 * 3600 * 24);
    }
  }

  ngOnInit() {
    this.poblServ.getPoblaciones(null, '')
    .subscribe((poblaciones: any[]) => {
      poblaciones.forEach(poblacion => {

        this.poblaciones.set(poblacion.Id, poblacion.Nombre);
      });
    });
  }

  search(fecha) {
    let elements: PeriodicElement[] = [];
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    this.mantServ.getMantenimientos(fecha)
    .subscribe((data: any[]) => {
      data.forEach(e => {
        elements.push({
          Id: e.Id,
          Direccion: e.Direccion,
          Poblacion: this.poblaciones.get(e.Id_Poblacion),
          Nombre: (e.IRIS_Apellidos + ', ' + e.IRIS_Nombre),
          FechaMantenimiento: 
          e.IRISM_FechaMantenimiento ? new Date(e.IRISM_FechaMantenimiento).toLocaleDateString("es-ES", options) : null,
          Tipo: e.Tipo
        });
      });

      this.dataSource = new MatTableDataSource<any>(elements);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}

export interface PeriodicElement {
  Id: number;
  Direccion: string;
  Poblacion: string;
  Nombre: string;
  FechaMantenimiento: string;
  Tipo: number;
}