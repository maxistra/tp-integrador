import { Component } from '@angular/core';
import { IonicPage, 
         NavController, 
         NavParams,
         ViewController, } from 'ionic-angular';
import { AuthPoviderProvider } from '../../providers/auth-povider/auth-povider';



@IonicPage({
  name:'contrasena'
})
@Component({
  selector: 'page-contraseña',
  templateUrl: 'contraseña.html',
})
export class ContraseñaPage {
  private user        : string
  private contrasena  : string 
  private rContrasena : string
  public recuperoContrasena:boolean
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController,
              public auth: AuthPoviderProvider,) {
                this.user          = '';
                this.contrasena    = ''; 
                this.rContrasena   = '';
                this.recuperoContrasena = navParams.data.parametro
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContraseñaPage');
  }
  public cerrarModal(conExito: boolean): void{
    this.viewCtrl.dismiss(conExito);
  }
  enviarContrasena(){
    console.log("usuario a buscar: ", this.user)
    if (this.auth.buscarUsuario(this.user)){
      this.Salir(true);
      return
    }
    alert('lo sentimos, pero no encontramos tu usuario en la base');

  }

  generarContrasena(){
    if(this.rContrasena === this.contrasena){
      this.auth.generaContraseña(this.contrasena);
      this.Salir(true);
      return
    }
    alert('las contraseñas no coinciden');
  }

  Salir(valor:boolean){
    this.cerrarModal(valor);
  }
}
