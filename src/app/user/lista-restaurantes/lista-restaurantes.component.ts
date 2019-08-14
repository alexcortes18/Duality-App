import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Restaurante } from '../restaurante.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Mesas } from '../mesas.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lista-restaurantes',
  templateUrl: './lista-restaurantes.component.html',
  styleUrls: ['./lista-restaurantes.component.css']
})
export class ListaRestaurantesComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['name'];
  dataSource = new MatTableDataSource<Restaurante>();
  private restauranteChangedSubscription: Subscription;
  isRed = false;
  Mesas: any;
  private db: AngularFirestore;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.restauranteChangedSubscription = this.userService.restaurantes.subscribe((restaurantes: Restaurante[]) => {
      this.dataSource.data = restaurantes;
      // this.Restaurantes = restaurantes; //a ver si me agarra
      // console.log(this.Restaurantes);
    });
    this.userService.fetchavailableRestaurantes();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getMesas(elementId: string) {
    var idDocRestaurante: string;
    var idGivenbyUser: string;

    idGivenbyUser = this.userService.getRestauranteDocID(elementId);
    console.log("pls" + idGivenbyUser);

    this.userService.getRestaurantes().subscribe((RestauranteSnapshot) => {
      RestauranteSnapshot.forEach((RestauranteSnapshotData: any) => {
        if (elementId == RestauranteSnapshotData.payload.doc.data().id) {
          idDocRestaurante = RestauranteSnapshotData.payload.doc.id;
        }
      })
    });

    this.userService.giveAvailableMesas().subscribe((MesasSnapshot) => {
      this.Mesas = [];
      MesasSnapshot.forEach((MesasData: any) => {
        if ( "8OGT3c6lahdNPOXltDmw" == idDocRestaurante ) {
          this.Mesas.push({
            id: MesasData.payload.doc.id,
            data: MesasData.payload.doc.data()
          });
        }
      })
    });
  }

  onClickMe(elementId: any) {
    this.getMesas(elementId);
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.restauranteChangedSubscription.unsubscribe();
  }
}
