export interface PickupParty {
  id?: number;
  party_id: number;
  eventId?: number;
  location_id: number;
  capacity?: string;
  firstBusLoadTime?: string;
  inCart?: number;
  lastBusDepartureTime?: string;
  locationName: string;
  partyPrice?: number;
  reservations?: string;
  city?: string;
  created?: boolean | null;
  type?: string;
};
