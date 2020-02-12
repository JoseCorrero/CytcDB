import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PoblacionesService } from '../services/poblaciones.service';

import Provincia from '../classes/Provincia';

@Component({
  selector: 'app-create-poblacion',
  templateUrl: './create-poblacion.component.html',
  styleUrls: ['./create-poblacion.component.css']
})
export class CreatePoblacionComponent implements OnInit {

  fgPoblacion: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreatePoblacionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Provincia[],
              private fb: FormBuilder,
              private poblServ: PoblacionesService,
              private snackBar: MatSnackBar) {

    this.createForm();
  }

  ngOnInit() {
  }

  create() {
    this.poblServ.addPoblacion(this.fgPoblacion.get('provincia').value,
      this.fgPoblacion.get('nombre').value
    ).subscribe((res: any) => {
      console.log(res);
      this.snackBar.open(res.status, "Aceptar", {
        duration: 5000
      });

      this.dialogRef.close();
    });
  }

  validate() {
    return this.fgPoblacion.get('provincia').value == null || this.fgPoblacion.get('nombre').value == '';
  }

  cancel(): void {
    this.dialogRef.close();
  }

  private createForm() {
    this.fgPoblacion = this.fb.group({
      provincia: [null],
      nombre: ['']
    });
  }
}
