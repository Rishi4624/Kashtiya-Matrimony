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
  const [activeTab, setActiveTab] = useState('posts') // "posts" | "likes"
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#1a1035] to-[#0f172a] text-white">
        <div className="text-center">
          <p className="text-slate-400 text-lg mb-4">Please log in to view your profile</p>
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 transition"
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
    } catch (error) {
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

    const acceptedUser = { ...likedUser, likes: [...(likedUser.likes || []), user._id || user.id] }
    setUser((currentUser) => ({
      ...currentUser,
      likes: [...(currentUser.likes || []).filter((item) => String(item?._id || item) !== String(likedUserId)), acceptedUser],
    }))
  }

  const displayAvatar = previewAvatar || (isEditing ? formData.avatar : user.avatar || user.image)
  const displayPosts = isEditing ? (formData.posts || []) : (user.posts || [])
  const displayLikes = isEditing ? (formData.likes || []) : (user.likes || user.like || [])
  const currentItems = activeTab === 'posts' ? displayPosts : displayLikes

  return (
    <div className="min-h-screen font-sans text-white antialiased relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a1035] to-[#0f172a] -z-20" />
      <div className="fixed top-[-120px] left-[-80px] w-96 h-96 bg-violet-700/30 rounded-full blur-[100px] -z-10" />
      <div className="fixed bottom-[-100px] right-[-60px] w-80 h-80 bg-pink-600/25 rounded-full blur-[100px] -z-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-violet-300 transition mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* ========== TOP: PROFILE INFO ========== */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl">
          {/* Edit / Save Buttons */}
          <div className="flex justify-end mb-6">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                           bg-gradient-to-r from-violet-500 to-pink-500 
                           hover:from-violet-600 hover:to-pink-600 
                           hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/40
                           active:translate-y-0 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm
                             bg-white/10 border border-white/15 text-slate-300
                             hover:bg-white/15 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                             bg-gradient-to-r from-violet-500 to-pink-500 
                             hover:from-violet-600 hover:to-pink-600 
                             hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/40
                             active:translate-y-0 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Avatar + Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={displayAvatar || 'https://via.placeholder.com/150'}
                alt={user.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-violet-500/30 shadow-xl shadow-violet-500/20"
              />
              {isEditing && (
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute bottom-1 right-1 w-10 h-10 rounded-full 
                             bg-gradient-to-br from-violet-500 to-pink-500 
                             flex items-center justify-center shadow-lg
                             hover:scale-110 transition-transform duration-300"
                  title="Upload profile picture"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              )}
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            {/* Details */}
            <div className="flex-1 text-center sm:text-left w-full">
              {!isEditing ? (
                <>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{user.name}</h1>
                  <p className="text-violet-300 text-sm mb-3 flex items-center justify-center sm:justify-start gap-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {user.location || 'Unknown'} · {user.age || '—'} yrs
                  </p>

                  <div className="flex justify-center sm:justify-start gap-8 mb-4">
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">{displayPosts.length}</p>
                      <p className="text-xs text-slate-400">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">{(user.hobbies || []).length}</p>
                      <p className="text-xs text-slate-400">Hobbies</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">{(user.interests || []).length}</p>
                      <p className="text-xs text-slate-400">Interests</p>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-4 max-w-lg">
                    {user.bio || 'No bio yet.'}
                  </p>

                  {(user.email || user.phone) && (
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-slate-400 mb-4">
                      {user.email && (
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {user.email}
                        </span>
                      )}
                      {user.phone && (
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {user.phone}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    {(user.hobbies || []).map((h) => (
                      <span key={h} className="px-3 py-1 text-xs font-medium rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/25">
                        {h}
                      </span>
                    ))}
                    {(user.interests || []).map((i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/25">
                        {i}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                /* ========== EDIT FORM ========== */
                <div className="space-y-4 text-left">
                  <div>
                    <label className="block text-sm font-medium text-violet-200 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl text-white text-sm bg-white/5 border border-white/10 focus:bg-white/10 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/30 focus:outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-violet-200 mb-1">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl text-white text-sm bg-white/5 border border-white/10 focus:bg-white/10 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/30 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-violet-200 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl text-white text-sm bg-white/5 border border-white/10 focus:bg-white/10 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/30 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-violet-200 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl text-white text-sm bg-white/5 border border-white/10 focus:bg-white/10 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/30 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-violet-200 mb-1">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl text-white text-sm bg-white/5 border border-white/10 focus:bg-white/10 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/30 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-violet-200 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio || ''}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl text-white text-sm resize-none bg-white/5 border border-white/10 focus:bg-white/10 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/30 focus:outline-none transition"
                    />
                  </div>

                  {/* Hobbies */}
                  <div>
                    <label className="block text-sm font-medium text-violet-200 mb-1">Hobbies</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(formData.hobbies || []).map((h) => (
                        <span key={h} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/25">
                          {h}
                          <button type="button" onClick={() => removeHobby(h)} className="hover:text-white">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={hobbyInput}
                        onChange={(e) => setHobbyInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHobby())}
                        placeholder="Add hobby..."
                        className="flex-1 px-3 py-2 rounded-xl text-white text-sm bg-white/5 border border-white/10 focus:border-violet-400/60 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={addHobby}
                        className="px-3 py-2 rounded-xl bg-violet-500/20 text-violet-300 text-sm border border-violet-500/30 hover:bg-violet-500/30"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-medium text-violet-200 mb-1">Interests</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(formData.interests || []).map((i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/25">
                          {i}
                          <button type="button" onClick={() => removeInterest(i)} className="hover:text-white">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={interestInput}
                        onChange={(e) => setInterestInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                        placeholder="Add interest..."
                        className="flex-1 px-3 py-2 rounded-xl text-white text-sm bg-white/5 border border-white/10 focus:border-violet-400/60 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={addInterest}
                        className="px-3 py-2 rounded-xl bg-pink-500/15 text-pink-300 text-sm border border-pink-500/30 hover:bg-pink-500/25"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========== BOTTOM: POSTS / LIKES GALLERY ========== */}
        <div>
          {/* Sliding Tabs + Add Photos */}
          <div className="flex items-center justify-between mb-5">
            {/* Sliding Segmented Control */}
            <div className="relative flex bg-white/5 border border-white/10 rounded-xl p-1">
              {/* Sliding indicator */}
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-violet-500/20 border border-violet-500/40 transition-all duration-300 ease-out ${
                  activeTab === 'posts' ? 'left-1' : 'left-[calc(50%+2px)]'
                }`}
              />

              <button
                onClick={() => setActiveTab('posts')}
                className={`relative z-10 flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  activeTab === 'posts' ? 'text-violet-200' : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Posts
                <span className="text-xs opacity-70">({displayPosts.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('likes')}
                className={`relative z-10 flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  activeTab === 'likes' ? 'text-violet-200' : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Likes
                <span className="text-xs opacity-70">({displayLikes.length})</span>
              </button>
            </div>

            {/* Add Photos (only on Posts tab + editing) */}
            {isEditing && activeTab === 'posts' && (
              <button
                onClick={() => postsInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                           bg-white/10 border border-white/15 text-violet-200
                           hover:bg-white/15 hover:border-violet-500/40 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Photos
              </button>
            )}

            <input
              ref={postsInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePostsUpload}
              className="hidden"
            />
          </div>

          {/* Grid */}
          {activeTab === 'likes' ? (
            displayLikes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {displayLikes.map((likedUser, index) => {
                  const likedUserId = likedUser?._id || likedUser?.id
                  const likedUserName = likedUser?.name || 'User'
                  const likedUserLocation = likedUser?.location || 'Location unavailable'
                  const likedUserAvatar = likedUser?.avatar || likedUser?.image || likedUser?.profilePic

                  return (
                    <div
                      key={likedUserId || index}
                      className="flex items-center gap-3 p-3 text-left bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-violet-400/40 transition-all duration-300"
                    >
                      <img
                        src={likedUserAvatar || 'https://via.placeholder.com/96'}
                        alt={likedUserName}
                        className="w-14 h-14 rounded-full object-cover border-2 border-violet-500/30"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-white">
                          {likedUserName}
                        </span>
                        <span className="block truncate text-xs text-violet-200/80">
                          {likedUserLocation}
                        </span>
                        {likedUser?.age && (
                          <span className="block text-xs text-slate-400">{likedUser.age} yrs</span>
                        )}
                      </span>
                      {isMutualLike(likedUser) ? (
                        <button type="button" onClick={() => navigate(`/chat/${likedUserId}`, { state: { user: likedUser } })} className="shrink-0 rounded-lg bg-violet-500 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-400">Open chat</button>
                      ) : (
                        <button type="button" disabled={acceptingUserId === likedUserId} onClick={() => handleAcceptInterest(likedUser)} className="shrink-0 rounded-lg bg-pink-500 px-3 py-2 text-xs font-semibold text-white hover:bg-pink-400 disabled:cursor-wait disabled:opacity-60">{acceptingUserId === likedUserId ? 'Accepting...' : 'Accept'}</button>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16 text-slate-500">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p className="text-sm">No one has shown interest yet</p>
              </div>
            )
          ) : currentItems.length > 0 ? (
            <div className="grid grid-cols-3 gap-1 sm:gap-2">
              {currentItems.map((item, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl group cursor-pointer"
                >
                  <img
                    src={item}
                    alt={`${activeTab === 'posts' ? 'Post' : 'Like'} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {isEditing && activeTab === 'posts' && (
                      <button
                        onClick={() => removePost(index)}
                        className="w-9 h-9 rounded-full bg-red-500/90 flex items-center justify-center hover:bg-red-600 transition shadow-lg"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm">
                {activeTab === 'posts' ? 'No posts yet' : 'No likes yet'}
              </p>
              {isEditing && activeTab === 'posts' && (
                <button
                  onClick={() => postsInputRef.current?.click()}
                  className="mt-3 text-violet-400 text-sm hover:text-violet-300 transition"
                >
                  Upload your first photo
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}