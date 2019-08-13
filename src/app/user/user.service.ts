import { Subject } from 'rxjs/Subject';
import { Restaurante } from './restaurante.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class UserService {
    restaurantes = new Subject<Restaurante[]>();
    private availableRestaurantes: Restaurante[] = [];
    // private runningExercise: Exercise;
    // finishedExercisesChanged = new Subject<Exercise[]>();

    constructor(private db: AngularFirestore) { }

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

    private addDataToDatabase(Restaurantes: Restaurante) {
        this.db.collection('availableRestaurantes').add(Restaurantes);
    }

}
