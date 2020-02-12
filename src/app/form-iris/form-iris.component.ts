import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-iris',
  templateUrl: './form-iris.component.html',
  styleUrls: ['./form-iris.component.css']
})
export class FormIrisComponent implements OnInit {

  fgIris: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() { }

  private createForm() {
    this.fgIris = this.fb.group({
      nombre: [ '' ],
      apellidos: [ '' ],
      dni: [ '' ],
      telefonos: [ '' ],
      cobrado: [ null ],
      aparatoExistente: [ '' ],
      aparatosVendidos: [ '' ]
    });
  }
}
