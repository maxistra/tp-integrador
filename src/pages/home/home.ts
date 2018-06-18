import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams, 
  LoadingController, 
  ToastController, } from 'ionic-angular';
import { AuthPoviderProvider } from '../../providers/auth-povider/auth-povider';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage(
  {
    name:'home'
  }
)
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public name: string = '';
  public listaPeliculas = [];
  public favoritos = [];
  private localStorage: Storage = window.localStorage;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private Peliculas: AuthPoviderProvider,
    private toastctrl: ToastController,
    public loadingCtrlr: LoadingController,
    private socialSharing: SocialSharing,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  public buscarPelicula(): void{
    let loading = this.loadingCtrlr.create({content: 'Buscando Pelicula'});
    loading.present();
    this.Peliculas.buscarPelicula(this.name).subscribe(
      (success) =>{this.successBuscarPelicula(success, loading)},
      (error) => {this.errorBuscarPelicula(error, loading)})
  }

  private successBuscarPelicula(Resultado, loading):void{
    loading.dismiss();
    console.log('successBuscarPelicula', Resultado);
     this.irListadoPeliculas();
  }

  private errorBuscarPelicula(error, loading): void{
    loading.dismiss();
    this.mostrarMensaje('Error al consultar la informacion');
    console.log('errorBuscarPelicula',error);
  }

  public irListadoPeliculas():void {
 
    this.listaPeliculas = this.Peliculas.getListadoPeliculas();

}


public info(Title,Poster):void{
  this.Peliculas.verInfoPeliculas(Title,Poster);
}

public anadeFavoritos(Title:any,Poster:any,Year:any,Type:any,imdbID:any):void{
  this.favoritos[this.favoritos.length]={Title,Poster,Year,imdbID}
  console.log("favoritos", this.favoritos)
  this.localStorage.setItem("MisPeliculas",JSON.stringify(this.favoritos))

}

public compartir(Pelicula):void{
  this.socialSharing.share(Pelicula, null, null, null);
//  let url = 'https://imdb.com/title/' + Pelicula;
//    window.open(url, '_system');
  console.log("comparti el IMD: ", Pelicula);
}

private mostrarMensaje(mensaje: string): void{
  let toas = this.toastctrl.create({
    message: mensaje,
    duration: 2000,
    position: 'button'
  });
  toas.present();
}

}
