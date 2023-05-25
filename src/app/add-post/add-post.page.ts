import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Post } from '../models/post.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {

  post = {} as Post;

  constructor(
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {}

  async createPost(post: Post){
    if(this.formValidation()){
      let loader = await this.loadingCtrl.create({
        message: "Un momento"
      });
      await loader.present();

      try{
        await this.firestore.collection("posts").add(post);
      } catch (error:any){
        error.message = "Error en el post";
        let errorMessage = error.message || error.getLocalizedMessage();

        this.showToast(errorMessage);
      }

      await loader.dismiss();

      this.navCtrl.navigateRoot("home");
    }
  }

  formValidation(){
    if (!this.post.title){
      this.showToast("Ingrese el título");
      return false;
    }
    if (!this.post.title){
      this.showToast("Ingrese la descripción");
      return false;
    }
    return true
  }

  showToast(message:string){
    this.toastCtrl.create({
      message: message,
      duration: 4000
    }).then(toastData => toastData.present())
  }
}
