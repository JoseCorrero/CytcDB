import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-cont-dist',
  templateUrl: './form-cont-dist.component.html',
  styleUrls: ['./form-cont-dist.component.css']
})
export class FormContDistComponent implements OnInit {

  fgContDist: FormGroup;

  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Dicieciembre'
  ];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() { }

  private createForm() {
    this.fgContDist = this.fb.group({
      campana: [ '' ],
      fechaGrabCont: [ null ],
      fechaGrabCert: [ null ],
      cups: [ '' ],
      regularizacion: [ null , Validators.compose([Validators.max(99999999.99), Validators.min(0)]) ],
      numCertRegul: [ '' ], 
      subvencion: [ null , Validators.compose([Validators.max(99999999.99), Validators.min(0)]) ],
      subvFacturada: [ null ], 
      cobradoSubv: [ null , Validators.compose([Validators.max(99999999.99), Validators.min(0)]) ],
      numCertSubv: [ '' ], 
      colaboracion: [ null , Validators.compose([Validators.max(99999999.99), Validators.min(0)]) ],
      colabFacturada: [ null ], 
      cobradoColab: [ null , Validators.compose([Validators.max(99999999.99), Validators.min(0)]) ],
      numCertColab: [ '' ], 
      numSolicitudZeus: [ '' ], 
      subvencionIdi: [ null , Validators.compose([Validators.max(99999999.99), Validators.min(0)]) ],
      idiFacturado: [ null ], 
      tipo: [ null ]
    });
  }
}
