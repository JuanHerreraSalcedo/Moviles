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
  posts: any[] | undefined;
  selectedCarril: string | undefined;
  alumnoRecogido: boolean = false;
  segmentValue: string = 'recoger';


  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth
  ) {}  

  ionViewWillEnter() {
    this.getPosts();
  }

  async getPosts() {
    const loader = await this.loadingCtrl.create({
      message: 'Un momento',
    });

    await loader.present();

    try {
      this.firestore
        .collection('posts')
        .snapshotChanges()
        .subscribe((data: any[]) => {
          this.posts = data.map((post: any) => {
            const id = post.payload.doc.id;
            const { title, details } = post.payload.doc.data();
            return { id, title, details };
          });
        });

      await loader.dismiss();
    } catch (error: any) {
      error.message = 'Error al obtener los posts';
      const errorMessage = error.message || error.getLocalizedMessage();
      this.showToast(errorMessage);
    }
  }

  async deletePost(id: string) {
    const loader = await this.loadingCtrl.create({
      message: 'Un momento',
    });
    await loader.present();

    try {
      await this.firestore.doc('posts/' + id).delete();
      await loader.dismiss();
      this.showToast('Publicación eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar publicación: ', error);
      await loader.dismiss();
      this.showToast('Error al eliminar publicación');
    }
  }

  async llegue(id:string | undefined) {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        const userId = user.uid;
        
        this.firestore
          .collection('posts')
          .doc(id)
          .update({
            recogida: 'Y',
            carril: this.selectedCarril,
          })
          .then(() => {
            this.alumnoRecogido = true;
            this.showToast('El acudiente ya llego al ' + this.selectedCarril);
          })
          .catch((error) => {
            console.log('Error:', error);
            this.showToast('Error al recoger al alumno');
          });
      }
    });
  }
  async listo(id:string | undefined) {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        const userId = user.uid;
        
        this.firestore
          .collection('posts')
          .doc(id)
          .update({
            recogida: 'N',
            carril: '',
          })
          .then(() => {
            this.alumnoRecogido = true;
            this.showToast('Alumno recogido exitosamente');
          })
          .catch((error) => {
            console.log('Error:', error);
            this.showToast('Error al recoger al alumno');
          });
      }
    });
  }
  

  // async listo() {
  //   this.afAuth.user.subscribe((user) => {
  //     if (user) {
  //       const userId = user.uid;
        
  //       this.firestore
  //         .collection('alumnos')
  //         .doc(userId)
  //         .update({
  //           recogida: 'N',
  //           carril: '',
  //         })
  //         .then(() => {
  //           this.alumnoRecogido = false;
  //           this.showToast('Alumno marcado como no recogido');
  //         })
  //         .catch((error) => {
  //           console.log('Error:', error);
  //           this.showToast('Error al marcar al alumno como no recogido');
  //         });
  //     }
  //   });
  // }
  
        
        showToast(message: string) {
        this.toastCtrl
        .create({
        message: message,
        duration: 4000,
        })
        .then((toastData) => toastData.present());
        }
        
        signOut() {
          this.afAuth.signOut()
            .then(() => {
              this.navCtrl.navigateRoot('/login');
            })
            .catch((error) => {
              console.log(error);
            });
        }
        
        }
