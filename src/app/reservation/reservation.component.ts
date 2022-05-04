import { Component, Input, OnInit } from '@angular/core';
import { ReservationsService } from '../services/reservations.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  @Input() reservation: any;


  constructor(
    private reservationsService: ReservationsService
  ) { }

  ngOnInit(): void {
  }

  updateReservationStatus(changeEvent: any){
    this.reservationsService.updateStatus(this.reservation.id, changeEvent.checked).subscribe((response: any )=> {
      console.log('updateReservationStatus ------- ', this.reservation.id, ' aaaaaaaand response -----', response)
    })


  }
}
