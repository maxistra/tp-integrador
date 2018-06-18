
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable'
import { HttpClient } from '@angular/common/http';
import { ToastController,
         ModalController,
         ModalOptions, } from 'ionic-angular';
import * as moment from 'moment';


@Injectable()
export class AuthPoviderProvider {
  private listadoPeliculas:any =[];
  private datosInfo: any = {};
  
  constructor(public http: HttpClient,  
    private toastctrl: ToastController,
    private modalCtrl: ModalController,) {

    console.log('Hello AuthPoviderProvider Provider');
  }

  public loginObservable(username: string, password: string): Observable<any> {
    let observable = new Observable((observer) => {

      // si no existe username o password.
      if (!username || !password) {
          observer.error('Faltan datos');
      }
      else if (username == 'MaxMaxi' && password === 'AprobamePorfis') {
        setTimeout(() => {
          observer.next(true);
          observer.complete();
        }, 750);
      }
      else {
        setTimeout(() => {
          observer.error('El nombre de usuario o la contraseña son incorrectos');
        }, 750);
      }
    });

    return observable;
  }

  public buscarPelicula(nombre: string): any {
    let url='http://www.omdbapi.com/?apikey=cf36c0f0&s='+nombre;
    this.http.get(url).subscribe(
      (dato) =>{
        this.setListadoPeliculas(dato['Search']);
        console.log('detalle conseguido', dato['Search']);
      },
      (error)=>{
        console.error('error en la operacion', error);
      });
    return this.http.get(url)
  }

  public setListadoPeliculas(listado:any):void{
    this.listadoPeliculas=listado;
  }
  public getListadoPeliculas(): any {
    return this.listadoPeliculas;
  }

  public setDatosInfo (titulo: String, Poster: any):void{
    this.datosInfo={titulo,Poster};
  }

  public getDatosInfo():any{
    return this.datosInfo;
  }

  public verInfoPeliculas(titulo: String, poster: any) :any{
    this.setDatosInfo(titulo,poster);
    let modal = this.modalCtrl.create('InfoPelis');
    modal.present();
    modal.onDidDismiss((ventanaCerrada:boolean)=>{
      if (ventanaCerrada === true){
        this.mostrarMensaje(2000,'Excelente Elecciión!!!  ˘⌣˘ ',"button");
      }
      else{
        this.mostrarMensaje(2000,'Oooohh!!!, pero a mi me gustaba ಥ_ಥ ',"button");
      }
    });
  }

  private mostrarMensaje(duracion: number, mensaje: string, posicion: string): void{
    let toas = this.toastctrl.create({
      duration: duracion,
      message: mensaje,
      position: posicion
    });
    toas.present();
  }
public ValidarFechas(fecha: any):boolean{
  let esono: boolean;
  let dias = new Date();
  let dMy = moment(dias);
  let fech = moment(fecha);
  let diff = dMy.diff(fech,'year')
  if (diff < 18){
    this.mostrarMensaje(3000,'No eres mayor de edad  ಥ_ಥ',"button")
    console.log("si es menor")
    esono = false
  } else {
    esono = true
  }
  console.log("Fecha ingresada menor", diff)
  return esono
}

public recuperarContrasena(valor : any) :void{
  let dato = {
    parametro:valor
  }
  let modalOpciones: ModalOptions = {
    enableBackdropDismiss : false

  }
  let modal = this.modalCtrl.create('contrasena',dato,modalOpciones);
  modal.present();
  modal.onDidDismiss((ventanaCerrada:boolean)=>{
    if (ventanaCerrada === true){
      this.mostrarMensaje(3000,'Hemos enviado un vinculo, recise su correo',"button");
    }
  });
}

public buscarUsuario(usuario: string): boolean{
  let existeUser : boolean = false;
  let bUsuario:any =JSON.parse(localStorage.getItem('perfil'));
  console.log("recupero perfil", bUsuario, bUsuario[0].user, usuario)
  if(bUsuario && bUsuario[0].user === usuario){
    existeUser=true;
  }
  return existeUser;
}

public generaContraseña(contrasena:string){
  let bUsuario:any =JSON.parse(localStorage.getItem('perfil'));
  bUsuario[0].contrasena=contrasena;
  localStorage.setItem("perfil",JSON.stringify(bUsuario))
  console.log("agrego contraseña:", bUsuario)
}

  
}
