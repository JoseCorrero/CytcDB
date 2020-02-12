import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { FormInstalacionComponent } from '../form-instalacion/form-instalacion.component';
import { FormIrisComponent } from '../form-iris/form-iris.component';
import { FormCompletaComponent } from '../form-completa/form-completa.component';
import { FormGasNaturalComponent } from '../form-gas-natural/form-gas-natural.component';

import { InstalacionesService } from '../services/instalaciones.service';
import { ContComsService } from '../services/cont-coms.service';
import { ContDistsService } from '../services/cont-dists.service';

import DropboxManager from '../classes/DropboxManager';

@Component({
  selector: 'app-crear-gas-natural',
  templateUrl: './crear-gas-natural.component.html',
  styleUrls: ['./crear-gas-natural.component.css']
})
export class CrearGasNaturalComponent implements OnInit {

  @ViewChild(FormInstalacionComponent, null) formInstalacion: FormInstalacionComponent;
  @ViewChild(FormIrisComponent, null) formIris: FormIrisComponent;
  @ViewChild(FormCompletaComponent, null) formCompleta: FormCompletaComponent;
  @ViewChild(FormGasNaturalComponent, null) formGasNatural: FormGasNaturalComponent;

  fgInstalacion: FormGroup;
  fgIris: FormGroup;
  fgCompleta: FormGroup;
  fgGasNatural: FormGroup;

  tipo: number = 2; // Tipo = Gas Natural = 2

  constructor(private router: Router,
    private instServ: InstalacionesService,
    private comServ: ContComsService,
    private distServ: ContDistsService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fgInstalacion = this.formInstalacion.fgInstalacion;
    this.fgIris = this.formIris.fgIris;
    this.fgCompleta = this.formCompleta.fgCompleta;
    this.fgGasNatural = this.formGasNatural.fgGasNatural;
  }

  validate() {
    return (this.fgInstalacion.pristine && this.fgIris.pristine && this.fgCompleta.pristine &&
      this.fgGasNatural.pristine && this.formGasNatural.fgContCom.pristine && this.formGasNatural.fgContDist.pristine) ||
      (this.fgInstalacion.invalid || this.fgIris.invalid || this.fgCompleta.invalid ||
        this.fgGasNatural.invalid || this.formGasNatural.fgContCom.invalid || this.formGasNatural.fgContDist.invalid);
  }

  create() {
    this.comServ.addContCom(  // Crear contrato comercializadora
      this.formGasNatural.fgContCom.get('subvencion').value,
      this.formGasNatural.fgContCom.get('numeroSolicitud').value,
      this.formGasNatural.fgContCom.get('facturado').value,
      this.formGasNatural.fgContCom.get('numeroCertificacion').value
    ).subscribe((resCom: any) => {
      this.distServ.addContDist(  // Crear contrato distribuidora
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
        this.instServ.addInstalacion(   // Crear instalación de gas natural
          0, // Es baja = false = 0
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
          resCom.id,
          resDist.id,
          this.fgGasNatural.get('contObservaciones').value,
          null, // Mantenimiento
          null, // Butano
          this.tipo // Tipo = Gas Natural = 2
        ).subscribe((res: any) => {
          console.log(res);
          this.snackBar.open(res.status, "Aceptar", {
            duration: 5000
          });
      
          DropboxManager.createFolder("/GasNatural/" + res.id);
          this.router.navigate(['/detalles-gasnatural/', res.id]);
        });
      });
    });
  }
}
