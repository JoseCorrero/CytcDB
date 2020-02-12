import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { TableMantenimientoComponent } from '../table-mantenimiento/table-mantenimiento.component';

@Component({
  selector: 'app-get-mantenimiento',
  templateUrl: './get-mantenimiento.component.html',
  styleUrls: ['./get-mantenimiento.component.css']
})
export class GetMantenimientoComponent implements OnInit {

  @ViewChild(TableMantenimientoComponent, null) table: TableMantenimientoComponent;

  postHoy: boolean = true;

  constructor() { }

  switchSearch() {
    this.postHoy = !this.postHoy;

    if(this.postHoy)
      this.search(new Date());
    else
      this.search(null);
  }

  search(fecha) {    
    this.table.search(fecha);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.search(new Date());
  }
}
