import React from 'react';
import { FiGithub, FiTwitter, FiMail, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg mt-auto border-t border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Section Logo et Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              SkyPioneers
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Surveillance en temps réel de la qualité de l'air alimentée par les données satellitaires TEMPO de la NASA.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-blue-900/50 p-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <FiGithub className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              </a>
              <a 
                href="#" 
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-blue-900/50 p-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <FiTwitter className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              </a>
              <a 
                href="#" 
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-blue-900/50 p-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <FiMail className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              </a>
            </div>
          </div>

          {/* Section Liens Rapides */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Dashboard
                </a>
              </li>
              <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                À Propos
              </Link>
              <li>
                <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Section Ressources */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">Ressources</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://tempo.si.edu/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  NASA TEMPO
                </a>
              </li>
              <li>
                <a href="https://openaq.org/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  OpenAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Documentation API
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Confidentialité
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Section Copyright */}
        <div className="pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} <span className="font-bold text-blue-600 dark:text-blue-400">SkyPioneers</span>. Tous droits réservés.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2">
              <span>Créé avec</span>
              <FiHeart className="text-red-500 animate-pulse" />
              <span>pour le</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">NASA Space Apps Challenge 2025</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
