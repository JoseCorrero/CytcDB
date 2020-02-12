import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-cont-com',
  templateUrl: './form-cont-com.component.html',
  styleUrls: ['./form-cont-com.component.css']
})
export class FormContComComponent implements OnInit {

  fgContCom: FormGroup;

  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Dicieciembre'
  ];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() { }

  private createForm() {
    this.fgContCom = this.fb.group({
      subvencion: [ null , Validators.compose([Validators.max(99999999.99), Validators.min(0)]) ],
      numeroSolicitud: [ '' ], 
      facturado: [ null ], 
      numeroCertificacion: [ '' ]
    });
  }
}
