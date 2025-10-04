export interface AirQualityStation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  airQualityIndex?: number;
  lastUpdated?: string;
  parameters?: {
    pm25?: number;
    pm10?: number;
    no2?: number;
    o3?: number;
    so2?: number;
    co?: number;
  };
}

export interface TempoDataPoint {
  lat: number;
  lon: number;
  value: number;
  timestamp: string;
  parameter: string; // 'NO2', 'O3', 'PM2.5', etc.
}

export interface AirQualityForecast {
  date: string;
  aqi: number;
  dominantPollutant: string;
  parameters: {
    [key: string]: number;
  };
}

export interface AirQualityData {
  current: {
    aqi: number;
    dominantPollutant: string;
    timestamp: string;
    station: AirQualityStation;
  };
  forecast?: AirQualityForecast[];
  historical?: {
    date: string;
    aqi: number;
  }[];
}

export interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}
