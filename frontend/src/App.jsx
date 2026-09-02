import { StrictMode, useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios';
import Home from './Components/Home'
import AboutUs from './Components/AboutUs'
import Profile from './Components/Profile'
import AuthPage from './Components/AuthPage'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import User from './Components/User'
import ChatBoard from './Components/ChatBoard'
import ChatList from './Components/ChatList'
import Landing from './Components/LandingPage'
import PublicNavbar from './Components/PublicNavbar'
import PublicInfo from './Components/PublicInfo'
import RequestsPage from './Components/RequestsPage.jsx'
import { useAuth } from './contex/AuthContex.jsx'
import './App.css'

function App() {
  const navigate = useNavigate();
  const { users } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_AXIOS_API}/api/auth/me`, {
          withCredentials: true,
          validateStatus: (status) => status < 500,
        });

        if (response.status === 401 || response.data.success === false) {
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('app.jsx navigation error: ', error);
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  },[navigate])
  




  


  return (
    <>

      {isAuthenticated === null ? (
        <div className="min-h-screen bg-[#0a0a1a]" />
      ) : isAuthenticated === false ? (
        <>
          <PublicNavbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<PublicInfo type="contact" />} />
            <Route path="/pricing" element={<PublicInfo type="pricing" />} />
            <Route path="/login" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<AuthPage setIsAuthenticated={setIsAuthenticated} initialMode="register" />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </>
      ) : (
        <>
          <Navbar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Sidebar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          {/* Content shifted right by sidebar width */}
          <div className="ml-60">
            <Routes>
               <Route path="/pricing" element={<PublicInfo type="pricing" />} />
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              {/* <Route path="/profile" element={<Profile userData={users} />} /> */}
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/user" element={<User />} />
              <Route path="/requests" element={<RequestsPage />} />
              <Route path="/chats" element={<ChatList />} />
              <Route path="/chat/:id" element={<ChatBoard />} />
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#1a1035] to-[#0f172a] text-white">
                  <div className="text-center">
                    <p className="text-slate-400 text-lg mb-4">404 - Page Not Found</p>
                  </div>
                </div>
              } />
            </Routes>
          </div>
        </>
      )}
      
      </>
    
  )
}

export default App
