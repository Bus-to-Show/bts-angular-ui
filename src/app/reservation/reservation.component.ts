import {Component, Input} from '@angular/core';
import {ReservationsService} from '../services/reservations.service';
import {Order} from '../types/order';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  @Input() reservation!: Order;
  @Input() parent!: 'check-in' | 'management';

  constructor(
    private reservationsService: ReservationsService,
  ) {}

  updateReservationStatus(changeEvent: any) {
    this.reservationsService.updateStatus(this.reservation.id, changeEvent.checked).subscribe((response: any) => {
      this.reservation.status = response[0].status;
    });
  }

  cancel() {
    this.reservationsService.updateStatus(this.reservation.id, 'CANCEL').subscribe((response: any) => {
      this.reservation.status = response[0].status;
    });
  }

  uncancel() {
    // TODO: check availability first
    this.reservationsService.updateStatus(this.reservation.id, 'UNCANCEL').subscribe((response: any) => {
      this.reservation.status = response[0].status;
    });
  }
}
