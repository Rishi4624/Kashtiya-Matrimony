import React, { useState } from 'react'

export const EMPTY_FILTERS = {
    minAge: '',
    maxAge: '',
    minHeight: '',
    maxHeight: '',
    city: '',
    community: '',
    education: '',
    diet: '',
    profession: '',
    maritalStatus: '',
    religion: '',
    occupation: '',
    minIncome: '',
    maxIncome: '',
    smoking: '',
    drinking: '',
    hobbies: [],
}

export const FILTER_OPTIONS = {
    age: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 35, 38, 40, 45, 50, 55, 60],
    height: ['4\'6"', '4\'8"', '4\'10"', '5\'0"', '5\'1"', '5\'2"', '5\'3"', '5\'4"', '5\'5"', '5\'6"', '5\'7"', '5\'8"', '5\'9"', '5\'10"', '5\'11"', '6\'0"', '6\'1"', '6\'2"', '6\'3"', '6\'4"'],
    religion: ['Hinduism', 'Islam', 'Christianity', 'Sikhism', 'Buddhism', 'Jainism', 'Other'],
    community: ['Brahmin', 'Kshatriya', 'Vaishya', 'Kayastha', 'Rajput', 'Maratha', 'Jat', 'Patel', 'Nair', 'Iyer', 'Iyengar', 'Pillai', 'Naidu', 'Reddy', 'Other'],
    maritalStatus: ['Never married', 'Divorced', 'Widowed', 'Separated'],
    education: ['High School', 'Diploma', 'B.A.', 'B.Sc.', 'B.Com.', 'B.Tech / B.E.', 'BBA', 'BCA', 'M.A.', 'M.Sc.', 'M.Com.', 'M.Tech / M.E.', 'MBA', 'MCA', 'MBBS', 'MD / MS', 'LLB', 'CA', 'PhD', 'Other'],
    diet: ['Vegetarian', 'Non-vegetarian', 'Eggetarian', 'Vegan', 'Other'],
    profession: ['Private Sector', 'Government / PSU', 'Defence / Civil Services', 'Business / Self-employed', 'Freelancer', 'Student', 'Not Working', 'Other'],
    occupation: ['Software Engineer', 'Doctor', 'Teacher', 'Lawyer', 'Accountant', 'Engineer', 'Nurse', 'Architect', 'Designer', 'Banker', 'Entrepreneur', 'Civil Servant', 'Police / Army', 'Scientist', 'Other'],
    income: ['Below ₹2 LPA', '₹2–5 LPA', '₹5–10 LPA', '₹10–15 LPA', '₹15–25 LPA', '₹25–50 LPA', 'Above ₹50 LPA'],
    smoking: ['Never', 'Occasionally', 'Regularly'],
    drinking: ['Never', 'Occasionally', 'Regularly'],
    hobbies: ['Reading', 'Travelling', 'Cooking', 'Music', 'Sports', 'Fitness / Gym', 'Dancing', 'Painting', 'Photography', 'Gaming', 'Yoga / Meditation', 'Gardening', 'Movies', 'Writing', 'Swimming'],
}

export const heightToInches = (h) => {
    if (!h) return null
    const match = String(h).match(/(\d+)'(\d+)"/)
    if (match) return parseInt(match[1]) * 12 + parseInt(match[2])
    return parseFloat(h) || null
}

export const incomeOrder = {
    'Below ₹2 LPA': 0, '₹2–5 LPA': 1, '₹5–10 LPA': 2,
    '₹10–15 LPA': 3, '₹15–25 LPA': 4, '₹25–50 LPA': 5, 'Above ₹50 LPA': 6,
}

export const normalizeIncome = (val) => {
    if (!val) return null
    const lower = String(val).toLowerCase()
    if (lower.includes('below') || lower.includes('< 2')) return 'Below ₹2 LPA'
    if (lower.includes('2') && lower.includes('5')) return '₹2–5 LPA'
    if (lower.includes('5') && lower.includes('10')) return '₹5–10 LPA'
    if (lower.includes('10') && lower.includes('15')) return '₹10–15 LPA'
    if (lower.includes('15') && lower.includes('25')) return '₹15–25 LPA'
    if (lower.includes('25') && lower.includes('50')) return '₹25–50 LPA'
    if (lower.includes('above') || lower.includes('50')) return 'Above ₹50 LPA'
    return null
}

// ── Chip pill ─────────────────────────────────────────────────────────────────
function Chip({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`
                rounded-full px-3 py-1 text-xs font-medium transition-all duration-200
                ${active
                    ? 'bg-[#B91C1C] text-white shadow-sm shadow-[#B91C1C]/30 scale-105'
                    : 'bg-white/70 text-[#5C574F] border border-[#FECDD3] hover:border-[#B91C1C]/50 hover:text-[#B91C1C] hover:bg-[#FFF1F1]'
                }
            `}
        >
            {label}
        </button>
    )
}

