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
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-rose-600 bg-rose-50'
        : 'text-gray-700 hover:text-rose-600 hover:bg-rose-50/60'
    }`;
 
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
         
          {/* Left – Logo + Brand */}
          <div className="flex items-center gap-8">
            <NavLink to="/home" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                K
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight hidden sm:block">
                Kashtiya <span className="text-rose-600">Matrimony</span>
              </span>
            </NavLink>
 
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              <NavLink to="/home" className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/about" className={linkClass}>
                About Us
              </NavLink>
              {isAuthenticated && (
                <NavLink to="/user" className={linkClass}>
                  My Profile
                </NavLink>
              )}
            </div>
          </div>
 
          {/* Right – Auth Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Mobile Profile link */}
                <NavLink
                  to="/user"
                  className="md:hidden px-3 py-2 text-sm font-medium text-gray-700 hover:text-rose-600"
                >
                  Profile
                </NavLink>
 
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-sm font-medium
                             text-rose-600 border border-rose-200
                             hover:bg-rose-50 hover:border-rose-300
                             active:scale-95 transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white
                             bg-rose-600 hover:bg-rose-700
                             shadow-sm hover:shadow transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                >
                  Register Free
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
 