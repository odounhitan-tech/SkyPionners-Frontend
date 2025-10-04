import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import { useGeolocation } from '../hooks/useGeolocation';

const DashboardPage: React.FC = () => {
  const { error: geoError, loading: geoLoading } = useGeolocation();

  if (geoLoading) {
    return <div className="text-center text-xl">Fetching your location...</div>;
  }

  if (geoError) {
    console.warn('Geolocation failed or was denied. Using default location.');
  }

  return <Dashboard />;
};

export default DashboardPage;
