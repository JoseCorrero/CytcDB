import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TiposTrabajoService } from '../services/tipos-trabajo.service';

import TipoTrabajo from '../classes/TipoTrabajo';

@Component({
  selector: 'app-form-butano',
  templateUrl: './form-butano.component.html',
  styleUrls: ['./form-butano.component.css']
})
export class FormButanoComponent implements OnInit {

  fgButano: FormGroup;

  trabajos: TipoTrabajo[];

  constructor(private fb: FormBuilder,
              private trabServ: TiposTrabajoService) {

    this.createForm();
    this.trabajos = [];
  }

  ngOnInit() {
    this.trabServ.getTiposTrabajo('').subscribe((trabajos: any[]) => {
      trabajos.forEach((trabajo:any) => {
        this.trabajos.push(new TipoTrabajo(trabajo.Id, trabajo.Nombre));
      });
    });
  }

  private createForm() {
    this.fgButano = this.fb.group({
      tipoTrabajo: [ null ]
    });
  }
}
