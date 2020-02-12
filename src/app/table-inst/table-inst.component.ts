import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { InstalacionesService } from '../services/instalaciones.service';
import { PoblacionesService } from '../services/poblaciones.service';
import { ContratantesService } from '../services/contratantes.service';

@Component({
  selector: 'app-table-inst',
  templateUrl: './table-inst.component.html',
  styleUrls: ['./table-inst.component.css']
})
export class TableInstComponent implements OnInit {

  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  displayedColumns: string[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @Input() tipo: number;
  
  poblaciones: Map<number, string>;
  contratantes: Map<number, string>;

  constructor(private instServ: InstalacionesService,
              private poblServ: PoblacionesService,
              private contServ: ContratantesService) {

    this.poblaciones = new Map<number, string>();
    this.contratantes = new Map<number, string>();
  }

  ngOnInit() {
    switch(this.tipo.toString()) {
      case '1': this.displayedColumns = ['Direccion', 'Poblacion', 'FechaInstalacion', 'Contratante', 'Opciones', 'Baja'];
        break;
      default: this.displayedColumns = ['Direccion', 'Poblacion', 'Nombre', 'FechaInstalacion', 'Contratante', 'Opciones', 'Baja'];
    }

    this.poblServ.getPoblaciones(null, '')
    .subscribe((poblaciones: any[]) => {
      poblaciones.forEach(poblacion => {
        this.poblaciones.set(poblacion.Id, poblacion.Nombre);
      });
    });

    this.contServ.getContratantes('')
    .subscribe((contratantes: any[]) => {
      contratantes.forEach(contratante => {
        this.contratantes.set(contratante.Id, contratante.Nombre);
      });
    });
  }

  search(esBaja, direccion, poblacion, preFecha, postFecha, contratante, apellidos) {
    let elements: PeriodicElement[] = [];
    let options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    this.instServ.getInstalaciones(esBaja, direccion, poblacion, preFecha, postFecha, contratante, apellidos, this.tipo)
    .subscribe((data: any[]) => {
      data.forEach(e => {
        elements.push({
          Id: e.Id,
          Direccion: e.Direccion,
          Poblacion: this.poblaciones.get(e.Id_Poblacion),
          Contratante: this.contratantes.get(e.Id_Contratante),
          Nombre: (e.IRIS_Apellidos + ', ' + e.IRIS_Nombre), 
          FechaInstalacion: 
          e.FechaInstalacion ? new Date(e.FechaInstalacion).toLocaleDateString("es-ES", options) : null,
          Baja: e.EsBaja,
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
  Baja: number;
  Direccion: string;
  Poblacion: string;
  Contratante: string;
  Nombre: string;
  FechaInstalacion: string;
  Tipo: number;
}