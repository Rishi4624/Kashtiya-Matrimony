import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contex/AuthContex.jsx'
import UserCard from './UserCard'
import FilterSidebar, {
    EMPTY_FILTERS,
    FILTER_OPTIONS,
    heightToInches,
    incomeOrder,
    normalizeIncome,
} from './FilterSidebar'
import getUsers from '../api/getProfiles.js'

export default function Home() {
    const navigate = useNavigate()
    const location = useLocation()
    const { users = [], setUsers } = useAuth()
    const safeUsers = Array.isArray(users) ? users : []

    const [filters, setFilters] = useState(EMPTY_FILTERS)
    const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    const closeSidebar = () => {
        setIsClosing(true)
        setTimeout(() => {
            setSidebarOpen(false)
            setIsClosing(false)
        }, 300) // matches animation duration
    }

    // Load profiles if context is empty (e.g. after reload)
    useEffect(() => {
        if (!users || users.length === 0) {
            getUsers().then(profiles => {
                setUsers(Array.isArray(profiles) ? profiles : [])
            })
        }
    }, [])

    // Open filter if navigated with openFilter state
    useEffect(() => {
        if (location.state?.openFilter) {
            setSidebarOpen(true)
            // Clear the state so it doesn't reopen on reload
            navigate('/home', { replace: true, state: {} })
        }
    }, [location.state, navigate])

    // ── Filter handlers ──────────────────────────────────────────────────────
    const updateFilter = (name, value) =>
        setFilters(prev => ({ ...prev, [name]: value }))

    const toggleHobby = (hobby) =>
        setFilters(prev => {
            const current = prev.hobbies || []
            return {
                ...prev,
                hobbies: current.includes(hobby)
                    ? current.filter(h => h !== hobby)
                    : [...current, hobby],
            }
        })

    const applyFilters = () => {
        setAppliedFilters(filters)
        closeSidebar()
    }

    const clearFilters = () => {
        setFilters(EMPTY_FILTERS)
        setAppliedFilters(EMPTY_FILTERS)
    }

    const activeFilterCount = Object.entries(appliedFilters).filter(([, v]) =>
        Array.isArray(v) ? v.length > 0 : v !== ''
    ).length

    // ── Apply filters to users ───────────────────────────────────────────────
    const filteredUsers = safeUsers.filter((user) => {
        const f = appliedFilters
        const age = Number(user.age)
        const userHeightIn = heightToInches(user.height)
        const minHeightIn = heightToInches(f.minHeight)
        const maxHeightIn = heightToInches(f.maxHeight)
        const userIncomeNorm = normalizeIncome(user.income || user.annualIncome)
        const userIncomeRank = userIncomeNorm !== null ? (incomeOrder[userIncomeNorm] ?? null) : null
        const minIncomeRank = f.minIncome ? (incomeOrder[f.minIncome] ?? null) : null
        const maxIncomeRank = f.maxIncome ? (incomeOrder[f.maxIncome] ?? null) : null

        if (f.minAge && age && age < Number(f.minAge)) return false
        if (f.maxAge && age && age > Number(f.maxAge)) return false
        if (minHeightIn && userHeightIn && userHeightIn < minHeightIn) return false
        if (maxHeightIn && userHeightIn && userHeightIn > maxHeightIn) return false
        if (f.city && !((user.city || user.location || '').toLowerCase().includes(f.city.toLowerCase()))) return false
        if (f.community && (user.community || user.caste || '').toLowerCase() !== f.community.toLowerCase()) return false
        if (f.religion && (user.religion || '').toLowerCase() !== f.religion.toLowerCase()) return false
        if (f.maritalStatus && user.maritalStatus !== f.maritalStatus) return false
        if (f.education && !(user.education || '').toLowerCase().includes(f.education.toLowerCase())) return false
        if (f.diet && user.diet !== f.diet) return false
        if (f.profession && (user.profession || user.employmentType || '').toLowerCase() !== f.profession.toLowerCase()) return false
        if (f.occupation && !(user.occupation || '').toLowerCase().includes(f.occupation.toLowerCase())) return false
        if (minIncomeRank !== null && userIncomeRank !== null && userIncomeRank < minIncomeRank) return false
        if (maxIncomeRank !== null && userIncomeRank !== null && userIncomeRank > maxIncomeRank) return false
        if (f.smoking && user.smoking !== f.smoking) return false
        if (f.drinking && user.drinking !== f.drinking) return false
        if (f.hobbies?.length > 0) {
            const userHobbies = (user.hobbies || []).map(h => h.toLowerCase())
            if (!f.hobbies.some(h => userHobbies.includes(h.toLowerCase()))) return false
        }
        return true
    })

    // ── Shared sidebar props ─────────────────────────────────────────────────
    const sidebarProps = {
        filters,
        onFilterChange: updateFilter,
        onToggleHobby: toggleHobby,
        onApply: applyFilters,
        onClear: clearFilters,
        filteredCount: filteredUsers.length,
        totalCount: safeUsers.length,
        activeFilterCount,
    }

    return (
        <div className="min-h-screen bg-[#FFF5F5] font-sans text-[#2C2A26] antialiased">

            {/* ── Top bar ── */}
            <div className="sticky top-0 z-30 border-b border-[#FED7D7] bg-white/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
                    <div>
                        <h1 className="font-serif text-xl font-semibold text-[#1C1917]">Browse Profiles</h1>
                        <p className="text-xs text-[#A39E96]">
                            {safeUsers.length === 0 ? 'Loading...' : `${filteredUsers.length} of ${safeUsers.length} profiles`}
                        </p>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(prev => !prev)}
                        className="relative flex items-center gap-2 rounded-xl border border-[#FECDD3] bg-white px-5 py-2.5 text-sm font-semibold text-[#1C1917] shadow-sm transition hover:border-[#B91C1C]/60 hover:text-[#B91C1C]"
                    >
                        Filter
                        {activeFilterCount > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#B91C1C] text-[10px] font-bold text-white">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
                <div className="flex gap-6">
                    {/* ── Profile list ── */}
                    <main className="flex-1 min-w-0">
                        {safeUsers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#FECDD3] bg-[#FFF8F8] py-20 text-center">
                                <div className="mb-4 text-4xl">⏳</div>
                                <p className="text-base font-medium text-[#5C574F]">Loading profiles...</p>
                                <p className="mt-1 text-sm text-[#A39E96]">Please wait a moment</p>
                            </div>
                        ) : filteredUsers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#FECDD3] bg-[#FFF8F8] py-20 text-center">
                                <div className="mb-4 text-4xl">🔍</div>
                                <p className="text-base font-medium text-[#5C574F]">No profiles match your filters</p>
                                <p className="mt-1 text-sm text-[#A39E96]">Try removing some filters</p>
                                <button onClick={clearFilters} className="mt-4 rounded-xl border border-[#B91C1C] px-5 py-2 text-sm font-semibold text-[#B91C1C] hover:bg-[#B91C1C]/5 transition">
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {filteredUsers.map((user, index) => (
                                    <UserCard
                                        key={user._id || user.id || `profile-${index}`}
                                        user={user}
                                        delay={`${(index + 1) * 0.05}s`}
                                        onClick={() => navigate(`/profile/${user._id || user.id}`, { state: { user } })}
                                    />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* ── Right-side filter drawer ── */}
            {(sidebarOpen || isClosing) && (
                <>
                    {/* Backdrop */}
                    <div
                        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
                        onClick={closeSidebar}
                    />
                    {/* Right panel */}
                    <div className={`fixed top-0 right-0 z-[101] h-full w-80 shadow-2xl overflow-hidden rounded-l-3xl ${isClosing ? 'animate-slide-right' : 'animate-slide-left'}`}>
                        <FilterSidebar {...sidebarProps} onClose={closeSidebar} />
                    </div>
                </>
            )}
        </div>
    )
}
