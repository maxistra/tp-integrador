import { Component         } from '@angular/core';
import { IonicPage,
         NavController,
         NavParams,
         ViewController    } from 'ionic-angular';
import { AuthPoviderProvider } from '../../providers/auth-povider/auth-povider';

@IonicPage({
  name: 'InfoPelis'
})
@Component({
  selector: 'page-infopelis',
  templateUrl: 'infopelis.html',
})
export class InfopelisPage {
  private infoPeliculasData: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              public peliculasProvider: AuthPoviderProvider,
  ) {
    this.infoPeliculasData = {};
  }

  ionViewWillEnter() {
    this.cargarInfoPelis();
    console.log('estoy en la pagina con la info de pelis', this.infoPeliculasData);
  }

  public cerrarModal(conExito: boolean): void{
    this.viewCtrl.dismiss(conExito);
  }
  public cargarInfoPelis():void{
    this.infoPeliculasData = this.peliculasProvider.getDatosInfo();
  }
}
