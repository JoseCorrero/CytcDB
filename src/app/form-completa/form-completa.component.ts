import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EstadosService } from '../services/estados.service';

import Estado from '../classes/Estado';

@Component({
  selector: 'app-form-completa',
  templateUrl: './form-completa.component.html',
  styleUrls: ['./form-completa.component.css']
})
export class FormCompletaComponent implements OnInit {
  
  fgCompleta: FormGroup;

  estados: Estado[];
  
  constructor(private fb: FormBuilder,
              private estServ: EstadosService) {

    this.createForm();
    this.estados = [];
  }

  ngOnInit() {
    this.estServ.getEstados('').subscribe((estados: any[]) => {
      estados.forEach((estado:any) => {
        this.estados.push(new Estado(estado.Id, estado.Nombre));
      });
    });
  }

  private createForm() {
    this.fgCompleta = this.fb.group({
      estado: [ null ],
      fechaContrato: [ null ],
      observaciones: [ '' ]
    });
  }
}
