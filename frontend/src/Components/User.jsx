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
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F9]">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Please log in to view your profile</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[#E11D48] hover:bg-[#C9183B] transition"
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

  const profileDetails = [
    { label: 'Gender', value: user.gender },
    { label: 'Religion', value: user.religion },
    { label: 'Marital Status', value: user.maritalStatus },
    { label: 'Mother Tongue', value: user.motherTongue },
    { label: 'Education', value: user.education },
    { label: 'Occupation', value: user.occupation },
    { label: 'Annual Income', value: user.income },
    { label: 'Height', value: user.height },
    { label: 'Diet', value: user.diet },
    { label: 'Smoking', value: user.smoking },
    { label: 'Drinking', value: user.drinking },
  ].filter((item) => item.value)

  return (
    <div className="min-h-screen bg-[#FFF8F9]">
      {/* ========== COVER + HEADER ========== */}
      <div className="relative">
        {/* Cover */}
        <div className="h-48 sm:h-56 md:h-64 w-full bg-gradient-to-r from-[#E11D48] via-[#F43F5E] to-[#FB7185]" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-sm text-white backdrop-blur-sm hover:bg-black/50 transition"
        >
          ← Back
        </button>

        {/* Profile header content */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative -mt-16 sm:-mt-20 flex flex-col sm:flex-row sm:items-end gap-5 pb-6">
            {/* Avatar */}
            <div className="relative shrink-0 self-center sm:self-end">
              <img
                src={displayAvatar || 'https://via.placeholder.com/200'}
                alt={user.name}
                className="h-32 w-32 sm:h-40 sm:w-40 rounded-full object-cover border-4 border-white shadow-xl"
              />
              {isEditing && (
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#E11D48] text-white shadow-lg hover:bg-[#C9183B] transition"
                  title="Change photo"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              )}
              <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>

            {/* Name + meta + actions */}
            <div className="flex-1 text-center sm:text-left pb-1">
              {!isEditing ? (
                <>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.name}</h1>
                  <p className="mt-1 text-sm text-gray-600 flex items-center justify-center sm:justify-start gap-1.5">
                    <svg className="w-4 h-4 text-[#E11D48]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {user.location || 'Unknown'} · {user.age || '—'} yrs
                  </p>
                </>
              ) : (
                <div className="space-y-2 max-w-md mx-auto sm:mx-0">
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-lg font-semibold focus:border-[#E11D48] focus:ring-2 focus:ring-rose-200 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      name="age"
                      value={formData.age || ''}
                      onChange={handleChange}
                      placeholder="Age"
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#E11D48] outline-none"
                    />
                    <input
                      type="text"
                      name="location"
                      value={formData.location || ''}
                      onChange={handleChange}
                      placeholder="Location"
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#E11D48] outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex justify-center sm:justify-end gap-3 shrink-0">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 rounded-full bg-[#E11D48] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#C9183B] transition"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="rounded-full bg-[#E11D48] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#C9183B] transition"
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex justify-center sm:justify-start gap-8 border-b border-rose-100 pb-4 mb-6">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900">{displayPosts.length}</p>
              <p className="text-xs text-gray-500">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900">{(user.hobbies || []).length}</p>
              <p className="text-xs text-gray-500">Hobbies</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900">{(user.interests || []).length}</p>
              <p className="text-xs text-gray-500">Interests</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900">{displayLikes.length}</p>
              <p className="text-xs text-gray-500">Received</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        {isEditing ? (
          /* ========== EDIT MODE (full width form) ========== */
          <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">Edit Profile Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" name="email" value={formData.email || ''} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#E11D48] focus:ring-2 focus:ring-rose-200 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#E11D48] focus:ring-2 focus:ring-rose-200 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select name="gender" value={formData.gender || ''} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#E11D48] outline-none">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                <select name="religion" value={formData.religion || ''} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#E11D48] outline-none">
                  <option value="">Select religion</option>
                  <option>Hinduism</option>
                  <option>Christianity</option>
                  <option>Islam</option>
                  <option>Buddhism</option>
                  <option>Jainism</option>
                  <option>Sikhism</option>
                  <option>other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                ['maritalStatus', 'Marital status', ['Never married', 'Divorced', 'Widowed', 'Separated']],
                ['motherTongue', 'Mother tongue'],
                ['education', 'Education'],
                ['occupation', 'Occupation'],
                ['income', 'Annual income'],
                ['height', 'Height'],
              ].map(([name, label, options]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  {options ? (
                    <select name={name} value={formData[name] || ''} onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#E11D48] outline-none">
                      <option value="">Select</option>
                      {options.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type="text" name={name} value={formData[name] || ''} onChange={handleChange}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#E11D48] outline-none" />
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                ['diet', 'Diet', ['Vegetarian', 'Non-vegetarian', 'Eggetarian', 'Vegan', 'Other']],
                ['smoking', 'Smoking', ['Never', 'Occasionally', 'Regularly']],
                ['drinking', 'Drinking', ['Never', 'Occasionally', 'Regularly']],
              ].map(([name, label, options]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <select name={name} value={formData[name] || ''} onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#E11D48] outline-none">
                    <option value="">Select</option>
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea name="bio" value={formData.bio || ''} onChange={handleChange} rows={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm resize-none focus:border-[#E11D48] outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Family details</label>
              <textarea name="familyDetails" value={formData.familyDetails || ''} onChange={handleChange} rows={3}
                placeholder="Tell matches about your family"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm resize-none focus:border-[#E11D48] outline-none" />
            </div>

            {/* Hobbies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hobbies</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(formData.hobbies || []).map((h) => (
                  <span key={h} className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-[#E11D48] border border-rose-100">
                    {h}
                    <button type="button" onClick={() => removeHobby(h)} className="hover:text-rose-900">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2 max-w-md">
                <input value={hobbyInput} onChange={(e) => setHobbyInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHobby())}
                  placeholder="Add hobby..." className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#E11D48] outline-none" />
                <button type="button" onClick={addHobby}
                  className="rounded-lg bg-rose-50 px-4 py-2 text-sm font-medium text-[#E11D48] border border-rose-200 hover:bg-rose-100">
                  Add
                </button>
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(formData.interests || []).map((i) => (
                  <span key={i} className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-700 border border-pink-100">
                    {i}
                    <button type="button" onClick={() => removeInterest(i)} className="hover:text-pink-900">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2 max-w-md">
                <input value={interestInput} onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                  placeholder="Add interest..." className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#E11D48] outline-none" />
                <button type="button" onClick={addInterest}
                  className="rounded-lg bg-pink-50 px-4 py-2 text-sm font-medium text-pink-700 border border-pink-200 hover:bg-pink-100">
                  Add
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ========== VIEW MODE (two-column layout) ========== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT COLUMN – About & Details */}
            <div className="lg:col-span-4 space-y-5">
              {/* About card */}
              <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-5">
                <h2 className="text-base font-semibold text-gray-900 mb-3">About</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {user.bio || 'No bio added yet.'}
                </p>

                {(user.email || user.phone) && (
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    {user.email && (
                      <div className="flex items-center gap-2">
                        <span className="text-[#E11D48]">✉</span>
                        <span className="truncate">{user.email}</span>
                      </div>
                    )}
                    {user.phone && (
                      <div className="flex items-center gap-2">
                        <span className="text-[#E11D48]">📞</span>
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Profile Details card */}
              {profileDetails.length > 0 && (
                <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-5">
                  <h2 className="text-base font-semibold text-gray-900 mb-4">Profile Details</h2>
                  <div className="space-y-3">
                    {profileDetails.map(({ label, value }) => (
                      <div key={label} className="flex justify-between gap-3 text-sm">
                        <span className="text-gray-500 shrink-0">{label}</span>
                        <span className="font-medium text-gray-800 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Family */}
              {user.familyDetails && (
                <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-5">
                  <h2 className="text-base font-semibold text-gray-900 mb-3">Family Details</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{user.familyDetails}</p>
                </div>
              )}

              {/* Hobbies & Interests */}
              <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-5">
                <h2 className="text-base font-semibold text-gray-900 mb-3">Hobbies & Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {(user.hobbies || []).map((h) => (
                    <span key={h} className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-[#E11D48] border border-rose-100">
                      {h}
                    </span>
                  ))}
                  {(user.interests || []).map((i) => (
                    <span key={i} className="rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-700 border border-pink-100">
                      {i}
                    </span>
                  ))}
                  {(user.hobbies || []).length === 0 && (user.interests || []).length === 0 && (
                    <p className="text-sm text-gray-400">None added yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN – Posts / Interests tabs */}
            <div className="lg:col-span-8">
              {/* Tabs */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex rounded-xl bg-white border border-rose-100 p-1 shadow-sm">
                  <button
                    onClick={() => setActiveTab('posts')}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                      activeTab === 'posts'
                        ? 'bg-[#E11D48] text-white shadow'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Posts ({displayPosts.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('likes')}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                      activeTab === 'likes'
                        ? 'bg-[#E11D48] text-white shadow'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Interests ({displayLikes.length})
                  </button>
                </div>

                {activeTab === 'posts' && (
                  <button
                    onClick={() => postsInputRef.current?.click()}
                    className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-[#E11D48] hover:text-[#E11D48] transition"
                  >
                    + Add Photos
                  </button>
                )}
                <input ref={postsInputRef} type="file" accept="image/*" multiple onChange={handlePostsUpload} className="hidden" />
              </div>

              {/* Tab content */}
              {activeTab === 'posts' ? (
                displayPosts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {displayPosts.map((item, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-xl border border-rose-100 group bg-white">
                        <img src={item} alt={`Post ${index + 1}`} className="h-full w-full object-cover transition group-hover:scale-105" />
                        {isEditing && (
                          <button
                            onClick={() => removePost(index)}
                            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition shadow"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-rose-200 bg-white py-20 text-gray-400">
                    <p className="text-sm">No posts yet</p>
                    <button onClick={() => postsInputRef.current?.click()} className="mt-3 text-sm font-medium text-[#E11D48] hover:underline">
                      Upload your first photo
                    </button>
                  </div>
                )
              ) : displayLikes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {displayLikes.map((likedUser, index) => {
                    const likedUserId = likedUser?._id || likedUser?.id
                    const likedUserName = likedUser?.name || 'User'
                    const likedUserLocation = likedUser?.location || 'Location unavailable'
                    const likedUserAvatar = likedUser?.avatar || likedUser?.image || likedUser?.profilePic

                    return (
                      <div
                        key={likedUserId || index}
                        className="flex items-center gap-3 rounded-xl border border-rose-100 bg-white p-3 hover:border-rose-200 hover:shadow-sm transition"
                      >
                        <img
                          src={likedUserAvatar || 'https://via.placeholder.com/96'}
                          alt={likedUserName}
                          className="h-14 w-14 rounded-full object-cover border-2 border-rose-100"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-gray-900">{likedUserName}</p>
                          <p className="truncate text-xs text-gray-500">{likedUserLocation}</p>
                          {likedUser?.age && <p className="text-xs text-gray-400">{likedUser.age} yrs</p>}
                        </div>
                        {hasChatAccess(likedUser) ? (
                          <button
                            type="button"
                            onClick={() => navigate(`/chat/${likedUserId}`, { state: { user: likedUser } })}
                            className="shrink-0 rounded-full bg-[#E11D48] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#C9183B]"
                          >
                            Open chat
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={acceptingUserId === likedUserId}
                            onClick={() => handleAcceptInterest(likedUser)}
                            className="shrink-0 rounded-full bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-600 disabled:opacity-60"
                          >
                            {acceptingUserId === likedUserId ? '...' : 'Accept'}
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-rose-200 bg-white py-20 text-gray-400">
                  <p className="text-sm">No one has shown interest yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}