import { Component } from '@angular/core';
import { IonicPage, 
        NavController, 
        Nav,
        NavParams, 
        ToastController, 
        LoadingController, 
        Loading } from 'ionic-angular';
import { AuthPoviderProvider } from '../../providers/auth-povider/auth-povider';

@IonicPage({
  name:'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public datosLogin: any;

  private instanciaLoader: Loading;
  private localStorage: Storage;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toast: ToastController,
    private auth: AuthPoviderProvider,
    private loadingCtrl: LoadingController,
    private nav : Nav
  ) {
      this.datosLogin = {
        username : '',
        password : '',
      };

      this.localStorage = window.localStorage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(): void{
     let mensaje: string
    if (this.datosLogin.username.length < 3)
    {
      mensaje ='El nombre de usuario debe ser mayor a 3 caracteres';
      this.mostrarToast(2000, mensaje, 'bottom')
      return
    }
    if (this.datosLogin.password.length < 3)
    {
      mensaje = 'La clave de usuario debe ser mayor a 3 caracteres',
      this.mostrarToast(2000, mensaje, 'bottom')
      return
    }

    console.log(
      "Login consloe", this.datosLogin
    )
    this.mostrarLoading('Iniciando sesión');
    this.auth.loginObservable(this.datosLogin.username, this.datosLogin.password)
      .subscribe(
        success => this.successLogin(success),
        error => this.errorLogin(error)
      );
  }

  private successLogin(success): void {
    this.ocultarLoading();
    this.localStorage.setItem('autentico','Sesion iniciada');
    this.navCtrl.setRoot('home');
    console.log('successLogin', success);
  }

  private errorLogin(error): void {
    this.ocultarLoading();
    this.mostrarToast(1500, error, 'bottom');
    console.log('errorLogin', error);
  }

  private mostrarLoading(mensaje: string): void {
    this.instanciaLoader = this.loadingCtrl.create({
      content: mensaje
    });
    this.instanciaLoader.present();
  }

  private ocultarLoading(): void {
    if(this.instanciaLoader) {
      this.instanciaLoader.dismiss();
      this.instanciaLoader = null;
    }
  }

  private mostrarToast(duracion: number, mensaje: string, posicion: string): void {
    let modalError = this.toast.create({
      duration: duracion,
      message: mensaje,
      position: posicion
    });

    modalError.present();
  }

  contrasena(){
    this.auth.recuperarContrasena(true)
  }

  Registarse(){

    this.nav.push('perfil', {registro: true});
  }

}