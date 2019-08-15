import { Subject } from 'rxjs/Subject';
import { Restaurante } from './restaurante.model';
import { Mesas } from './mesas.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Injectable()
export class UserService {
    restaurantes = new Subject<Restaurante[]>();
    private availableRestaurantes: Restaurante[] = [];
    // private runningExercise: Exercise;
    // finishedExercisesChanged = new Subject<Exercise[]>();
    MesasCollectionref : AngularFirestore;

    constructor(private db: AngularFirestore) {
     }

    fetchavailableRestaurantes() {
        this.db.collection('availableRestaurantes').
            valueChanges().
            subscribe((Restaurantes: Restaurante[]) => {
                this.restaurantes.next(Restaurantes);
            });
    }

    public getRestaurantes() {
        return this.db.collection('availableRestaurantes').snapshotChanges();
    }

    getRestauranteDocID (selectedId: string) : string {
        var restauranteDocID: string;
        this.db.collection('availableRestaurantes').snapshotChanges().subscribe((RestauranteSnapshot) => {
            RestauranteSnapshot.forEach((RestauranteSnapshotData: any) => {
              if (selectedId == RestauranteSnapshotData.payload.doc.data().id) {
                  restauranteDocID = RestauranteSnapshotData.payload.doc.id;
                //   debugger;
              }
            })
          });
        return restauranteDocID;
    }

    public giveAvailableMesas(){
        return this.db.collection('availableRestaurantes')
        .doc('8OGT3c6lahdNPOXltDmw')
        .collection('availableMesas', ref => ref.orderBy("id")).snapshotChanges();
    }

    private addMesasToRestaurante(Mesas: Mesas) {
        this.db.collection("availableMesas").add(Mesas);
    }

}
