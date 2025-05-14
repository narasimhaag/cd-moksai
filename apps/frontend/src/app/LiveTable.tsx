'use client'
import React, { useEffect, useState } from 'react';
import { StoreEvent } from '@acme/types';

interface LiveTableProps {
  storeId: number;
}

export const LiveTable: React.FC<LiveTableProps> = ({ storeId }) => {
  const [data, setData] = useState<StoreEvent[]>([]);

  useEffect(() => {
    // Fetch initial data
    fetch(`http://localhost:3001/api/live/${storeId}`)
      .then(res => res.json())
      .then(setData);

    // Set up WebSocket connection
    const ws = new WebSocket('ws://localhost:8080');
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'live_event' && message.data.store_id === storeId) {
        setData(prev => [...prev, message.data].slice(-50));
      }
    };

    return () => ws.close();
  }, [storeId]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Time</th>
            <th className="py-3 px-6 text-left">Customers In</th>
            <th className="py-3 px-6 text-left">Customers Out</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {data.map((event, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{event.time_stamp}</td>
              <td className="py-3 px-6 text-left">{event.customers_in}</td>
              <td className="py-3 px-6 text-left">{event.customers_out}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};