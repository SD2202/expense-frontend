import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Wallet, LogOut, LayoutDashboard, Settings as SettingsIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide if scrolling down past 50px, show if scrolling up or near top
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/40 shadow-sm transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
              <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
                <Wallet size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
                ExpenseControl
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            {user ? (
              <>
                <Link to="/" className="hidden md:flex text-slate-600 hover:text-indigo-600 items-center gap-2 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-slate-100/50">
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>
                <Link to="/settings" className="hidden md:flex text-slate-600 hover:text-indigo-600 items-center gap-2 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-slate-100/50">
                  <SettingsIcon size={20} />
                  Settings
                </Link>
                <div className="hidden md:block h-8 w-px bg-slate-200/60 mx-2"></div>
                <div className="flex items-center gap-4 bg-white/50 border border-white/60 px-4 py-1.5 rounded-full shadow-sm">
                  <div className="flex flex-col items-end hidden sm:flex">
                    <span className="text-sm font-bold text-slate-800 leading-tight">
                      {user.name}
                    </span>
                    <span className="text-xs font-medium text-slate-500 leading-tight">
                      Pro Member
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-100 to-violet-200 border-2 border-white flex items-center justify-center text-indigo-700 font-bold shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={onLogout}
                    className="p-2 ml-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                    title="Logout"
                  >
                    <LogOut size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-bold transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary py-2 px-5 text-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