// ── Accordion section ──────────────────────────────────────────────────────────
function Section({ label, hasValue, valueLabel, open, onToggle, children }) {
    return (
        <div className={`mx-3 mb-1.5 overflow-hidden rounded-2xl transition-all duration-200 ${open ? 'bg-[#FFF1F1]/60' : 'bg-white/50 hover:bg-white/80'}`}>
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left"
            >
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#1C1917]">{label}</span>
                    {hasValue && !open && (
                        <span className="rounded-full bg-[#B91C1C]/10 px-2 py-0.5 text-[10px] font-semibold text-[#B91C1C] max-w-[100px] truncate">
                            {valueLabel}
                        </span>
                    )}
                </div>
                <svg
                    className={`h-4 w-4 text-[#A39E96] transition-transform duration-300 ${open ? 'rotate-180 text-[#B91C1C]' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Animated expand */}
            <div
                style={{
                    maxHeight: open ? '600px' : '0px',
                    opacity: open ? 1 : 0,
                    transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
                    overflow: 'hidden',
                }}
            >
                <div className="px-4 pb-4 pt-0">
                    {children}
                </div>
            </div>
        </div>
    )
}

// ── Chip group ─────────────────────────────────────────────────────────────────
function ChipGroup({ options, selected, onSelect, isMulti = false }) {
    const isActive = (opt) => isMulti
        ? (selected || []).includes(String(opt))
        : String(selected) === String(opt)

    return (
        <div className="flex flex-wrap gap-1.5">
            {!isMulti && (
                <Chip label="Any" active={!selected} onClick={() => onSelect('')} />
            )}
            {options.map(opt => (
                <Chip
                    key={opt}
                    label={String(opt)}
                    active={isActive(opt)}
                    onClick={() => onSelect(String(opt))}
                />
            ))}
        </div>
    )
}

// ── SelectFilter ───────────────────────────────────────────────────────────────
function SelectFilter({ label, name, options, filters, onFilterChange, openSection, onToggleSection }) {
    return (
        <Section
            label={label}
            hasValue={Boolean(filters[name])}
            valueLabel={filters[name]}
            open={openSection === name}
            onToggle={() => onToggleSection(name)}
        >
            <ChipGroup
                options={options}
                selected={filters[name]}
                onSelect={(val) => onFilterChange(name, filters[name] === val ? '' : val)}
            />
        </Section>
    )
}

// ── RangeFilter ────────────────────────────────────────────────────────────────
function RangeFilter({ label, name, minKey, maxKey, options, filters, onFilterChange, openSection, onToggleSection }) {
    const min = filters[minKey]
    const max = filters[maxKey]
    const valueLabel = min && max ? `${min} – ${max}` : min ? `From ${min}` : max ? `Up to ${max}` : ''

    return (
        <Section
            label={label}
            hasValue={Boolean(min || max)}
            valueLabel={valueLabel}
            open={openSection === name}
            onToggle={() => onToggleSection(name)}
        >
            <div className="space-y-3">
                {['Min', 'Max'].map((type) => {
                    const key = type === 'Min' ? minKey : maxKey
                    return (
                        <div key={type}>
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#A39E96]">{type}</p>
                            <div className="flex flex-wrap gap-1.5">
                                <Chip label="Any" active={!filters[key]} onClick={() => onFilterChange(key, '')} />
                                {options.map(opt => (
                                    <Chip
                                        key={opt}
                                        label={String(opt)}
                                        active={String(opt) === filters[key]}
                                        onClick={() => onFilterChange(key, String(opt) === filters[key] ? '' : String(opt))}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Section>
    )
}

// ── CityFilter ─────────────────────────────────────────────────────────────────
function CityFilter({ filters, onFilterChange, openSection, onToggleSection }) {
    return (
        <Section
            label="City"
            hasValue={Boolean(filters.city)}
            valueLabel={filters.city}
            open={openSection === 'city'}
            onToggle={() => onToggleSection('city')}
        >
            <input
                value={filters.city}
                onChange={e => onFilterChange('city', e.target.value)}
                placeholder="e.g. Mumbai, Delhi, Pune..."
                className="w-full rounded-xl border border-[#FECDD3] bg-white px-3.5 py-2.5 text-sm text-[#2C2A26] placeholder-[#C4BAB0] focus:border-[#B91C1C] focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/20 transition-all"
            />
        </Section>
    )
}

// ── HobbiesFilter ──────────────────────────────────────────────────────────────
function HobbiesFilter({ filters, onToggleHobby, openSection, onToggleSection }) {
    const count = filters.hobbies.length
    return (
        <Section
            label="Hobbies"
            hasValue={count > 0}
            valueLabel={`${count} selected`}
            open={openSection === 'hobbies'}
            onToggle={() => onToggleSection('hobbies')}
        >
            <div className="flex flex-wrap gap-1.5">
                {FILTER_OPTIONS.hobbies.map(hobby => (
                    <Chip
                        key={hobby}
                        label={hobby}
                        active={filters.hobbies.includes(hobby)}
                        onClick={() => onToggleHobby(hobby)}
                    />
                ))}
            </div>
        </Section>
    )
}

// ── Main exported component ────────────────────────────────────────────────────
export default function FilterSidebar({ filters, onFilterChange, onToggleHobby, onApply, onClear, filteredCount, totalCount, activeFilterCount, onClose }) {
    const [openSection, setOpenSection] = useState(null)
    const handleToggleSection = (key) => setOpenSection(prev => prev === key ? null : key)
    const sharedProps = { filters, onFilterChange, openSection, onToggleSection: handleToggleSection }

    return (
        <aside className="flex h-full flex-col" style={{ background: 'linear-gradient(160deg, #FFF8F8 0%, #FFF0F0 100%)' }}>

            {/* ── Gradient header ── */}
            <div className="shrink-0 px-5 pt-6 pb-4" style={{ background: '#7B0A1A' }}>
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-tight">Filters</h2>
                        <p className="mt-0.5 text-xs text-white/75">
                            {filteredCount} of {totalCount} profiles match  
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 active:scale-95"
                        title="Close"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Active filter pills */}
                {activeFilterCount > 0 && (
                    <div className="mt-3 flex items-center justify-between">
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                            {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                        </span>
                        <button
                            onClick={onClear}
                            className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/30"
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </div>

            {/* ── Scrollable filter list ── */}
            <div className="flex-1 overflow-y-auto py-3 scrollbar-thin">
                <RangeFilter label="Age" name="age" minKey="minAge" maxKey="maxAge" options={FILTER_OPTIONS.age} {...sharedProps} />
                <RangeFilter label="Height" name="height" minKey="minHeight" maxKey="maxHeight" options={FILTER_OPTIONS.height} {...sharedProps} />
                <CityFilter {...sharedProps} />
                <SelectFilter label="Community / Caste" name="community" options={FILTER_OPTIONS.community} {...sharedProps} />
                <SelectFilter label="Religion" name="religion" options={FILTER_OPTIONS.religion} {...sharedProps} />
                <SelectFilter label="Marital Status" name="maritalStatus" options={FILTER_OPTIONS.maritalStatus} {...sharedProps} />
                <SelectFilter label="Education" name="education" options={FILTER_OPTIONS.education} {...sharedProps} />
                <SelectFilter label="Diet" name="diet" options={FILTER_OPTIONS.diet} {...sharedProps} />
                <SelectFilter label="Profession Type" name="profession" options={FILTER_OPTIONS.profession} {...sharedProps} />
                <SelectFilter label="Occupation" name="occupation" options={FILTER_OPTIONS.occupation} {...sharedProps} />
                <RangeFilter label="Annual Income" name="income" minKey="minIncome" maxKey="maxIncome" options={FILTER_OPTIONS.income} {...sharedProps} />
                <SelectFilter label="Smoking" name="smoking" options={FILTER_OPTIONS.smoking} {...sharedProps} />
                <SelectFilter label="Drinking" name="drinking" options={FILTER_OPTIONS.drinking} {...sharedProps} />
                <HobbiesFilter filters={filters} onToggleHobby={onToggleHobby} openSection={openSection} onToggleSection={handleToggleSection} />
            </div>

            {/* ── Apply button ── */}
            <div className="shrink-0 p-4">
                <button
                    onClick={onApply}
                    className="w-full rounded-2xl py-3.5 text-sm font-bold text-white shadow-lg shadow-[#B91C1C]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#B91C1C]/40 active:scale-[0.98]"
                    style={{ background: '#841423ff' }}
                >
                    Show {filteredCount} Profiles
                </button>
            </div>
        </aside>
    )
}
