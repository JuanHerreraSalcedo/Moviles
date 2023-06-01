import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-carril',
  templateUrl: './carril.page.html',
  styleUrls: ['./carril.page.scss'],
})
export class CarrilPage implements OnInit {

  alumnosCarril1: any[] = [];
  alumnosCarril2: any[] = [];
  alumnosCarril3: any[] = [];

  coloresCarriles = {
    carril1: '#98D8AA',
    carril2: '#F6FA70',
    carril3: '#FF6D60'
  };
  
  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
  }
  
  obtenerAlumnosCarril(carril: string, arregloAlumnos: any[]) {
    this.firestore
      .collection('posts', (ref) => ref.where('carril', '==', carril).where('recogida', '==', 'Y'))
      .valueChanges()
      .subscribe((posts) => {
        arregloAlumnos.splice(0, arregloAlumnos.length, ...posts);
        console.log(arregloAlumnos, 'esto esta en carril');
      });
  }
  
  ionViewDidEnter() {
    this.obtenerAlumnosCarril('carril1', this.alumnosCarril1);
    this.obtenerAlumnosCarril('carril2', this.alumnosCarril2);
    this.obtenerAlumnosCarril('carril3', this.alumnosCarril3);
  }
}

