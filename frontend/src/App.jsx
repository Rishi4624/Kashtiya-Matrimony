import { StrictMode, useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Home from './Components/Home'
import AboutUs from './Components/AboutUs'
import Profile from './Components/Profile'
import AuthPage from './Components/AuthPage'
import Navbar from './Components/Navbar'
import User from './Components/User'
import ChatBoard from './Components/ChatBoard'
import './App.css'



  export const users = [];

function App() {
  const navigate = useNavigate();
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
        <AuthPage setIsAuthenticated={setIsAuthenticated} />
      ) : (<>
        <Navbar 
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          {/* <Route path="/profile" element={<Profile userData={users} />} /> */}
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/user" element={<User/>}/>
          <Route path="/chat/:id" element={<ChatBoard />} />
          <Route path="*" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#1a1035] to-[#0f172a] text-white">
            <div className="text-center">
              <p className="text-slate-400 text-lg mb-4">404 - Page Not Found</p>
              <button
                onClick={() => {handleUser}}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 transition"
              >
                Go Home
              </button>
            </div>
          </div>} />
        </Routes>
      {/* </div> */}
      </>)}
      
      </>
    
  )
}

export default App
