import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import getShortlist from '../api/getShortlist';

export default function Shortlist() {
    const navigate = useNavigate();
    const [shortlistedUsers, setShortlistedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShortlist = async () => {
            const res = await getShortlist();
            if (res.success) {
                setShortlistedUsers(res.shortlisted || []);
            }
            setLoading(false);
        };
        fetchShortlist();
    }, []);

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-[#FFF5F5] font-sans text-[#2C2A26] antialiased px-4 py-8 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Your Shortlist</h1>
                    <p className="mt-2 text-sm text-[#A39E96]">
                        Profiles you've saved for later review.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#FECDD3] bg-[#FFF8F8] py-20 text-center">
                        <div className="mb-4 text-4xl">⏳</div>
                        <p className="text-base font-medium text-[#5C574F]">Loading your shortlist...</p>
                    </div>
                ) : shortlistedUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#FECDD3] bg-[#FFF8F8] py-20 text-center">
                        <div className="mb-4 text-4xl">⭐</div>
                        <p className="text-base font-medium text-[#5C574F]">No shortlisted profiles</p>
                        <p className="mt-1 text-sm text-[#A39E96]">You haven't saved any profiles yet.</p>
                        <button onClick={() => navigate('/home')} className="mt-6 rounded-xl bg-[#B91C1C] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#991B1B] shadow-sm transition">
                            Browse Profiles
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 max-w-3xl">
                        {shortlistedUsers.map((user, index) => (
                            <UserCard
                                key={user._id || user.id || index}
                                user={user}
                                delay={`${(index + 1) * 0.05}s`}
                                onClick={() => navigate(`/profile/${user._id || user.id}`, { state: { user } })}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
