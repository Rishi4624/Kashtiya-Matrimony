import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Transactions() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPremium = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_AXIOS_API}/api/admin/premium`, {
        withCredentials: true
      });
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPremium();
  }, []);

  if (loading) return <div>Loading transactions...</div>;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-[#1C1917]">Transactions</h2>
        <p className="mt-1 text-sm text-gray-500">List of users who purchased premium memberships.</p>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Transaction ID</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">User</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Date</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(u => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-mono text-gray-500">
                  #TRX-{u._id.substring(u._id.length - 8).toUpperCase()}
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900">{u.name}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {u.premiumDate ? new Date(u.premiumDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-sm font-bold text-green-700">
                    +₹{u.amountPaid?.toLocaleString() || '999'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="p-8 text-center text-gray-500">No transactions found.</div>
        )}
      </div>
    </div>
  );
}
