import { Subject } from 'rxjs/Subject';
import { Restaurante } from './restaurante.model';
import { Mesas } from './mesas.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

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

    getRestaurante(selectedId) {
        return this.db.collection('availableRestaurantes', ref => ref.where("id", "==", selectedId))
            .snapshotChanges();
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
        var idGivenbyUser: any;
        this.getRestaurante(selectedId).subscribe((RestauranteSnapshot) => {
            RestauranteSnapshot.forEach((RestauranteSnapshotData: any) => {
                idGivenbyUser = RestauranteSnapshotData.payload.doc.id;
                console.log(idGivenbyUser);
                // })
            });
        });
        idGivenbyUser;
        // debugger;
        if (selectedId == 1) { idGivenbyUser = '8OGT3c6lahdNPOXltDmw'; }
        else if (selectedId == 2) { idGivenbyUser = 'VzLv85jNhs4VqUdRiWtL'; }
        else if (selectedId == 3) { idGivenbyUser = 'isirvTtN5SYAnliY4VUA'; }
        else if (selectedId == 4) { idGivenbyUser = 'ScrPZ98WTDv8OLOe7Bnf'; }
        else if (selectedId == 5) { idGivenbyUser = 'CtbrQzrbH5Rlrn9ukugv'; }
        else if (selectedId == 6) { idGivenbyUser = 'nUGEYY3FCs8Hc9oFn0HG'; }

        return this.db.collection('availableRestaurantes')
            .doc(idGivenbyUser)
            .collection('availableMesas', ref => ref.orderBy("id")).snapshotChanges();
    }

    private addMesasToRestaurante(Mesas: Mesas) {
        this.db.collection("availableMesas").add(Mesas);
    }
}
