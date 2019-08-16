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
  private db: AngularFirestore;

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

  onClickGiveRestauranteID(selectedId) {
    var idDocRestaurante: string;
    var idGivenbyUser: string;

    // idGivenbyUser = this.userService.getRestauranteDocID(selectedId);
    // debugger;

    //Esta funciona sirve para buscar el DOC.id(de base de datos) con el ID (property) al hacer click, 
    //pero no se usa ya que aun no puedo enviar el DOC.id (del UI) para comparar
    this.userService.getRestaurantes().subscribe((RestauranteSnapshot) => {
      RestauranteSnapshot.forEach((RestauranteSnapshotData: any) => {
        if (selectedId == RestauranteSnapshotData.payload.doc.data().id) {
          idDocRestaurante = RestauranteSnapshotData.payload.doc.id;
        }
      })
    });    

    this.Mesas = [];
    this.userService.giveAvailableMesas(selectedId).subscribe((MesasSnapshot) => {
      MesasSnapshot.forEach((MesasData: any) => {
        //aqui se usaria el codigo de arriba...if(idDocRestaurante == idGivenbyUser) {do abajo}
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
