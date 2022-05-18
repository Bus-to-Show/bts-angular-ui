import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationsService } from '../services/reservations.service';
import { Location } from '@angular/common';
import { Order } from '../types/order'


@Component({
  selector: 'app-party-management',
  templateUrl: './party-management.component.html',
  styleUrls: ['./party-management.component.scss']
})
export class PartyManagementComponent implements OnInit {
  partyId: number;
  reservations: Order[] = []
  searchTerm: string = ''

  get filteredReservations(): Order[]{
    return this.reservations.filter(reservation => {
      return reservation.willCallFirstName.toUpperCase().includes(this.searchTerm)
        || reservation.willCallLastName?.toUpperCase().includes(this.searchTerm)
        || reservation.orderedByLastName?.toUpperCase().includes(this.searchTerm)
        || reservation.orderedByFirstName?.toUpperCase().includes(this.searchTerm)
    });
  } 
  
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private reservationsService: ReservationsService
    ) { 
      this.partyId = Number(this.route.snapshot.paramMap.get('id'))

    }

  ngOnInit(): void {
    this.partyId = Number(this.route.snapshot.paramMap.get('id'))
    this.reservationsService.getOrders(this.partyId).subscribe(orders => {
      this.reservations = orders
      //this.refreshReservations()
    }); 
  }

  refreshReservations(){
    setInterval(()=> {
      this.reservationsService.getOrders(this.partyId).subscribe(orders => {
        this.reservations = orders
      }); 
    }, 20000); 
  }

    //Push a search term into the observable stream.
  search(term: string): Order[] {
    this.searchTerm = term.toUpperCase().trim();
    return this.filteredReservations;
  }
  
  goBack(): void {
    this.location.back();
  }
}
