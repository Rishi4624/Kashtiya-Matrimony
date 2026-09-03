import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerificationQueue() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPending = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_AXIOS_API}/api/admin/pending`, {
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
    fetchPending();
  }, []);

  const handleVerify = async (id) => {
    if (!window.confirm("Approve this profile?")) return;
    try {
      await axios.put(`${import.meta.env.VITE_AXIOS_API}/api/admin/users/${id}/verify`, {}, { withCredentials: true });
      fetchPending();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Reject and delete this profile?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_AXIOS_API}/api/admin/users/${id}`, { withCredentials: true });
      fetchPending();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading queue...</div>;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-[#1C1917]">Verification Queue</h2>
        <p className="mt-1 text-sm text-gray-500">Review and approve new user profiles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(u => (
          <div key={u._id} className="bg-white p-5 rounded-2xl shadow-sm border border-amber-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl">
                {u.name?.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-[#1C1917]">{u.name}</p>
                <p className="text-xs text-gray-500">{u.email}</p>
              </div>
            </div>
            
            <div className="mb-4 text-sm text-gray-600">
              <p><strong>Age:</strong> {u.age || 'N/A'} • <strong>City:</strong> {u.city || 'N/A'}</p>
              <p><strong>Religion:</strong> {u.religion || 'N/A'}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => navigate(`/profile/${u._id}`)} className="flex-1 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition">View</button>
              <button onClick={() => handleVerify(u._id)} className="flex-1 py-2 text-sm font-bold text-white bg-green-500 rounded-xl hover:bg-green-600 transition shadow-sm">Verify</button>
              <button onClick={() => handleReject(u._id)} className="flex-1 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition">Reject</button>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="col-span-full p-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
            No pending verifications! 🎉
          </div>
        )}
      </div>
    </div>
  );
}
