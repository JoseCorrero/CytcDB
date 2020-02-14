import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InstalacionesService } from '../services/instalaciones.service';
import { PoblacionesService } from '../services/poblaciones.service';
import { ContratantesService } from '../services/contratantes.service';
import { EstadosService } from '../services/estados.service';
import { MercadosService } from '../services/mercados.service';
import { ContComsService } from '../services/cont-coms.service';
import { ContDistsService } from '../services/cont-dists.service';

import Instalacion from '../classes/Instalacion';
import Poblacion from '../classes/Poblacion';
import Contratante from '../classes/Contratante';
import Estado from '../classes/Estado';
import Mercado from '../classes/Mercado';
import ContratoComercializadora from '../classes/ContratoComercializadora';
import ContratoDistribuidora from '../classes/ContratoDistribuidora';

import DropboxManager from '../classes/DropboxManager';

@Component({
  selector: 'app-details-gas-natural',
  templateUrl: './details-gas-natural.component.html',
  styleUrls: ['./details-gas-natural.component.css']
})
export class DetailsGasNaturalComponent implements OnInit {

  instalacion: Instalacion = new Instalacion();

  id: number;
  tipo: number = 2; // Tipo = Gas natural = 2

  constructor(private router: Router,
    private route: ActivatedRoute,
    private instServ: InstalacionesService,
    private poblServ: PoblacionesService,
    private contServ: ContratantesService,
    private estServ: EstadosService,
    private mercServ: MercadosService,
    private comServ: ContComsService,
    private distServ: ContDistsService) { }

  ngOnInit() {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    this.route.params.subscribe(params => {
      this.id = params.id;

      this.instServ.getInstalacion(this.id, this.tipo)
        .subscribe((instalacion: any) => {
          instalacion = instalacion[0];

          this.instalacion = new Instalacion(
            this.id,
            instalacion.EsBaja,
            this.tipo,
            instalacion.Direccion,            
            new Poblacion(null, ''),
            new Contratante(null, ''),
            instalacion.FechaInstalacion ? new Date(instalacion.FechaInstalacion).toLocaleDateString("es-ES", options) : null,
            instalacion.Agente,
            instalacion.Instaladores,
            instalacion.Presupuesto,
            instalacion.IRIS_Cobrado,
            instalacion.Observaciones,
            null, null, // IRC
            instalacion.IRIS_Nombre,
            instalacion.IRIS_Apellidos,
            instalacion.IRIS_Dni,
            instalacion.IRIS_Telefonos,
            instalacion.IRIS_AparatoExistente,
            instalacion.IRIS_AparatosVendidos,
            new Estado(null, ''),
            instalacion.IRISC_FechaContrato ? new Date(instalacion.IRISC_FechaContrato).toLocaleDateString("es-ES", options) : null,
            instalacion.IRISC_Observaciones,
            new Mercado(null, ''),
            instalacion.IRISGN_FechaPuestaGas ? new Date(instalacion.IRISGN_FechaPuestaGas).toLocaleDateString("es-ES", options) : null,
            instalacion.IRISGN_TiposAparato,
            instalacion.IRISGN_Piezas,
            instalacion.IRISGN_TiroForzado,
            instalacion.IRISGN_SoporteExterior,
            instalacion.IRISGN_Idi,
            instalacion.IRISGN_Facturado1,
            instalacion.IRISGN_Facturado2,
            null, // ContCom
            null, // ContDist
            instalacion.IRISGN_ContObservaciones);

          if (instalacion.Id_Poblacion)
            this.poblServ.getPoblacion(instalacion.Id_Poblacion).subscribe((pobl: any) => {
              pobl = pobl[0];
              this.instalacion.poblacion = new Poblacion(pobl.Id, pobl.Nombre);
            });

          if (instalacion.Id_Contratante)
            this.contServ.getContratante(instalacion.Id_Contratante).subscribe((cont: any) => {
              cont = cont[0];
              this.instalacion.contratante = new Contratante(cont.Id, cont.Nombre);
            });

          if (instalacion.IRISC_Id_Estado)
            this.estServ.getEstado(instalacion.IRISC_Id_Estado).subscribe((est: any) => {
              est = est[0];
              this.instalacion.irisc_estado = new Estado(est.Id, est.Nombre);
            });

          if (instalacion.IRISGN_Id_Mercado)
            this.mercServ.getMercado(instalacion.IRISGN_Id_Mercado).subscribe((merc: any) => {
              merc = merc[0];
              this.instalacion.irisgn_mercado = new Mercado(merc.Id, merc.Nombre);
            });

          if (instalacion.IRISGN_Id_ContCom)
            this.comServ.getContCom(instalacion.IRISGN_Id_ContCom).subscribe((com: any) => {
              com = com[0];
              this.instalacion.irisgn_contCom = new ContratoComercializadora(
                com.Id,
                com.Subvencion,
                com.NumeroSolicitud,
                com.Facturado,
                com.NumeroCertificacion,
                com.FechaGrabCont ? new Date(com.FechaGrabCont).toLocaleDateString("es-ES", options) : null,);
            });

          if (instalacion.IRISGN_Id_ContDist)
            this.distServ.getContDist(instalacion.IRISGN_Id_ContDist).subscribe((dist: any) => {
              dist = dist[0];
              dist.FechaGrabCont;
              this.instalacion.irisgn_contDist = new ContratoDistribuidora(
                dist.Id,
                dist.Campana,
                dist.FechaGrabCont ? new Date(dist.FechaGrabCont).toLocaleDateString("es-ES", options) : null,
                dist.FechaGrabCert ? new Date(dist.FechaGrabCert).toLocaleDateString("es-ES", options) : null,
                dist.Cups,
                dist.Regularizacion,
                dist.NumCertRegul,
                dist.Subvencion,
                dist.SubvFacturada,
                dist.CobradoSubv,
                dist.NumCertSubv,
                dist.Colaboracion,
                dist.ColabFacturada,
                dist.CobradoColab,
                dist.NumCertColab,
                dist.NumSolicitudZeus,
                dist.SubvencionIdi,
                dist.IdiFacturado,
                dist.Tipo);
            });
        });
    });
  }

  openFolder() {
    DropboxManager.openFolder("GasNatural/" + this.id);
  }
}
