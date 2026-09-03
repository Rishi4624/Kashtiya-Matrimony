import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_AXIOS_API}/api/admin/users`, {
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
    fetchUsers();
  }, []);

  const handleVerify = async (id) => {
    if (!window.confirm("Verify this user?")) return;
    try {
      await axios.put(`${import.meta.env.VITE_AXIOS_API}/api/admin/users/${id}/verify`, {}, { withCredentials: true });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleTogglePremium = async (id) => {
    if (!window.confirm("Toggle premium status for this user?")) return;
    try {
      await axios.put(`${import.meta.env.VITE_AXIOS_API}/api/admin/users/${id}/premium`, {}, { withCredentials: true });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_AXIOS_API}/api/admin/users/${id}`, { withCredentials: true });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-[#1C1917]">User Management</h2>
        <p className="mt-1 text-sm text-gray-500">Manage all registered users, verify accounts, and handle premium status.</p>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">User</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Plan</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(u => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                      {u.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {u.isVerified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-600">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {u.isPremium ? (
                    <span className="text-xs font-bold text-[#B91C1C]">Premium</span>
                  ) : (
                    <span className="text-xs text-gray-500">Free</span>
                  )}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => navigate(`/profile/${u._id}`)} className="text-xs font-medium text-blue-600 hover:underline">View</button>
                  {!u.isVerified && (
                    <button onClick={() => handleVerify(u._id)} className="text-xs font-medium text-green-600 hover:underline">Verify</button>
                  )}
                  <button onClick={() => handleTogglePremium(u._id)} className="text-xs font-medium text-purple-600 hover:underline">
                    {u.isPremium ? 'Remove Premium' : 'Make Premium'}
                  </button>
                  <button onClick={() => handleDelete(u._id)} className="text-xs font-medium text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="p-8 text-center text-gray-500">No users found.</div>
        )}
      </div>
    </div>
  );
}
