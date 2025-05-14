'use client'
import React, { useState } from 'react';
import { LiveTable } from '../LiveTable';
import { HistoryTable } from '../HistoryTable';

const Dashboard: React.FC = () => {
  const [storeId, setStoreId] = useState<number>(10);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Store Traffic Dashboard</h1>
      
      <div className="mb-8">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Store ID:
        </label>
        <input
          type="number"
          value={storeId}
          onChange={(e) => setStoreId(parseInt(e.target.value) || 10)}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Live Traffic</h2>
        <LiveTable storeId={storeId} />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Last 24 Hours</h2>
        <HistoryTable storeId={storeId} />
      </div>
    </div>
  );
};

export default Dashboard;