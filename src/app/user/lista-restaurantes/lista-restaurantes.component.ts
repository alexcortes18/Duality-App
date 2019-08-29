import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Restaurante } from '../restaurante.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Mesas } from '../mesas.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-lista-restaurantes',
  templateUrl: './lista-restaurantes.component.html',
  styleUrls: ['./lista-restaurantes.component.css']
})
export class ListaRestaurantesComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['name'];
  dataSource = new MatTableDataSource<Restaurante>();
  private restauranteChangedSubscription: Subscription;
  Mesas: any;
  RestauranteName: string;
  selectedRestaurante: any;
  private db: AngularFirestore;
  click = false;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.restauranteChangedSubscription = this.userService.restaurantes.subscribe((restaurantes: Restaurante[]) => {
      this.dataSource.data = restaurantes;
    });
    this.userService.fetchavailableRestaurantes();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onClickGiveRestauranteID(selectedId,restaurante) {
    this.click=true;
    var idDocRestaurante: string;
    var idGivenbyUser: string;

    this.RestauranteName = restaurante;
    
    this.userService.getRestaurantes().subscribe((RestauranteSnapshot) => {
      RestauranteSnapshot.forEach((RestauranteSnapshotData: any) => {
          if (selectedId == RestauranteSnapshotData.payload.doc.data().id) {
              this.selectedRestaurante = RestauranteSnapshotData.payload.doc.id;
              this.getMesas(this.selectedRestaurante);
              
          }
      });
  });
  }
  
  getMesas(selectedRestaurante){
    this.userService.giveAvailableMesas(selectedRestaurante).subscribe((MesasSnapshot) => {
      this.Mesas = [];
      MesasSnapshot.forEach((MesasData: any) => {
        this.Mesas.push({
            id: MesasData.payload.doc.id,
            data: MesasData.payload.doc.data()
          });
      })
    });
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.restauranteChangedSubscription.unsubscribe();
  }
}
