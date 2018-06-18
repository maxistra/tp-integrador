import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthPoviderProvider } from '../../providers/auth-povider/auth-povider';
import { empty } from 'rxjs/Observer';

// ionic-native
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage({
  name: 'perfil'
})
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  public paraEditar: boolean;
  public perfil : any;
  private storage: Storage;
  private imagen:any;
  private user:string;
  private nombre: string;
  private apellido: string;
  private correo: string;
  private estaActivo: boolean;
  private registro: boolean;
  private cumpleFeliz: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private validadores: AuthPoviderProvider,
    private camera: Camera,
  ) {
      this.paraEditar = false;
      this.storage = window.localStorage;
      this.imagen = "../../assets/imgs/logo.png";
      this.user = "Su Nick";
      this.nombre ="Su Nombre de pila aquí"
      this.apellido ="Su Apellido va aquí"
      this.correo ="Su_Correo@Su_servidor.ext"
      this.estaActivo = true;
      this.cumpleFeliz;
      this.registro = false
      if (navParams.get('userParams') !== empty){
        this.registro = navParams.get('registro');
      }
      console.log("vel el campo registro:", this.registro)

  }

  ionViewDidLoad() {
    this.perfil = JSON.parse(this.storage.getItem("perfil"))
    if (!this.perfil){
     this.cargarPerfil();
    }else{
      this.actualizarVariables();
    }
    console.log('pagina Perfil', this.perfil);
  }

  Editar():void{
    this.paraEditar = true;
  }

  Guardar():void{
    this.paraEditar = false;
    this.cargarPerfil();
    this.storage.setItem("perfil",JSON.stringify(this.perfil))
    console.log("cambios en el Perfil", this.perfil)
  }

  sacarFoto():void{
      let options: CameraOptions = {
        quality: 100,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      }
  
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.imagen == base64Image;
      }, (err) => {
        // Handle error
      });
    this.cargarPerfil();
    return
  }
  cargarPerfil():void{
    this.perfil=[{
      imagen     : this.imagen, 
      user       : this.user, 
      nombre     : this.nombre,
      apellido   : this.apellido,
      correo     : this.correo,
      estaActivo : this.estaActivo,
      cumpleFeliz: this.cumpleFeliz
    }]
   
  }
  actualizarVariables(){
    this.imagen       = this.perfil[0].imagen;
    this.user         = this.perfil[0].user;
    this.nombre       = this.perfil[0].nombre;
    this.apellido     = this.perfil[0].apellido;
    this.correo       = this.perfil[0].correo;
    this.estaActivo   = this.perfil[0].estaActivo;
    this.cumpleFeliz  = this.perfil[0].cumpleFeliz;
    
  }
  verFechas():void{
    
    let mayor = this.validadores.ValidarFechas(this.cumpleFeliz);
    if (mayor){
      this.Guardar();
    }
  
  }
  Contrasena(){
    this.validadores.recuperarContrasena(false)
  }
}