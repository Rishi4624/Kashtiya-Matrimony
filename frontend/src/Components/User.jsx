import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contex/AuthContex.jsx'
import updateUser from '../api/updateUser.js'
import { upload_image } from '../api/upload-image.js'
import { upload_post } from '../api/upload-post.js'
import acceptInterest from '../api/acceptInterest.js'

export default function User() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [previewAvatar, setPreviewAvatar] = useState(null)
  const [hobbyInput, setHobbyInput] = useState('')
  const [interestInput, setInterestInput] = useState('')
  const [activeTab, setActiveTab] = useState('posts')
  const [acceptingUserId, setAcceptingUserId] = useState(null)

  const avatarInputRef = useRef(null)
  const postsInputRef = useRef(null)

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        avatar: user.avatar || user.image || user.profilePic || '',
        posts: user.posts || [],
        hobbies: user.hobbies || [],
        interests: user.interests || [],
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        location: user.location || '',
        age: user.age || '',
        likes: user.likes || user.like || [],
      })
    }
  }, [user])

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F3EE]">
        <div className="text-center">
          <p className="mb-4 text-lg text-[#5C574F]">Please log in to view your profile</p>
          <button
            onClick={() => navigate('/login')}
            className="rounded-xl bg-[#C4782A] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#A8651F]"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const handleEdit = () => {
    setFormData({
      ...user,
      avatar: user.avatar || user.image || '',
      hobbies: [...(user.hobbies || [])],
      interests: [...(user.interests || [])],
      posts: [...(user.posts || [])],
      likes: [...(user.likes || user.like || [])],
    })
    setPreviewAvatar(null)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setPreviewAvatar(null)
    setHobbyInput('')
    setInterestInput('')
  }

  const handleSave = async () => {
    const { likes, like, ...profileData } = formData
    const updatedUser = {
      ...profileData,
      avatar: previewAvatar || profileData.avatar,
      image: previewAvatar || profileData.avatar,
    }

    const response = await updateUser(updatedUser)
    if (!response.success) {
      alert(response.message || 'Unable to update profile')
      return
    }
    alert(response.message)
    setUser(updatedUser)
    setIsEditing(false)
    setPreviewAvatar(null)
    setHobbyInput('')
    setInterestInput('')
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    try {
      if (file) {
        const reader = new FileReader()
        reader.onloadend = async () => {
          setPreviewAvatar(reader.result)
          const response = await upload_image(file)
          if (response.success && response.imageUrl) {
            setPreviewAvatar(response.imageUrl)
            setFormData((prev) => ({
              ...prev,
              avatar: response.imageUrl,
              image: response.imageUrl,
            }))
          }
        }
        reader.readAsDataURL(file)
      }
    } catch {
      alert('Server error')
    }
  }

  const handlePostsUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    for (const file of files) {
      const response = await upload_post(file)
      if (response.success && response.imageUrl) {
        setFormData((prev) => ({
          ...prev,
          posts: [...(prev.posts || []), response.imageUrl],
        }))
      }
    }
    e.target.value = ''
  }

  const removePost = (index) => {
    setFormData((prev) => ({
      ...prev,
      posts: (prev.posts || []).filter((_, i) => i !== index),
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addHobby = () => {
    if (hobbyInput.trim() && !(formData.hobbies || []).includes(hobbyInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        hobbies: [...(prev.hobbies || []), hobbyInput.trim()],
      }))
      setHobbyInput('')
    }
  }

  const removeHobby = (hobby) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: (prev.hobbies || []).filter((h) => h !== hobby),
    }))
  }

  const addInterest = () => {
    if (interestInput.trim() && !(formData.interests || []).includes(interestInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        interests: [...(prev.interests || []), interestInput.trim()],
      }))
      setInterestInput('')
    }
  }

  const removeInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: (prev.interests || []).filter((i) => i !== interest),
    }))
  }

  const isMutualLike = (likedUser) => {
    const currentUserId = String(user._id || user.id)
    return (likedUser.likes || []).some((likeId) => String(likeId?._id || likeId) === currentUserId)
  }

  const hasChatAccess = (likedUser) => {
    const likedUserId = String(likedUser?._id || likedUser?.id)
    return (
      (user.acceptedChats || []).some(
        (acceptedUser) => String(acceptedUser?._id || acceptedUser) === likedUserId
      ) || isMutualLike(likedUser)
    )
  }

  const handleAcceptInterest = async (likedUser) => {
    const likedUserId = likedUser?._id || likedUser?.id
    if (!likedUserId) return

    setAcceptingUserId(likedUserId)
    const response = await acceptInterest(likedUserId)
    setAcceptingUserId(null)
    if (!response.success) {
      alert(response.message || 'Unable to accept interest')
      return
    }

    setUser((currentUser) => ({
      ...currentUser,
      acceptedChats: [...(currentUser.acceptedChats || []), likedUser],
    }))
  }

  const displayAvatar = previewAvatar || (isEditing ? formData.avatar : user.avatar || user.image)
  const displayPosts = isEditing ? formData.posts || [] : user.posts || []
  const displayLikes = isEditing ? formData.likes || [] : user.likes || user.like || []
  const displayInterests = isEditing ? formData.interests || [] : user.interests || []
  const displayHobbies = isEditing ? formData.hobbies || [] : user.hobbies || []

  const data = isEditing ? formData : user

  const detailGrid = [
    { label: 'Age', value: data.age ? `${data.age} years` : null },
    { label: 'Height', value: data.height },
    { label: 'City', value: data.location },
    { label: 'Community', value: data.religion },
    { label: 'Education', value: data.education },
    { label: 'Diet', value: data.diet },
    { label: 'Profession', value: data.occupation },
    { label: 'Languages', value: data.motherTongue },
    { label: 'Gender', value: data.gender },
    { label: 'Marital status', value: data.maritalStatus },
    { label: 'Income', value: data.income },
    { label: 'Smoking', value: data.smoking },
    { label: 'Drinking', value: data.drinking },
  ].filter((item) => item.value)

  const inputClass =
    'w-full rounded-xl border border-[#E8E0D5] bg-white px-3 py-2.5 text-sm text-[#2C2A26] focus:border-[#C4782A] focus:ring-2 focus:ring-[#C4782A]/20 outline-none'

  return (
    <div className="min-h-screen bg-[#F7F3EE]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Top bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#C4782A] transition hover:text-[#A8651F]"
          >
            ← Back
          </button>

          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="rounded-xl bg-[#C4782A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#A8651F]"
              >
                Edit profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="rounded-xl border border-[#E8E0D5] bg-white px-5 py-2.5 text-sm font-semibold text-[#5C574F] transition hover:border-[#C4782A]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="rounded-xl bg-[#C4782A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#A8651F]"
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>

        {/* ========== MAIN LAYOUT ========== */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* LEFT: PHOTO */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-[#E8E0D5] bg-[#FBF8F4] shadow-sm">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E0D5]">
                <img
                  src={displayAvatar || 'https://via.placeholder.com/600x750'}
                  alt={user.name}
                  className="h-full w-full object-cover object-top"
                />
                {isEditing && (
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#C4782A] text-white shadow-lg transition hover:bg-[#A8651F]"
                    title="Change photo"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                )}
                <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#A39E96]">
                <span>ID verified</span>
                <span>Photo visible to members</span>
              </div>
            </div>

            {/* Posts under photo */}
            <div className="mt-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A39E96]">
                  Photos ({displayPosts.length})
                </p>
                {(isEditing || true) && (
                  <button
                    onClick={() => postsInputRef.current?.click()}
                    className="text-xs font-medium text-[#C4782A] hover:text-[#A8651F]"
                  >
                    + Add
                  </button>
                )}
                <input ref={postsInputRef} type="file" accept="image/*" multiple onChange={handlePostsUpload} className="hidden" />
              </div>
              {displayPosts.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {displayPosts.map((post, index) => (
                    <div key={index} className="group relative aspect-square overflow-hidden rounded-xl border border-[#E8E0D5] bg-white">
                      <img src={post} alt={`Post ${index + 1}`} className="h-full w-full object-cover" />
                      {isEditing && (
                        <button
                          onClick={() => removePost(index)}
                          className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-0 shadow transition group-hover:opacity-100"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-[#E8E0D5] py-8 text-center text-sm text-[#A39E96]">
                  No photos yet
                </p>
              )}
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="lg:col-span-7">
            {isEditing ? (
              /* ===== EDIT FORM ===== */
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Full name</label>
                    <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Age</label>
                    <input type="number" name="age" value={formData.age || ''} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">City</label>
                    <input type="text" name="location" value={formData.location || ''} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Email</label>
                    <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Phone</label>
                    <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Gender</label>
                    <select name="gender" value={formData.gender || ''} onChange={handleChange} className={inputClass}>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Religion</label>
                    <select name="religion" value={formData.religion || ''} onChange={handleChange} className={inputClass}>
                      <option value="">Select</option>
                      <option>Hinduism</option>
                      <option>Christianity</option>
                      <option>Islam</option>
                      <option>Buddhism</option>
                      <option>Jainism</option>
                      <option>Sikhism</option>
                      <option>other</option>
                    </select>
                  </div>
                  {[
                    ['maritalStatus', 'Marital status', ['Never married', 'Divorced', 'Widowed', 'Separated']],
                    ['motherTongue', 'Mother tongue'],
                    ['education', 'Education'],
                    ['occupation', 'Occupation'],
                    ['income', 'Annual income'],
                    ['height', 'Height'],
                    ['diet', 'Diet', ['Vegetarian', 'Non-vegetarian', 'Eggetarian', 'Vegan', 'Other']],
                    ['smoking', 'Smoking', ['Never', 'Occasionally', 'Regularly']],
                    ['drinking', 'Drinking', ['Never', 'Occasionally', 'Regularly']],
                  ].map(([name, label, options]) => (
                    <div key={name}>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">{label}</label>
                      {options ? (
                        <select name={name} value={formData[name] || ''} onChange={handleChange} className={inputClass}>
                          <option value="">Select</option>
                          {options.map((o) => <option key={o}>{o}</option>)}
                        </select>
                      ) : (
                        <input type="text" name={name} value={formData[name] || ''} onChange={handleChange} className={inputClass} />
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Bio</label>
                  <textarea name="bio" value={formData.bio || ''} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Family details</label>
                  <textarea name="familyDetails" value={formData.familyDetails || ''} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} />
                </div>

                {/* Hobbies edit */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Hobbies</label>
                  <div className="mb-2 flex flex-wrap gap-2">
                    {displayHobbies.map((h) => (
                      <span key={h} className="inline-flex items-center gap-1 rounded-full border border-[#E8E0D5] bg-white px-3 py-1 text-sm text-[#5C574F]">
                        {h}
                        <button type="button" onClick={() => removeHobby(h)} className="text-[#A39E96] hover:text-red-500">×</button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={hobbyInput} onChange={(e) => setHobbyInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHobby())} placeholder="Add hobby..." className={inputClass} />
                    <button type="button" onClick={addHobby} className="shrink-0 rounded-xl bg-[#C4782A]/10 px-4 text-sm font-medium text-[#C4782A]">Add</button>
                  </div>
                </div>

                {/* Interests edit */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Interests</label>
                  <div className="mb-2 flex flex-wrap gap-2">
                    {displayInterests.map((i) => (
                      <span key={i} className="inline-flex items-center gap-1 rounded-full border border-[#E8E0D5] bg-white px-3 py-1 text-sm text-[#5C574F]">
                        {i}
                        <button type="button" onClick={() => removeInterest(i)} className="text-[#A39E96] hover:text-red-500">×</button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={interestInput} onChange={(e) => setInterestInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())} placeholder="Add interest..." className={inputClass} />
                    <button type="button" onClick={addInterest} className="shrink-0 rounded-xl bg-[#C4782A]/10 px-4 text-sm font-medium text-[#C4782A]">Add</button>
                  </div>
                </div>
              </div>
            ) : (
              /* ===== VIEW MODE (same as Profile) ===== */
              <>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#C4782A]">
                  {[user.religion, user.location].filter(Boolean).join(' · ') || 'My profile'}
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1916]">{user.name}</h1>
                <p className="mt-2 text-sm text-[#5C574F]">
                  {[user.age, user.occupation].filter(Boolean).join(' · ') || '—'}
                </p>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5C574F]">
                  {user.bio || 'No bio added yet.'}
                </p>

                {detailGrid.length > 0 && (
                  <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-[#E8E0D5] pt-6 sm:grid-cols-3">
                    {detailGrid.map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#A39E96]">{label}</p>
                        <p className="mt-1 text-sm font-medium text-[#1A1916]">{value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {(user.familyDetails || user.email || user.phone) && (
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {user.familyDetails && (
                      <div className="rounded-2xl border border-[#E8E0D5] bg-[#FBF8F4] p-4">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#A39E96]">Family</p>
                        <p className="text-sm leading-relaxed text-[#5C574F]">{user.familyDetails}</p>
                      </div>
                    )}
                    {(user.email || user.phone) && (
                      <div className="rounded-2xl border border-[#E8E0D5] bg-[#FBF8F4] p-4">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#A39E96]">Contact</p>
                        {user.email && <p className="text-sm text-[#5C574F]">{user.email}</p>}
                        {user.phone && <p className="mt-1 text-sm text-[#5C574F]">{user.phone}</p>}
                      </div>
                    )}
                  </div>
                )}

                {(displayHobbies.length > 0 || displayInterests.length > 0) && (
                  <div className="mt-8">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#A39E96]">Interests & hobbies</p>
                    <div className="flex flex-wrap gap-2">
                      {[...displayInterests, ...displayHobbies].map((item) => (
                        <span key={item} className="rounded-full border border-[#E8E0D5] bg-white px-3.5 py-1.5 text-sm text-[#5C574F]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Received interests (always visible below) */}
            {!isEditing && (
              <div className="mt-10 border-t border-[#E8E0D5] pt-8">
                <div className="mb-4 flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('posts')}
                    className={`text-sm font-medium transition ${activeTab === 'posts' ? 'text-[#C4782A]' : 'text-[#A39E96] hover:text-[#5C574F]'}`}
                  >
                    Photos
                  </button>
                  <span className="text-[#E8E0D5]">·</span>
                  <button
                    onClick={() => setActiveTab('likes')}
                    className={`text-sm font-medium transition ${activeTab === 'likes' ? 'text-[#C4782A]' : 'text-[#A39E96] hover:text-[#5C574F]'}`}
                  >
                    Received interests ({displayLikes.length})
                  </button>
                </div>

                {activeTab === 'likes' && (
                  displayLikes.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {displayLikes.map((likedUser, index) => {
                        const likedUserId = likedUser?._id || likedUser?.id
                        const likedUserName = likedUser?.name || 'User'
                        const likedUserLocation = likedUser?.location || 'Location unavailable'
                        const likedUserAvatar = likedUser?.avatar || likedUser?.image || likedUser?.profilePic

                        return (
                          <div key={likedUserId || index} className="flex items-center gap-3 rounded-2xl border border-[#E8E0D5] bg-white p-3">
                            <img src={likedUserAvatar || 'https://via.placeholder.com/96'} alt={likedUserName} className="h-12 w-12 rounded-full object-cover" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-[#1A1916]">{likedUserName}</p>
                              <p className="truncate text-xs text-[#A39E96]">{likedUserLocation}</p>
                            </div>
                            {hasChatAccess(likedUser) ? (
                              <button
                                type="button"
                                onClick={() => navigate(`/chat/${likedUserId}`, { state: { user: likedUser } })}
                                className="shrink-0 rounded-xl bg-[#C4782A] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#A8651F]"
                              >
                                Open chat
                              </button>
                            ) : (
                              <button
                                type="button"
                                disabled={acceptingUserId === likedUserId}
                                onClick={() => handleAcceptInterest(likedUser)}
                                className="shrink-0 rounded-xl bg-[#C4782A] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#A8651F] disabled:opacity-60"
                              >
                                {acceptingUserId === likedUserId ? '...' : 'Accept'}
                              </button>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="rounded-2xl border border-dashed border-[#E8E0D5] py-10 text-center text-sm text-[#A39E96]">
                      No one has shown interest yet
                    </p>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}