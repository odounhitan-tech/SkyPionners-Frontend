import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { LatestData } from '../../types/openaq';

interface DataChartProps {
  latestData: LatestData | null;
}

const DataChart: React.FC<DataChartProps> = ({ latestData }) => {
  if (!latestData) {
    return (
      <div className="bg-primary p-4 rounded-lg h-full flex items-center justify-center">
        <p className="text-light">Select a location to see the latest measurements.</p>
      </div>
    );
  }

  return (
    <div className="bg-primary p-4 rounded-lg h-full">
      <h3 className="text-xl font-bold text-light mb-4">Latest Measurements for {latestData.location}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={latestData.measurements} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis type="number" stroke="#A0AEC0" />
          <YAxis type="category" dataKey="parameter" stroke="#A0AEC0" width={80} />
          <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: 'none' }} />
          <Legend />
          <Bar dataKey="value" fill="#4D85E0" name="Value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataChart;
