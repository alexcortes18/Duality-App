import { Subject } from 'rxjs/Subject';
import { Restaurante } from './restaurante.model';
import { Mesas } from './mesas.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';

@Injectable()
export class UserService {
    restaurantes = new Subject<Restaurante[]>();
    availableMesas: any;
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

    // getRestauranteDocID(selectedId: string){
    //     this.db.collection('availableRestaurantes').snapshotChanges().subscribe((RestauranteSnapshot) => {
    //         RestauranteSnapshot.forEach((RestauranteSnapshotData: any) => {
    //             if (selectedId == RestauranteSnapshotData.payload.doc.data().id) {
    //                 this.selectedRestaurante = RestauranteSnapshotData.payload.doc.id;
    //                 this.availableMesas = this.giveAvailableMesas();
    //             }
    //         });
    //     });
    // }

    getRestaurante(selectedId) {
        return this.db.collection('availableRestaurantes', ref => ref.where("id", "==", selectedId))
            .snapshotChanges();
    }

    public giveAvailableMesas(selectedRestaurante: any) {
        return this.db.collection('availableRestaurantes')
            .doc(selectedRestaurante)
            .collection('availableMesas', ref => ref.orderBy("id")).snapshotChanges();
    }

    private addMesasToRestaurante(Mesas: Mesas) {
        this.db.collection("availableMesas").add(Mesas);
    }
}

// export class AppComponent2 {
//     items: Observable<Restaurante[]>;
//     name$: BehaviorSubject<string|null>;
//     id$: BehaviorSubject<number|null>;
    
//     constructor(afs: AngularFirestore) {
//       this.name$ = new BehaviorSubject(null);
//       this.id$ = new BehaviorSubject(null);
//       this.items = combineLatest(
//         this.name$,
//         this.id$
//       ).pipe(
//         switchMap(([name, id]) => 
//           afs.collection('availableRestaurantes', ref => {
//             let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
//             if (name) { query = query.where('name', '==', name) };
//             if (id) { query = query.where('id', '==', id) };
//             return query;
//           }).valueChanges()
//         )
//       );
//     }
//     filterBySize(name: string|null) {
//       this.name$.next(name); 
//     }
//     filterByColor(id: number|null) {
//       this.id$.next(id); 
//     }
//   }