import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/login'
import { registerUser } from '../api/register'
import { useAuth } from '../contex/AuthContex.jsx'
import getProfiles from '../api/getProfiles'
import mission_img2 from '../assets/mission_img2.jpg'

const profileSteps = [
  {
    title: 'Step 1: Age',
    subtitle: 'How old are you?',
  },
  {
    title: 'Step 2: City & State',
    subtitle: 'Where are you based?',
  },
  {
    title: 'Step 3: Education & Occupation',
    subtitle: 'Tell us about your background',
  },
  {
    title: 'Step 4: Marital Status',
    subtitle: 'Choose your current status',
  },
]

export default function AuthPage({ setIsAuthenticated, initialMode = 'login' }) {
  const navigate = useNavigate()
  const { setUser, setUsers } = useAuth()
  const [isLogin, setIsLogin] = useState(initialMode !== 'register')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showProfileSetup, setShowProfileSetup] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [loginData, setLoginData] = useState({ email: '', password: '', remember: false })
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    religion: '',
    terms: false,
  })
  const [profileData, setProfileData] = useState({
    age: '',
    city: '',
    state: '',
    education: '',
    occupation: '',
    maritalStatus: '',
  })

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const response = await loginUser(loginData.email, loginData.password)
    console.log('Login response:', response);
    if (response.success === true) {
      setUser(response.user)
      // setIsAuthenticated(true)
      const profilesResponse = await getProfiles()
      if (Array.isArray(profilesResponse)) {
        setUsers(profilesResponse)
      }
      navigate('/home')
    } else {
      alert(response.message)
    }
  }

  const validateProfileStep = () => {
    if (currentStep === 0) {
      if (!profileData.age || Number(profileData.age) < 18) {
        alert('Please enter a valid age above 17.')
        return false
      }
    }

    if (currentStep === 1) {
      if (!profileData.city.trim() || !profileData.state.trim()) {
        alert('Please enter both city and state.')
        return false
      }
    }

    if (currentStep === 2) {
      if (!profileData.education.trim() || !profileData.occupation.trim()) {
        alert('Please fill in both education and occupation.')
        return false
      }
    }

    if (currentStep === 3 && !profileData.maritalStatus) {
      alert('Please select your marital status.')
      return false
    }

    return true
  }

  const handleInitialRegisterSubmit = (e) => {
    e.preventDefault()

    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    if (registerData.password.length < 6) {
      alert('Password must be at least 6 characters long.')
      return
    }

    setShowProfileSetup(true)
    setCurrentStep(0)
  }

  const handleProfileSubmit = async () => {
    if (!validateProfileStep()) return

    if (currentStep < profileSteps.length - 1) {
      setCurrentStep((step) => step + 1)
      return
    }

    setIsSubmitting(true)

    const finalData = {
      ...registerData,
      age: Number(profileData.age),
      city: profileData.city.trim(),
      state: profileData.state.trim(),
      location: [profileData.city.trim(), profileData.state.trim()].filter(Boolean).join(', '),
      education: profileData.education.trim(),
      occupation: profileData.occupation.trim(),
      maritalStatus: profileData.maritalStatus,
    }

    const response = await registerUser(finalData)

    if (response.success === true) {
      setUser(response.user)
      setIsAuthenticated(true)
      navigate('/home')
    }

    alert(response.message || 'Registration failed')
    setIsSubmitting(false)
  }

  const inputClass =
    'w-full pl-11 pr-4 py-3 rounded-xl text-sm text-[#2C2A26] placeholder-[#A39E96] bg-[#FFF8F8] border border-[#FECDD3] focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/20 focus:outline-none transition-all duration-200'

  const selectClass =
    'w-full px-4 py-3 rounded-xl text-sm text-[#2C2A26] bg-[#FFF8F8] border border-[#FECDD3] focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/20 focus:outline-none transition-all duration-200'

  const renderProfileStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-2">
            <label className="mb-1.5 block text-sm font-medium text-[#2C2A26]">Age</label>
            <input
              type="number"
              min="18"
              max="100"
              required
              value={profileData.age}
              onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
              className={inputClass.replace('pl-11 pr-4', 'px-4')}
              placeholder="Enter your age"
            />
          </div>
        )
      case 1:
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#2C2A26]">City</label>
              <input
                type="text"
                required
                value={profileData.city}
                onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                className={selectClass}
                placeholder="City"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#2C2A26]">State</label>
              <input
                type="text"
                required
                value={profileData.state}
                onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                className={selectClass}
                placeholder="State"
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#2C2A26]">Education</label>
              <input
                type="text"
                required
                value={profileData.education}
                onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                className={selectClass}
                placeholder="e.g. B.Tech"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#2C2A26]">Occupation</label>
              <input
                type="text"
                required
                value={profileData.occupation}
                onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                className={selectClass}
                placeholder="e.g. Software Engineer"
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#2C2A26]">Marital Status</label>
            <select
              required
              value={profileData.maritalStatus}
              onChange={(e) => setProfileData({ ...profileData, maritalStatus: e.target.value })}
              className={selectClass}
            >
              <option value="">Select marital status</option>
              <option value="Never married">Never married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
              <option value="Separated">Separated</option>
            </select>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#FFF5F5] font-sans text-[#2C2A26] antialiased"
      style={{
        backgroundImage: mission_img2,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-[#FFF5F5]/70 backdrop-blur-[1px]" />
      <div className="relative z-10 flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#B91C1C]">
              Kashtiya Matrimony
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1C1917]">
              {isLogin ? 'Welcome back' : showProfileSetup ? 'Complete your profile' : 'Create account'}
            </h1>
            <p className="mt-2 text-sm text-[#5C574F]">
              {isLogin
                ? 'Sign in to continue your journey'
                : showProfileSetup
                  ? 'Finish a few details to personalize your profile'
                  : 'Join and find your life partner with intention'}
            </p>
          </div>

          <div className="rounded-3xl border border-[#FECDD3] bg-[#FFF8F8] p-6 sm:p-8 shadow-sm">
            {!isLogin && !showProfileSetup && (
              <div className="mb-7 flex rounded-xl border border-[#FECDD3] bg-white p-1">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isLogin ? 'bg-[#B91C1C] text-white shadow-sm' : 'text-[#5C574F] hover:text-[#1C1917]'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
                    !isLogin ? 'bg-[#B91C1C] text-white shadow-sm' : 'text-[#5C574F] hover:text-[#1C1917]'
                  }`}
                >
                  Register
                </button>
              </div>
            )}

            {isLogin ? (
              <form className="space-y-5" onSubmit={handleLoginSubmit}>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#2C2A26]">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#A39E96]">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-sm font-medium text-[#2C2A26]">Password</label>
                    <a href="#" className="text-xs text-[#B91C1C] hover:text-[#991B1B] transition">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#A39E96]">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className={`${inputClass} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#A39E96] hover:text-[#5C574F]"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={loginData.remember}
                    onChange={(e) => setLoginData({ ...loginData, remember: e.target.checked })}
                    className="h-4 w-4 cursor-pointer rounded accent-[#B91C1C]"
                  />
                  <label htmlFor="remember" className="cursor-pointer text-sm text-[#5C574F]">
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#B91C1C] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#991B1B] hover:shadow-md active:scale-[0.98]"
                >
                  Sign In
                </button>
              </form>
            ) : showProfileSetup ? (
              <div className="space-y-5">
                <div>
                  <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[#A39E96]">
                    <span>Profile setup</span>
                    <span>
                      {currentStep + 1}/{profileSteps.length}
                    </span>
                  </div>
                  <div className="mb-5 h-2 w-full rounded-full bg-[#EEE5DA]">
                    <div
                      className="h-2 rounded-full bg-[#B91C1C] transition-all duration-200"
                      style={{ width: `${((currentStep + 1) / profileSteps.length) * 100}%` }}
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-[#1C1917]">{profileSteps[currentStep].title}</h2>
                  <p className="mt-1 text-sm text-[#5C574F]">{profileSteps[currentStep].subtitle}</p>
                </div>

                {renderProfileStep()}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}
                    disabled={currentStep === 0}
                    className="flex-1 rounded-xl border border-[#FECDD3] bg-white py-3 text-sm font-semibold text-[#2C2A26] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleProfileSubmit}
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl bg-[#B91C1C] py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#991B1B] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? 'Saving...' : currentStep === profileSteps.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleInitialRegisterSubmit}>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#2C2A26]">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#A39E96]">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#2C2A26]">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#A39E96]">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#2C2A26]">Gender</label>
                    <select
                      required
                      value={registerData.gender}
                      onChange={(e) => setRegisterData({ ...registerData, gender: e.target.value })}
                      className={selectClass}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#2C2A26]">Religion</label>
                    <select
                      required
                      value={registerData.religion}
                      onChange={(e) => setRegisterData({ ...registerData, religion: e.target.value })}
                      className={selectClass}
                    >
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

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#2C2A26]">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#A39E96]">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      minLength={6}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className={`${inputClass} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#A39E96] hover:text-[#5C574F]"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#2C2A26]">Confirm Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#A39E96]">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      minLength={6}
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className={`${inputClass} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#A39E96] hover:text-[#5C574F]"
                    >
                      {showConfirmPassword ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={registerData.terms}
                    onChange={(e) => setRegisterData({ ...registerData, terms: e.target.checked })}
                    className="mt-0.5 h-4 w-4 cursor-pointer rounded accent-[#B91C1C]"
                  />
                  <label htmlFor="terms" className="cursor-pointer text-sm text-[#5C574F]">
                    I agree to the{' '}
                    <a href="#" className="text-[#B91C1C] hover:text-[#991B1B]">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-[#B91C1C] hover:text-[#991B1B]">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#B91C1C] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#991B1B] hover:shadow-md active:scale-[0.98]"
                >
                  Continue profile setup
                </button>
              </form>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-[#A39E96]">
            By continuing, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
