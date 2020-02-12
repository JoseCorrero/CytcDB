import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainPageComponent } from './main-page/main-page.component';

import { FormInstalacionComponent } from './form-instalacion/form-instalacion.component';
import { FormIrcComponent } from './form-irc/form-irc.component';
import { FormIrisComponent } from './form-iris/form-iris.component';
import { FormCompletaComponent } from './form-completa/form-completa.component';
import { FormGasNaturalComponent } from './form-gas-natural/form-gas-natural.component';
import { FormContComComponent } from './form-cont-com/form-cont-com.component';
import { FormContDistComponent } from './form-cont-dist/form-cont-dist.component';
import { FormMantenimientoComponent } from './form-mantenimiento/form-mantenimiento.component';
import { FormButanoComponent } from './form-butano/form-butano.component';

import { TableInstComponent } from './table-inst/table-inst.component';
import { TableMantenimientoComponent } from './table-mantenimiento/table-mantenimiento.component';

import { CrearIrcComponent } from './crear-irc/crear-irc.component';
import { CrearGasNaturalComponent } from './crear-gas-natural/crear-gas-natural.component';
import { CrearButanoComponent } from './crear-butano/crear-butano.component';
import { CrearSolarComponent } from './crear-solar/crear-solar.component';
import { CrearOtrosComponent } from './crear-otros/crear-otros.component';

import { GetInstalacionesComponent } from './get-instalaciones/get-instalaciones.component';
import { GetMantenimientoComponent } from './get-mantenimiento/get-mantenimiento.component';

import { EditIrcComponent } from './edit-irc/edit-irc.component';
import { EditGasNaturalComponent } from './edit-gas-natural/edit-gas-natural.component';
import { EditButanoComponent } from './edit-butano/edit-butano.component';
import { EditSolarComponent } from './edit-solar/edit-solar.component';
import { EditOtrosComponent } from './edit-otros/edit-otros.component';

import { DetailsIrcComponent } from './details-irc/details-irc.component';
import { DetailsGasNaturalComponent } from './details-gas-natural/details-gas-natural.component';
import { DetailsButanoComponent } from './details-butano/details-butano.component';
import { DetailsSolarComponent } from './details-solar/details-solar.component';
import { DetailsOtrosComponent } from './details-otros/details-otros.component';

import { CreatePoblacionComponent } from './create-poblacion/create-poblacion.component';

import { InstalacionesService } from './services/instalaciones.service';
import { MantenimientosService } from './services/mantenimientos.service';
import { ProvinciasService } from './services/provincias.service';
import { PoblacionesService } from './services/poblaciones.service';
import { ContratantesService } from './services/contratantes.service';
import { EstadosService } from './services/estados.service';
import { MercadosService } from './services/mercados.service';
import { ContComsService } from './services/cont-coms.service';
import { ContDistsService } from './services/cont-dists.service';
import { TiposTrabajoService } from './services/tipos-trabajo.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    FormInstalacionComponent,
    FormIrcComponent,
    FormIrisComponent,
    FormCompletaComponent,
    FormGasNaturalComponent,
    FormContComComponent,
    FormContDistComponent,
    FormMantenimientoComponent,
    FormButanoComponent,
    TableInstComponent,
    TableMantenimientoComponent,
    CrearIrcComponent,
    CrearGasNaturalComponent,
    CrearButanoComponent,
    CrearSolarComponent,
    CrearOtrosComponent,
    GetInstalacionesComponent,
    GetMantenimientoComponent,
    EditIrcComponent,
    EditGasNaturalComponent,
    EditButanoComponent,
    EditSolarComponent,
    EditOtrosComponent,
    DetailsIrcComponent,
    DetailsGasNaturalComponent,
    DetailsButanoComponent,
    DetailsSolarComponent,
    DetailsOtrosComponent,
    CreatePoblacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SlimLoadingBarModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [
    InstalacionesService,
    MantenimientosService,
    ProvinciasService,
    PoblacionesService,
    ContratantesService,
    EstadosService,
    MercadosService,
    ContComsService,
    ContDistsService,
    TiposTrabajoService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ],
  entryComponents: [
    CreatePoblacionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
