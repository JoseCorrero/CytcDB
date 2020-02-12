import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormContComComponent } from '../form-cont-com/form-cont-com.component';
import { FormContDistComponent } from '../form-cont-dist/form-cont-dist.component';

import { MercadosService } from '../services/mercados.service';

import Mercado from '../classes/Mercado';

@Component({
  selector: 'app-form-gas-natural',
  templateUrl: './form-gas-natural.component.html',
  styleUrls: ['./form-gas-natural.component.css']
})
export class FormGasNaturalComponent implements OnInit, AfterViewInit {

  @ViewChild(FormContComComponent, null) formContCom: FormContComComponent;
  @ViewChild(FormContDistComponent, null) formContDist: FormContDistComponent;

  fgGasNatural: FormGroup;
  fgContCom: FormGroup;
  fgContDist: FormGroup;

  mercados: Mercado[];

  constructor(private fb: FormBuilder,
              private mercServ: MercadosService) {

    this.createForm();
    this.mercados = [];
  }

  ngOnInit() {
    this.fgContCom = this.formContCom.fgContCom;
    this.fgContDist = this.formContDist.fgContDist;

    this.mercServ.getMercados('').subscribe((mercados: any[]) => {
      mercados.forEach((mercado:any) => {
        this.mercados.push(new Mercado(mercado.Id, mercado.Nombre));
      });
    });
  }

  ngAfterViewInit() {
    this.fgContCom = this.formContCom.fgContCom;
    this.fgContDist = this.formContDist.fgContDist;
  }

  private createForm() {
    this.fgGasNatural = this.fb.group({
      mercado: [ null ], 
      fechaPuestaGas: [ null ], 
      tiposAparato: [ '' ], 
      piezas: [ '' ], 
      tiroForzado: [ null ], 
      soporteExterior: [ null ], 
      idi: [ null ], 
      facturado1: [ null ], 
      facturado2: [ null ], 
      contObservaciones: [ '' ]
    });
  }
}

