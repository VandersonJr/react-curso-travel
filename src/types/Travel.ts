
export type TripType = "round" | "oneWay" | "multi";

export type SortOption = "price" | "duration" | "departure";

export type Airline = "LATAM" | "GOL" | "Azul";

export interface Flight {
  id: number;
  airline: Airline;
  departTime: string;
  arrivalTime: string;
  duration: string;
  durationMinutes: number;
  stops: number;
  stopsText: string;
  price: number;
  flightNum: string;
  badge: string | null;
}

export interface Destination {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
  airport: string;
}

export interface Passengers {
  adults: number;
  children: number;
}

export interface FlightFilters {
  stops: number[];
  airlines: Airline[];
  maxPrice: number;
}
