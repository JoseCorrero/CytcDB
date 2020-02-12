import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-mantenimiento',
  templateUrl: './form-mantenimiento.component.html',
  styleUrls: ['./form-mantenimiento.component.css']
})
export class FormMantenimientoComponent implements OnInit {

  fgMantenimiento: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() { }

  private createForm() {
    this.fgMantenimiento = this.fb.group({
      years: [ null, Validators.min(0) ],
      fechaMantenimiento: [ null ]
    });
  }
}