import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { FormInstalacionComponent } from '../form-instalacion/form-instalacion.component';
import { FormIrisComponent } from '../form-iris/form-iris.component';
import { FormCompletaComponent } from '../form-completa/form-completa.component';
import { FormGasNaturalComponent } from '../form-gas-natural/form-gas-natural.component';

import { InstalacionesService } from '../services/instalaciones.service';
import { ContComsService } from '../services/cont-coms.service';
import { ContDistsService } from '../services/cont-dists.service';

@Component({
  selector: 'app-edit-gas-natural',
  templateUrl: './edit-gas-natural.component.html',
  styleUrls: ['./edit-gas-natural.component.css']
})
export class EditGasNaturalComponent implements OnInit {

  @ViewChild(FormInstalacionComponent, null) formInstalacion: FormInstalacionComponent;
  @ViewChild(FormIrisComponent, null) formIris: FormIrisComponent;
  @ViewChild(FormCompletaComponent, null) formCompleta: FormCompletaComponent;
  @ViewChild(FormGasNaturalComponent, null) formGasNatural: FormGasNaturalComponent;

  fgInstalacion: FormGroup;
  fgIris: FormGroup;
  fgCompleta: FormGroup;
  fgGasNatural: FormGroup;

  tipo: number = 2; // Tipo = Gas Natural = 2
  esBaja: number;
  changed: boolean = false;

  idInstalacion: number;
  idContCom: number;
  idContDist: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private instServ: InstalacionesService,
              private comServ: ContComsService,
              private distServ: ContDistsService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fgInstalacion = this.formInstalacion.fgInstalacion;
    this.fgIris = this.formIris.fgIris;
    this.fgCompleta = this.formCompleta.fgCompleta;
    this.fgGasNatural = this.formGasNatural.fgGasNatural;

