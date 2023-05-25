import { Component } from '@angular/core';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  posts:any;

  constructor(
    private toastCtrl: ToastController, 
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth
  ) {}

  ionViewWillEnter(){
    this.getPosts();
  }

  async getPosts(){
    let loader = await this.loadingCtrl.create({
      message: "Un momento"
    });

    await loader.present();

    try{
      this.firestore.collection('posts')
      .snapshotChanges()
      .subscribe((data:any[]) =>{
        this.posts = data.map((error:any) =>{
          return{
            id: error.payload.doc.id,
            title: error.payload.doc.data()["title"],
            detaisl: error.payload.doc.data()["details"],

          }
        });
    });
    await loader.dismiss();
    } catch(error:any){
      error.message = "Mensaje de error en el home";
      let errorMessage = error.message || error.getLocalizedMessage();

      this.showToast(errorMessage);
    }
  }
  async deletePost(id: string) {
    let loader = await this.loadingCtrl.create({
      message: "Un momento"
    });
    await loader.present();
  
    try {
      await this.firestore.doc("posts/" + id).delete();
      await loader.dismiss();
      this.showToast("Publicación eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar publicación: ", error);
      await loader.dismiss();
      this.showToast("Error al eliminar publicación");
    }
  }
  async signOut() {
    try {
      await this.afAuth.signOut();
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      console.log(error);
    }
  }  

  showToast(message:string){
    this.toastCtrl.create({
      message: message,
      duration: 4000
    }).then(toastData => toastData.present())
  }
}
