import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Revenue() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_AXIOS_API}/api/admin/stats`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_AXIOS_API}/api/admin/users`, { withCredentials: true })
        ]);
        
        if (statsRes.data.success) setStats(statsRes.data);
        if (usersRes.data.success) setUsers(usersRes.data.users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading revenue data...</div>;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-[#1C1917]">Revenue Overview</h2>
        <p className="mt-1 text-sm text-gray-500">Detailed breakdown of platform earnings and user plans.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-green-500 mb-1">Total Revenue</p>
            <p className="text-3xl font-serif font-bold text-green-600">₹{stats?.totalRevenue?.toLocaleString()}</p>
          </div>
          <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#B91C1C] mb-1">Premium Users</p>
            <p className="text-3xl font-serif font-bold text-[#1C1917]">{stats?.premiumUsers}</p>
          </div>
          <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center text-[#B91C1C]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Free Users</p>
            <p className="text-3xl font-serif font-bold text-[#1C1917]">{stats?.freeUsers}</p>
          </div>
          <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#1C1917]">User Breakdown</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">User</th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Current Plan</th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Revenue Contributed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(u => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  <p className="font-semibold text-gray-900">{u.name}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </td>
                <td className="px-6 py-3">
                  {u.isPremium ? (
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-[#B91C1C]">Premium</span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">Free Basic</span>
                  )}
                </td>
                <td className="px-6 py-3 text-right">
                  <span className={`text-sm font-bold ${u.amountPaid > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                    ₹{u.amountPaid?.toLocaleString() || '0'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
