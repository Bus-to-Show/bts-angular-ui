export interface PickupParty {
    id?: number;
    eventId?: number;
    pickupLocationId: number;
    capacity?: string;
    firstBusLoadTime?: string;
    inCart?: number;
    lastBusDepartureTime?: string;
    locationName: string;
    partyPrice?: number;
    reservations?: string;
    city?: string;
  }