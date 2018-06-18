import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContraseñaPage } from './contraseña';

@NgModule({
  declarations: [
    ContraseñaPage,
  ],
  imports: [
    IonicPageModule.forChild(ContraseñaPage),
  ],
})
export class ContraseñaPageModule {}
