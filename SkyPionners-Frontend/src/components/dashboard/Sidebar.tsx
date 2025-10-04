// src/components/dashboard/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, FiActivity, FiAlertTriangle, 
  FiDownload, FiMap, FiUser, FiHeart 
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = {
    individual: [
      { name: 'Tableau de bord', icon: <FiHome />, path: '/dashboard' },
      { name: 'Qualité de l\'air', icon: <FiActivity />, path: '/dashboard/air-quality' },
      { name: 'Recommandations', icon: <FiHeart />, path: '/dashboard/recommendations' }
    ],
    hospital: [
      { name: 'Vue d\'ensemble', icon: <FiHome />, path: '/dashboard' },
      { name: 'Alertes', icon: <FiAlertTriangle />, path: '/dashboard/alerts' },
      { name: 'Salles', icon: <FiMap />, path: '/dashboard/rooms' },
      { name: 'Exporter', icon: <FiDownload />, path: '/dashboard/export' }
    ],
    organization: [
      { name: 'Tableau de bord', icon: <FiHome />, path: '/dashboard' },
      { name: 'Analyse', icon: <FiActivity />, path: '/dashboard/analysis' },
      { name: 'Rapports', icon: <FiDownload />, path: '/dashboard/reports' }
    ],
    association: [
      { name: 'Tableau de bord', icon: <FiHome />, path: '/dashboard' },
      { name: 'Campagnes', icon: <FiActivity />, path: '/dashboard/campaigns' },
      { name: 'Membres', icon: <FiUser />, path: '/dashboard/members' }
    ]
  };

  const items = user?.userType && navItems[user.userType] ? navItems[user.userType] : navItems.individual;

  return (
    <div className="w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 p-4">
      <div className="flex items-center space-x-3 p-4 mb-8">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">
          {user?.name?.[0] || <FiUser />}
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{user?.name || 'Utilisateur'}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {user?.userType || 'individuel'}
          </p>
        </div>
      </div>
      
      <nav className="space-y-1">
        {items.map((item: { name: string; icon: React.ReactNode; path: string }) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              location.pathname === item.path
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 dark:from-blue-900/50 dark:to-purple-900/50 dark:text-blue-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;