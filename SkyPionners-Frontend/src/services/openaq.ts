import type { Location, LatestData } from '../types/openaq';

const API_URL = 'https://api.openaq.org/v3';
const API_KEY = import.meta.env.VITE_OPENAQ_API_KEY;

/**
 * Fetches air quality monitoring locations near a given set of coordinates.
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns A promise that resolves to an array of locations.
 */
export const fetchLocations = async (lat: number, lon: number): Promise<Location[]> => {
  const response = await fetch(`${API_URL}/locations?coordinates=${lat},${lon}&radius=10000&limit=10`, {
    headers: {
      'X-API-Key': API_KEY
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch locations from OpenAQ');
  }
  const data = await response.json();
  return data.results;
};

/**
 * Fetches the latest measurements for a specific location.
 * @param locationId - The ID of the location.
 * @returns A promise that resolves to the latest data for the location.
 */
export const fetchLatestData = async (locationId: number): Promise<LatestData> => {
  const response = await fetch(`${API_URL}/locations/${locationId}/latest`, {
    headers: {
      'X-API-Key': API_KEY
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch latest data for location ${locationId}`);
  }
  const data = await response.json();
  // The API returns an array, we take the first result
  return data.results[0]; 
};
