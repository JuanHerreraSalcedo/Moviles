import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  user = {} as User;
  constructor(private toastCtrl: ToastController, 
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
    ) { }

  ngOnInit() {}

  async register(user: User) {
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Espera un momento"
      })
      await loader.present();

      try{
        await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(data => {
          console.log(data);
          this.navCtrl.navigateRoot("home")
        })
      }catch(error:any){
        error.message = "Error al crear un usuario";
        let errorMessage = error.message || error.getLocalizedMessage();

        this.showToast(errorMessage)
      }

      await loader.dismiss();

    }
  }
  formValidation(){
    if(!this.user.email){
      this.showToast("Ingrese el correo");
      return false;
    }
    if(!this.user.password){
      this.showToast("Ingrese la contraseña");
      return false;
    }

    return true;
  }

  showToast(message:string){
    this.toastCtrl.create({
      message:message,
      duration: 4000
    }).then(toastData => toastData.present());
  }
}
