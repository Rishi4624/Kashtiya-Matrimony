import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_AXIOS_API}/api/admin/stats`, {
          withCredentials: true
        });
        if (data.success) {
          setStats(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="text-gray-500">Loading dashboard...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-[#1C1917]">Dashboard Overview</h2>
        <p className="mt-1 text-sm text-gray-500">Welcome to the Kshtriya Matrimony Admin Portal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Users */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Total Users</p>
          <p className="text-4xl font-serif font-bold text-[#1C1917]">{stats?.totalUsers}</p>
        </div>

        {/* Card 2: Premium Users */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold uppercase tracking-widest text-[#B91C1C] mb-2">Premium Users</p>
          <p className="text-4xl font-serif font-bold text-[#1C1917]">{stats?.premiumUsers}</p>
        </div>

        {/* Card 3: Verifications */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-200">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">Pending Verifications</p>
          <p className="text-4xl font-serif font-bold text-amber-600">{stats?.pendingVerifications}</p>
        </div>

        {/* Card 4: Revenue */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-200">
          <p className="text-xs font-bold uppercase tracking-widest text-green-500 mb-2">Total Revenue</p>
          <p className="text-4xl font-serif font-bold text-green-600">₹{stats?.totalRevenue?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
