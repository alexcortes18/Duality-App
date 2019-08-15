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
    MesasCollectionref: AngularFirestore;

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

    //NO FUNCIONA AL 100
    getRestauranteDocID(selectedId: string): string {
        var restauranteDocID: string;
        this.db.collection('availableRestaurantes').snapshotChanges().subscribe((RestauranteSnapshot) => {
            RestauranteSnapshot.forEach((RestauranteSnapshotData: any) => {
                if (selectedId == RestauranteSnapshotData.payload.doc.data().id) {
                    restauranteDocID = RestauranteSnapshotData.payload.doc.id;
                }
            })
        });
        return restauranteDocID;
    }

    // public giveAvailableMesas(selectedId){
    //     var restaurantesID: string;
    //     restaurantesID = this.getRestauranteDocID(selectedId);
    //     debugger;
    //     return this.db.collection('availableRestaurantes')
    //     .doc(restaurantesID)
    //     .collection('availableMesas', ref => ref.orderBy("id")).snapshotChanges();
    // }

    public giveAvailableMesas(selectedId) {
        var restaurantesID: string;
        switch (selectedId) {
            case 1:
                restaurantesID = '8OGT3c6lahdNPOXltDmw';
            case 2:
                restaurantesID = 'CtbrQzrbH5Rlrn9ukugv';
            default:
                '';
        }

        return this.db.collection('availableRestaurantes')
            .doc(restaurantesID)
            .collection('availableMesas', ref => ref.orderBy("id")).snapshotChanges();
    }

    private addMesasToRestaurante(Mesas: Mesas) {
        this.db.collection("availableMesas").add(Mesas);
    }

}
