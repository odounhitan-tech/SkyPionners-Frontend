// Based on the OpenAQ API documentation

export interface Location {
  id: number;
  name: string;
  city: string | null;
  country: string | null;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  distance: number;
}

export interface Measurement {
  parameter: string;
  value: number;
  unit: string;
  lastUpdated: string;
}

export interface LatestData {
  locationId: number;
  location: string;
  measurements: Measurement[];
}
