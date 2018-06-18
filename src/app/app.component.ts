import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// ionic-native
import { Camera, CameraOptions } from '@ionic-native/camera';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private localStorage: Storage;
  public fotoPerfil: any;
  rootPage: any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private camera: Camera,
  ) {
    this.localStorage = window.localStorage;
    this.pages;
    
    let isLogged = this.localStorage.getItem('autentico');
    if (isLogged) {
      this.rootPage = 'home';
    }
    else {
      this.rootPage = 'login';
    }
    this.pages = [
      { title: 'Inicio', component: 'home', icon: 'home' },
      { title: 'Favoritos', component: 'favoritos', icon: 'star' },
      { title: 'Galeria', component: 'galeria',  icon: 'images' },
      { title: 'Perfil', component: 'perfil', icon: 'contact' },
      //{ title: 'Configurar', component: 'config', icon: 'construct' },
    ];
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOut(){
    this.localStorage.removeItem('autentico');
    this.nav.setRoot('login');
  }
  abrirGaleria(): void {
    let options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.fotoPerfil = base64Image;
    }, (err) => {
      // Handle error
    });
  }
}
