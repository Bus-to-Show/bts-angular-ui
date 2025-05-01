import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ReservationsService } from '../services/reservations.service';
import { Reservation } from '../types/reservation';

@Component({
  selector: 'app-party-check-in',
  templateUrl: './party-check-in.component.html',
  styleUrls: ['./party-check-in.component.scss']
})
export class PartyCheckInComponent implements OnInit {
  partyId: number;
  reservations: Reservation[] = []
  searchTerm: string = ''

  get filteredReservations(): Reservation[] {
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
    this.reservationsService.getReservations(this.partyId).subscribe(reservations => {
      this.reservations = reservations
      this.refreshReservations()
    });
  }

  refreshReservations(){
    setInterval(()=> {
      this.reservationsService.getReservations(this.partyId).subscribe(reservations => {
        this.reservations = reservations
      });
    }, 20000);
  }

  //Push a search term into the observable stream.
  search(term: string): Reservation[] {
    this.searchTerm = term.toUpperCase().trim();
    return this.filteredReservations;
  }

  goBack(): void {
    this.location.back();
  }
}
