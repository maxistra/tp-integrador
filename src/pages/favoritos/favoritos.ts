import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthPoviderProvider } from '../../providers/auth-povider/auth-povider';


@IonicPage({
  name:'favoritos'
})
@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {
  private localStorage: Storage = window.localStorage;
  private favoritos;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private Peliculas: AuthPoviderProvider,) {
  }

  ionViewDidLoad() {
    this.favoritos = JSON.parse(this.localStorage.getItem('MisPeliculas'));
    if(!this.favoritos){
      this.favoritos=[];
    }
    console.log('Cargando favoritos', this.favoritos);
  }

  public info(Title,Poster):void{
    this.Peliculas.verInfoPeliculas(Title,Poster);
  }

}
