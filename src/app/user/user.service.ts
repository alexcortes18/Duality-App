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