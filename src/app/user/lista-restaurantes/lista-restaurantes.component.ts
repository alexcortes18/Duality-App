import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Restaurante } from '../restaurante.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-lista-restaurantes',
  templateUrl: './lista-restaurantes.component.html',
  styleUrls: ['./lista-restaurantes.component.css']
})
export class ListaRestaurantesComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['name'];
  dataSource =  new MatTableDataSource<Restaurante>();
  private restauranteChangedSubscription: Subscription;
  isRed = false;
  Restaurantes: any;

  @ViewChild(MatSort, {static:false}) sort: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.restauranteChangedSubscription = this.userService.restaurantes.subscribe((restaurantes: Restaurante[]) =>
    {
      this.dataSource.data = restaurantes;
      // this.Restaurantes = restaurantes; //a ver si me agarra
      // console.log(this.Restaurantes);
    });
    this.userService.fetchavailableRestaurantes();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getMesas();
  }

  getMesas(){
    this.userService.getRestaurantes().subscribe((restaurantesSnapshot) => {
      this.Restaurantes = [];
      restaurantesSnapshot.forEach((restaurantesData: any) => {
        this.Restaurantes.push({
          id: restaurantesData.payload.doc.id,
          data: restaurantesData.payload.doc.data()
        });
        console.log(this.Restaurantes);
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
