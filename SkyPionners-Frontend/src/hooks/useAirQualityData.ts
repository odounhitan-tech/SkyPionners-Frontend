import { useState, useEffect } from 'react';
import type { Location, LatestData } from '../types/openaq';
import { fetchLocations, fetchLatestData } from '../services/openaq';

interface UseAirQualityDataResult {
  locations: Location[];
  latestData: LatestData | null;
  loading: boolean;
  error: string | null;
  fetchDataForLocation: (locationId: number) => Promise<void>;
}

const useAirQualityData = (lat: number, lon: number): UseAirQualityDataResult => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [latestData, setLatestData] = useState<LatestData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleError = (message: string, error: unknown) => {
    setError(message);
    console.error(message, error);
  };

  const loadData = async (operation: () => Promise<void>) => {
    try {
      setLoading(true);
      setError(null);
      await operation();
    } catch (err) {
      handleError('An error occurred while fetching data.', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      await loadData(async () => {
        const nearbyLocations = await fetchLocations(lat, lon);
        setLocations(nearbyLocations);
        if (nearbyLocations.length > 0) {
          const initialLatestData = await fetchLatestData(nearbyLocations[0].id);
          setLatestData(initialLatestData);
        }
      });
    };

    loadInitialData();
  }, [lat, lon]);

  const fetchDataForLocation = async (locationId: number) => {
    await loadData(async () => {
      const data = await fetchLatestData(locationId);
      setLatestData(data);
    });
  };

  return { locations, latestData, loading, error, fetchDataForLocation };
};

export { useAirQualityData };
