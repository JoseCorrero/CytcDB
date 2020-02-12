import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';

import { CrearIrcComponent } from './crear-irc/crear-irc.component';
import { CrearGasNaturalComponent } from './crear-gas-natural/crear-gas-natural.component';
import { CrearButanoComponent } from './crear-butano/crear-butano.component';
import { CrearSolarComponent } from './crear-solar/crear-solar.component';
import { CrearOtrosComponent } from './crear-otros/crear-otros.component';

import { EditIrcComponent } from './edit-irc/edit-irc.component';
import { EditGasNaturalComponent } from './edit-gas-natural/edit-gas-natural.component';
import { EditButanoComponent } from './edit-butano/edit-butano.component';
import { EditSolarComponent } from './edit-solar/edit-solar.component';
import { EditOtrosComponent } from './edit-otros/edit-otros.component';

import { GetInstalacionesComponent } from './get-instalaciones/get-instalaciones.component';
import { GetMantenimientoComponent } from './get-mantenimiento/get-mantenimiento.component';

import { DetailsIrcComponent } from './details-irc/details-irc.component';
import { DetailsGasNaturalComponent } from './details-gas-natural/details-gas-natural.component';
import { DetailsButanoComponent } from './details-butano/details-butano.component';
import { DetailsSolarComponent } from './details-solar/details-solar.component';
import { DetailsOtrosComponent } from './details-otros/details-otros.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'nueva-irc',
    component: CrearIrcComponent
  },
  {
    path: 'nueva-gasnatural',
    component: CrearGasNaturalComponent
  },
  {
    path: 'nueva-butano',
    component: CrearButanoComponent
  },
  {
    path: 'nueva-solar',
    component: CrearSolarComponent
  },
  {
    path: 'nueva-otros',
    component: CrearOtrosComponent
  },
  {
    path: 'editar-irc/:id',
    component: EditIrcComponent
  },
  {
    path: 'editar-gasnatural/:id',
    component: EditGasNaturalComponent
  },
  {
    path: 'editar-butano/:id',
    component: EditButanoComponent
  },
  {
    path: 'editar-solar/:id',
    component: EditSolarComponent
  },
  {
    path: 'editar-otros/:id',
    component: EditOtrosComponent
  },
  {
    path: 'instalaciones',
    component: GetInstalacionesComponent
  },
  {
    path: 'detalles-irc/:id',
    component: DetailsIrcComponent
  },
  {
    path: 'detalles-gasnatural/:id',
    component: DetailsGasNaturalComponent
  },
  {
    path: 'detalles-butano/:id',
    component: DetailsButanoComponent
  },
  {
    path: 'detalles-solar/:id',
    component: DetailsSolarComponent
  },
  {
    path: 'detalles-otros/:id',
    component: DetailsOtrosComponent
  },
  {
    path: 'mantenimiento',
    component: GetMantenimientoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
