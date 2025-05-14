'use client'
import React, { useEffect, useState } from 'react';
import { HourlyData } from '@acme/types';

export const HistoryTable: React.FC<{ storeId: number }> = ({ storeId }) => {
  const [data, setData] = useState<HourlyData[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/history/${storeId}`)
      .then(res => res.json())
      .then(setData);
  }, [storeId]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Hour</th>
            <th className="py-3 px-6 text-left">Total In</th>
            <th className="py-3 px-6 text-left">Total Out</th>
            <th className="py-3 px-6 text-left">Net Change</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {data.map((hourData, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{hourData.hour}</td>
              <td className="py-3 px-6 text-left">{hourData.customers_in}</td>
              <td className="py-3 px-6 text-left">{hourData.customers_out}</td>
              <td className="py-3 px-6 text-left">
                {hourData.customers_in - hourData.customers_out}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};