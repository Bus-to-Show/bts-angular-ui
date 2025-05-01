export interface Reservation {
  discountCodeId?: number | string;
  id: number;
  orderId: number;
  orderedByEmail: string;
  orderedByFirstName: string;
  orderedByLastName: string;
  pickupPartiesId: number;
  status: number;
  userId: number;
  willCallFirstName: string;
  willCallLastName: string;
};
