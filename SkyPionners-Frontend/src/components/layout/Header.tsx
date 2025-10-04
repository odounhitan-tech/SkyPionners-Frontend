import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import { FiWind, FiHome, FiBarChart2, FiLogIn, FiLogOut, FiTrendingUp } from 'react-icons/fi';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const handlePrevisionsClick = () => {
    if (location.pathname === '/dashboard') {
      const element = document.getElementById('previsions');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-2 shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
              <FiWind className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              SkyPioneers
            </span>
          </Link>
          
          <div className="flex items-center space-x-2 md:space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-blue-900/50 transition-all duration-300 font-medium"
            >
              <FiHome className="h-5 w-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-blue-900/50 transition-all duration-300 font-medium"
            >
              <FiBarChart2 className="h-5 w-5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            {location.pathname === '/dashboard' ? (
              <button
                onClick={handlePrevisionsClick}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-purple-900/50 transition-all duration-300 font-medium"
              >
                <FiTrendingUp className="h-5 w-5" />
                <span className="hidden sm:inline">Prévisions</span>
              </button>
            ) : (
              <Link
                to="/forecast"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700 dark:hover:to-purple-900/50 transition-all duration-300 font-medium"
              >
                <FiTrendingUp className="h-5 w-5" />
                <span className="hidden sm:inline">Prévisions</span>
              </Link>
            )}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="hidden md:inline text-gray-700 dark:text-gray-200 font-medium">
                  Bienvenue, <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.name}</span>
                </span>
                <Button 
                  onClick={logout} 
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FiLogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <FiLogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
