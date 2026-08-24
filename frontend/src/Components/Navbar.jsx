import { NavLink, useNavigate } from 'react-router-dom';
import logoutUser from '../api/logout.js';
import { useAuth } from '../contex/AuthContex.jsx';

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.success === true) {
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
        return;
      }
      alert(response.message);
    } catch (error) {
      console.log('logout error:', error);
      alert(error);
    }
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-violet-500 text-white shadow-md shadow-violet-500/25'
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        
        {/* Left – Navigation links */}
        <div className="flex items-center gap-2">
          <NavLink to="/home" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/about" className={linkClass}>
            About Us
          </NavLink>

          <NavLink to="/user" className={linkClass}>
            Profile
          </NavLink>
        </div>

        

        {/* Right – Logout (only when logged in) */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full text-sm font-medium
                       text-rose-300 border border-rose-500/40
                       hover:bg-rose-500/15 hover:text-rose-200 hover:border-rose-400/70
                       active:scale-95 transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-rose-500/40"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}