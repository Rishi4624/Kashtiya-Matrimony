import React, { useState } from 'react'
import UserCard from './UserCard'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contex/AuthContex.jsx'

import heroBackground from '../assets/mission_img1.jpg'

export default function Home() {
    const navigate = useNavigate()
    const { users } = useAuth()
    const [filters, setFilters] = useState({
         gender: '', 
         minAge: '', 
         maxAge: '', 
         religion: '', 
         motherTongue: '', 
         location: '', 
         maritalStatus: '', 
         education: '', 
         occupation: '', 
         diet: '', 
         smoking: '', 
         drinking: '' 
        })
    const [appliedFilters, setAppliedFilters] = useState(filters)

    // useEffect(() => {
    //     console.log('mounted')
    //      const loadProfiles = async () => {
    //     const profiles = await getProfiles()
    //     setUsers(Array.isArray(profiles) ? profiles : [])
    // }
    // loadProfiles()
    // },[])

    const updateFilter = (event) => {
        const { name, value } = event.target
        setFilters((current) => ({ ...current, [name]: value }))
    }

    const applyFilters = (event) => {
        event.preventDefault()
        setAppliedFilters(filters)
    }

    const clearFilters = () => {
        const emptyFilters = { gender: '', minAge: '', maxAge: '', religion: '', motherTongue: '', location: '', maritalStatus: '', education: '', occupation: '', diet: '', smoking: '', drinking: '' }
        setFilters(emptyFilters)
        setAppliedFilters(emptyFilters)
    }

    const filteredUsers = users.filter((user) => {
        const age = Number(user.age)
        const matchesGender = !appliedFilters.gender || user.gender === appliedFilters.gender
        const matchesMinAge = !appliedFilters.minAge || (age > 0 && age >= Number(appliedFilters.minAge))
        const matchesMaxAge = !appliedFilters.maxAge || (age > 0 && age <= Number(appliedFilters.maxAge))
        const matchesReligion = !appliedFilters.religion || user.religion === appliedFilters.religion
        const matchesMotherTongue = !appliedFilters.motherTongue || user.motherTongue?.toLowerCase() === appliedFilters.motherTongue.toLowerCase()
        const matchesLocation = !appliedFilters.location || user.location?.toLowerCase().includes(appliedFilters.location.toLowerCase())
        const matchesMaritalStatus = !appliedFilters.maritalStatus || user.maritalStatus === appliedFilters.maritalStatus
        const matchesEducation = !appliedFilters.education || user.education?.toLowerCase().includes(appliedFilters.education.toLowerCase())
        const matchesOccupation = !appliedFilters.occupation || user.occupation?.toLowerCase().includes(appliedFilters.occupation.toLowerCase())
        const matchesDiet = !appliedFilters.diet || user.diet === appliedFilters.diet
        const matchesSmoking = !appliedFilters.smoking || user.smoking === appliedFilters.smoking
        const matchesDrinking = !appliedFilters.drinking || user.drinking === appliedFilters.drinking
        return matchesGender && matchesMinAge && matchesMaxAge && matchesReligion && matchesMotherTongue && matchesLocation && matchesMaritalStatus && matchesEducation && matchesOccupation && matchesDiet && matchesSmoking && matchesDrinking
    })

    const selectClass = 'w-full rounded-xl border border-[#E8E0D5] bg-white px-3 py-2.5 text-sm text-[#2C2A26] focus:border-[#C4782A] focus:ring-2 focus:ring-[#C4782A]/20 outline-none transition'

    return (
        <div className="min-h-screen bg-[#F7F3EE] font-sans text-[#2C2A26] antialiased">
            <section className="relative overflow-hidden border-b border-[#E8E0D5]">
                <img
                    src={heroBackground}
                    alt="Indian wedding couple"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A120B]/90 via-[#1A120B]/70 to-[#1A120B]/35" />
                <div className="relative">
                    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
                        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-24">
                            <div className="text-white">
                                <p className="mb-4 text-xs font-serif uppercase tracking-[0.2em] text-[#E8A85C]">Findings · 2026</p>
                                <h1 className="mb-5 font-serif text-4xl font-medium leading-tight text-white sm:text-5xl">Marriage, arranged<br />with <span className="italic font-serif text-[#E8A85C]">intention.</span></h1>
                                <p className="mb-8 max-w-md font-serif text-base leading-relaxed text-[#E8D9C8]/90">A calm, family-first way to meet. Verified profiles, community you can filter by, and introductions your parents can read too.</p>
                                <div className="flex flex-wrap gap-6 text-sm text-[#E8D9C8]/85"><span>2.4L+ verified profiles</span><span className="text-white/40">|</span><span>190+ cities</span></div>
                            </div>

                            <form onSubmit={applyFilters} className="rounded-3xl border border-[#E8E0D5] bg-[#FBF8F4] p-6 shadow-sm sm:p-8">
                                <div className="mb-6 flex items-start justify-between gap-4"><h2 className="font-sans text-xl font-medium text-[#1A1916]">Tell us who you seek</h2><span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-[#C4782A]">Step 1 of 3</span></div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">I'm looking for</label><select name="gender" value={filters.gender} onChange={updateFilter} className={selectClass}><option value="">Any</option><option value="female">Bride</option><option value="male">Groom</option><option value="other">Other</option></select></div>
                                    <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Age range</label><div className="flex items-center gap-2"><select name="minAge" value={filters.minAge} onChange={updateFilter} className={selectClass}><option value="">Min</option>{[18, 21, 25, 30, 35, 40, 45, 50].map((age) => <option key={age} value={age}>{age}</option>)}</select><span className="text-[#A39E96]">-</span><select name="maxAge" value={filters.maxAge} onChange={updateFilter} className={selectClass}><option value="">Max</option>{[25, 30, 35, 40, 45, 50, 60, 70].map((age) => <option key={age} value={age}>{age}</option>)}</select></div></div>
                                    <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Community</label><select name="religion" value={filters.religion} onChange={updateFilter} className={selectClass}><option value="">Any community</option><option>Hinduism</option><option>Islam</option><option>Christianity</option><option>Sikhism</option><option>Buddhism</option><option>Jainism</option><option>other</option></select></div>
                                    <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Mother tongue</label><select name="motherTongue" value={filters.motherTongue} onChange={updateFilter} className={selectClass}><option value="">Any</option><option>Hindi</option><option>English</option><option>Marathi</option><option>Bengali</option><option>Tamil</option></select></div>
                                </div>
                                <div className="mt-5 border-t border-[#E8E0D5] pt-5"><p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Refine your preferences</p><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Location</label><input name="location" value={filters.location} onChange={updateFilter} placeholder="City or area" className={selectClass} /></div>
                                    <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Marital status</label><select name="maritalStatus" value={filters.maritalStatus} onChange={updateFilter} className={selectClass}><option value="">Any status</option><option>Never married</option><option>Divorced</option><option>Widowed</option><option>Separated</option></select></div>
                                    <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Education</label><input name="education" value={filters.education} onChange={updateFilter} placeholder="e.g. Engineering" className={selectClass} /></div>
                                    <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Occupation</label><input name="occupation" value={filters.occupation} onChange={updateFilter} placeholder="e.g. Teacher" className={selectClass} /></div>
                                    <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Diet</label><select name="diet" value={filters.diet} onChange={updateFilter} className={selectClass}><option value="">Any diet</option><option>Vegetarian</option><option>Non-vegetarian</option><option>Eggetarian</option><option>Vegan</option><option>Other</option></select></div>
                                    <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Lifestyle</label><div className="flex gap-2"><select name="smoking" value={filters.smoking} onChange={updateFilter} className={selectClass} aria-label="Smoking preference"><option value="">Smoking</option><option>Never</option><option>Occasionally</option><option>Regularly</option></select><select name="drinking" value={filters.drinking} onChange={updateFilter} className={selectClass} aria-label="Drinking preference"><option value="">Drinking</option><option>Never</option><option>Occasionally</option><option>Regularly</option></select></div></div>
                                </div></div>
                                <button type="submit" className="mt-6 w-full rounded-xl bg-[#C4782A] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#A8651F] hover:shadow-md active:scale-[0.98]">Show my matches</button>
                                <div className="mt-3 flex items-center justify-between gap-3"><p className="text-xs text-[#A39E96]">Community is optional. Your family can join any profile.</p><button type="button" onClick={clearFilters} className="shrink-0 text-xs font-medium text-[#5C574F] transition hover:text-[#C4782A]">Clear</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


            <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16"><div className="mb-8"><p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#C4782A]">Browse</p><h2 className="font-serif text-2xl font-medium text-[#1A1916] sm:text-3xl">Featured profiles</h2><p className="mt-1 text-sm text-[#5C574F]">Showing {filteredUsers.length} of {users.length} profiles</p></div>{users.length === 0 ? <div className="rounded-2xl border border-dashed border-[#E8E0D5] bg-[#FBF8F4] py-16 text-center text-[#5C574F]">Loading profiles...</div> : filteredUsers.length === 0 ? <div className="rounded-2xl border border-dashed border-[#E8E0D5] bg-[#FBF8F4] py-16 text-center text-[#5C574F]">No profiles match your search.</div> : <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filteredUsers.map((user, index) => <UserCard key={user.id || user._id || `profile-${index}`} user={user} delay={`${(index + 1) * 0.05}s`} onClick={() => navigate(`/profile/${user.id || user._id}`, { state: { user } })} />)}</div>}</main>



            <section className="border-y border-[#E8E0D5] bg-[#FBF8F4] py-14 sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="mb-10 text-center"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#C4782A]">Why us</p><h2 className="font-serif text-2xl font-medium text-[#1A1916] sm:text-3xl">Why choose Kashtiya Matrimony?</h2></div><div className="grid gap-6 md:grid-cols-3">{[{ title: 'Verified & Screened', desc: 'Every profile goes through thorough screening so you meet genuine people serious about marriage.' }, { title: 'Advanced Matching', desc: 'Filter by religion, mother tongue, education, location and more to find compatible matches.' }, { title: 'Safe & Private', desc: 'You control who sees your photos and contact details. Your privacy is our priority.' }].map((item) => <div key={item.title} className="rounded-2xl border border-[#E8E0D5] bg-white p-6 transition hover:border-[#D4A574]"><div className="mb-4 h-1 w-10 rounded-full bg-[#C4782A]" /><h3 className="mb-2 font-serif text-lg font-medium text-[#1A1916]">{item.title}</h3><p className="text-sm leading-relaxed text-[#5C574F]">{item.desc}</p></div>)}</div></div></section>

            <section className="py-14 sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="mb-10 text-center"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#C4782A]">Stories</p><h2 className="font-serif text-2xl font-medium text-[#1A1916] sm:text-3xl">Happy couples</h2><p className="mt-1 text-sm text-[#5C574F]">Stories of successful matches made on Kashtiya</p></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[{ names: 'Rahul & Priya', date: 'Married Dec 2024', story: 'Found each other through shared values and family background.' }, { names: 'Amit & Sneha', date: 'Married Mar 2025', story: 'The perfect match in education, culture and life goals.' }, { names: 'Vikram & Ananya', date: 'Married Jan 2025', story: 'Connected over common interests and traditional values.' }].map((couple) => <div key={couple.names} className="rounded-2xl border border-[#E8E0D5] bg-white p-5 shadow-sm"><div className="mb-3 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C4782A]/10 text-[#C4782A]">♥</div><div><p className="font-semibold text-[#1A1916]">{couple.names}</p><p className="text-xs text-[#A39E96]">{couple.date}</p></div></div><p className="text-sm italic leading-relaxed text-[#5C574F]">"{couple.story}"</p></div>)}</div></div></section>

            <section className="bg-[#1A1916] py-10"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">{[{ value: '100%', label: 'ID-verified members' }, { value: '18mo', label: 'Avg. to engagement' }, { value: '40+', label: 'Screening checks' }, { value: '2.4L+', label: 'Verified profiles' }].map((stat) => <div key={stat.label}><p className="font-serif text-2xl font-medium text-[#C4782A] sm:text-3xl">{stat.value}</p><p className="mt-1 text-xs text-[#A39E96] sm:text-sm">{stat.label}</p></div>)}</div></div></section>


            <footer className="bg-[#1A1916] text-[#A39E96]"><div className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-4"><div className="col-span-2 md:col-span-1"><div className="mb-4 flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C4782A] text-sm font-bold text-white">K</div><span className="text-lg font-semibold text-white">Kashtiya Matrimony</span></div><p className="text-sm leading-relaxed">Helping people find meaningful life partners with trust, privacy and genuine intent for marriage.</p></div><div><h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Browse By</h4><ul className="space-y-2 text-sm">{['Religion', 'Caste', 'Mother Tongue', 'City', 'Occupation', 'NRI'].map((item) => <li key={item}><a href="#" className="transition hover:text-[#C4782A]">{item}</a></li>)}</ul></div><div><h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Company</h4><ul className="space-y-2 text-sm">{['About Us', 'Contact', 'Careers', 'Success Stories', 'Blog'].map((item) => <li key={item}><a href="#" className="transition hover:text-[#C4782A]">{item}</a></li>)}</ul></div><div><h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Help & Legal</h4><ul className="space-y-2 text-sm">{['Help Center', 'Terms of Use', 'Privacy Policy', 'Safety Tips', 'Report Abuse'].map((item) => <li key={item}><a href="#" className="transition hover:text-[#C4782A]">{item}</a></li>)}</ul></div></div><div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row"><p>© {new Date().getFullYear()} Kashtiya Matrimony. All rights reserved.</p><p className="text-center sm:text-right">This platform is intended only for users with genuine intent for marriage.</p></div></div></footer>
        </div>
    )
}