    this.route.params.subscribe(params => {
      this.idInstalacion = params.id;
      this.instServ.getInstalacion(this.idInstalacion, this.tipo)
        .subscribe((instalacion: any) => {
          instalacion = instalacion[0];

          this.idContCom = instalacion.IRISGN_Id_ContCom;
          this.idContDist = instalacion.IRISGN_Id_ContDist;

          this.esBaja = instalacion.EsBaja;
          this.fgInstalacion.get('direccion').setValue(instalacion.Direccion); // Instalación
          this.fgInstalacion.get('poblacion').setValue(instalacion.Id_Poblacion);
          this.fgInstalacion.get('contratante').setValue(instalacion.Id_Contratante);
          this.fgInstalacion.get('fechaInstalacion').setValue(instalacion.FechaInstalacion);
          this.fgInstalacion.get('agente').setValue(instalacion.Agente);
          this.fgInstalacion.get('instaladores').setValue(instalacion.Instaladores);
          this.fgInstalacion.get('presupuesto').setValue(instalacion.Presupuesto);
          this.fgInstalacion.get('observaciones').setValue(instalacion.Observaciones);
          this.fgIris.get('nombre').setValue(instalacion.IRIS_Nombre); // IRIS
          this.fgIris.get('apellidos').setValue(instalacion.IRIS_Apellidos);
          this.fgIris.get('dni').setValue(instalacion.IRIS_Dni);
          this.fgIris.get('telefonos').setValue(instalacion.IRIS_Telefonos);
          this.fgIris.get('cobrado').setValue(instalacion.IRIS_Cobrado);
          this.fgIris.get('aparatoExistente').setValue(instalacion.IRIS_AparatoExistente);
          this.fgIris.get('aparatosVendidos').setValue(instalacion.IRIS_AparatosVendidos);
          this.fgCompleta.get('estado').setValue(instalacion.IRISC_Id_Estado); // Completa
          this.fgCompleta.get('fechaContrato').setValue(instalacion.IRISC_FechaContrato);
          this.fgCompleta.get('observaciones').setValue(instalacion.IRISC_Observaciones);
          this.fgGasNatural.get('mercado').setValue(instalacion.IRISGN_Id_Mercado); // Gas natural
          this.fgGasNatural.get('fechaPuestaGas').setValue(instalacion.IRISGN_FechaPuestaGas);
          this.fgGasNatural.get('tiposAparato').setValue(instalacion.IRISGN_TiposAparato);
          this.fgGasNatural.get('piezas').setValue(instalacion.IRISGN_Piezas);
          this.fgGasNatural.get('tiroForzado').setValue(instalacion.IRISGN_TiroForzado);
          this.fgGasNatural.get('soporteExterior').setValue(instalacion.IRISGN_SoporteExterior);
          this.fgGasNatural.get('idi').setValue(instalacion.IRISGN_Idi);
          this.fgGasNatural.get('facturado1').setValue(instalacion.IRISGN_Facturado1);
          this.fgGasNatural.get('facturado2').setValue(instalacion.IRISGN_Facturado2);
          this.fgGasNatural.get('contObservaciones').setValue(instalacion.IRISGN_ContObservaciones);

          this.comServ.getContCom(this.idContCom).subscribe((contCom: any) => {
            contCom = contCom[0];

            this.formGasNatural.fgContCom.get('subvencion').setValue(contCom.Subvencion);
            this.formGasNatural.fgContCom.get('numeroSolicitud').setValue(contCom.NumeroSolicitud);
            this.formGasNatural.fgContCom.get('facturado').setValue(contCom.Facturado);
            this.formGasNatural.fgContCom.get('numeroCertificacion').setValue(contCom.NumeroCertificacion);
          });

          this.distServ.getContDist(this.idContDist).subscribe((contDist: any) => {
            contDist = contDist[0];

            this.formGasNatural.fgContDist.get('campana').setValue(contDist.Campana);
            this.formGasNatural.fgContDist.get('fechaGrabCont').setValue(contDist.FechaGrabCont);
            this.formGasNatural.fgContDist.get('fechaGrabCert').setValue(contDist.FechaGrabCert);
            this.formGasNatural.fgContDist.get('cups').setValue(contDist.Cups);
            this.formGasNatural.fgContDist.get('regularizacion').setValue(contDist.Regularizacion);
            this.formGasNatural.fgContDist.get('numCertRegul').setValue(contDist.NumCertRegul);
            this.formGasNatural.fgContDist.get('subvencion').setValue(contDist.Subvencion);
            this.formGasNatural.fgContDist.get('subvFacturada').setValue(contDist.SubvFacturada);
            this.formGasNatural.fgContDist.get('cobradoSubv').setValue(contDist.CobradoSubv);
            this.formGasNatural.fgContDist.get('numCertSubv').setValue(contDist.NumCertSubv);
            this.formGasNatural.fgContDist.get('colaboracion').setValue(contDist.Colaboracion);
            this.formGasNatural.fgContDist.get('colabFacturada').setValue(contDist.ColabFacturada);
            this.formGasNatural.fgContDist.get('cobradoColab').setValue(contDist.CobradoColab);
            this.formGasNatural.fgContDist.get('numCertColab').setValue(contDist.NumCertColab);
            this.formGasNatural.fgContDist.get('numSolicitudZeus').setValue(contDist.NumSolicitudZeus);
            this.formGasNatural.fgContDist.get('subvencionIdi').setValue(contDist.SubvencionIdi);
            this.formGasNatural.fgContDist.get('idiFacturado').setValue(contDist.IdiFacturado);
            this.formGasNatural.fgContDist.get('tipo').setValue(contDist.Tipo);
          });
        });
    });
  }

  validate() {
    return (!this.changed &&
      this.fgInstalacion.pristine && this.fgIris.pristine && this.fgCompleta.pristine &&
      this.fgGasNatural.pristine && this.formGasNatural.fgContCom.pristine && this.formGasNatural.fgContDist.pristine) ||
      (this.fgInstalacion.invalid || this.fgIris.invalid || this.fgCompleta.invalid ||
        this.fgGasNatural.invalid || this.formGasNatural.fgContCom.invalid || this.formGasNatural.fgContDist.invalid);
  }

  switchEsBaja() {
    if (this.esBaja == 1)
      this.esBaja = 0;
    else
      this.esBaja = 1;

    this.changed = !this.changed;
  }

  update() {
    this.comServ.updateContCom(  // Actualizar contrato comercializadora
      this.idContCom,
      this.formGasNatural.fgContCom.get('subvencion').value,
      this.formGasNatural.fgContCom.get('numeroSolicitud').value,
      this.formGasNatural.fgContCom.get('facturado').value,
      this.formGasNatural.fgContCom.get('numeroCertificacion').value
    ).subscribe((resCom: any) => {
      this.distServ.updateContDist(  // Actualizar contrato distribuidora
        this.idContDist,
        this.formGasNatural.fgContDist.get('campana').value,
        this.formGasNatural.fgContDist.get('fechaGrabCont').value,
        this.formGasNatural.fgContDist.get('fechaGrabCert').value,
        this.formGasNatural.fgContDist.get('cups').value,
        this.formGasNatural.fgContDist.get('regularizacion').value,
        this.formGasNatural.fgContDist.get('numCertRegul').value,
        this.formGasNatural.fgContDist.get('subvencion').value,
        this.formGasNatural.fgContDist.get('subvFacturada').value,
        this.formGasNatural.fgContDist.get('cobradoSubv').value,
        this.formGasNatural.fgContDist.get('numCertSubv').value,
        this.formGasNatural.fgContDist.get('colaboracion').value,
        this.formGasNatural.fgContDist.get('colabFacturada').value,
        this.formGasNatural.fgContDist.get('cobradoColab').value,
        this.formGasNatural.fgContDist.get('numCertColab').value,
        this.formGasNatural.fgContDist.get('numSolicitudZeus').value,
        this.formGasNatural.fgContDist.get('subvencionIdi').value,
        this.formGasNatural.fgContDist.get('idiFacturado').value,
        this.formGasNatural.fgContDist.get('tipo').value
      ).subscribe((resDist: any) => {
        this.instServ.updateInstalacion(   // Actualizar instalación de gas natural
          this.idInstalacion,
          this.esBaja, // Es baja
          this.fgInstalacion.get('direccion').value, // Instalación
          this.fgInstalacion.get('poblacion').value,
          this.fgInstalacion.get('contratante').value,
          this.fgInstalacion.get('fechaInstalacion').value,
          this.fgInstalacion.get('agente').value,
          this.fgInstalacion.get('instaladores').value,
          this.fgInstalacion.get('presupuesto').value,
          this.fgInstalacion.get('observaciones').value,
          null, null, // IRC
          this.fgIris.get('nombre').value, // IRIS
          this.fgIris.get('apellidos').value,
          this.fgIris.get('dni').value,
          this.fgIris.get('telefonos').value,
          this.fgIris.get('cobrado').value,
          this.fgIris.get('aparatoExistente').value,
          this.fgIris.get('aparatosVendidos').value,
          this.fgCompleta.get('estado').value, // Completa
          this.fgCompleta.get('fechaContrato').value,
          this.fgCompleta.get('observaciones').value,
          this.fgGasNatural.get('mercado').value, // Gas natural
          this.fgGasNatural.get('fechaPuestaGas').value,
          this.fgGasNatural.get('tiposAparato').value,
          this.fgGasNatural.get('piezas').value,
          this.fgGasNatural.get('tiroForzado').value,
          this.fgGasNatural.get('soporteExterior').value,
          this.fgGasNatural.get('idi').value,
          this.fgGasNatural.get('facturado1').value,
          this.fgGasNatural.get('facturado2').value,
          this.idContCom,
          this.idContDist,
          this.fgGasNatural.get('contObservaciones').value,
          null, // Mantenimiento
          null, // Butano
          this.tipo // Tipo = Gas Natural = 2
        ).subscribe((res: any) => {
          console.log(res);
          this.snackBar.open(res.status, "Aceptar", {
            duration: 5000
          });
      
          this.router.navigate(['/detalles-gasnatural/', this.idInstalacion]);
        });
      });
    });
  }
}