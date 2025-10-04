// src/pages/AboutPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiAward, FiUsers, FiGlobe, FiTrendingUp } from 'react-icons/fi';

interface TeamMember {
  firstName: string;
  lastName: string;
  role: string;
  photo: string;
  coordinates: {
    email?: string;
    phone?: string;
    location?: string;
    github?: string;
    linkedin?: string;
  };
}

const AboutPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      firstName: 'Raymond',
      lastName: 'Dubois',
      role: 'Chef de projet',
      photo: 'https://via.placeholder.com/150',
      coordinates: {
        email: 'raymond.dubois@skypioneers.com',
        phone: '+33 6 12 34 56 78',
        location: 'Paris, France',
        github: 'https://github.com/raymonddubois',
        linkedin: 'https://linkedin.com/in/raymonddubois'
      }
    },
    {
      firstName: 'Marie',
      lastName: 'Martin',
      role: 'Développeuse Frontend',
      photo: 'https://via.placeholder.com/150',
      coordinates: {
        email: 'marie.martin@skypioneers.com',
        phone: '+33 6 23 45 67 89',
        location: 'Lyon, France',
        github: 'https://github.com/mariemartin',
        linkedin: 'https://linkedin.com/in/mariemartin'
      }
    },
    {
      firstName: 'Pierre',
      lastName: 'Durand',
      role: 'Designer UI/UX',
      photo: 'https://via.placeholder.com/150',
      coordinates: {
        email: 'pierre.durand@skypioneers.com',
        phone: '+33 6 34 56 78 90',
        location: 'Marseille, France',
        github: 'https://github.com/pierredurand',
        linkedin: 'https://linkedin.com/in/pierredurand'
      }
    },
    {
      firstName: 'Sophie',
      lastName: 'Lefebvre',
      role: 'Développeuse Backend',
      photo: 'https://via.placeholder.com/150',
      coordinates: {
        email: 'sophie.lefebvre@skypioneers.com',
        phone: '+33 6 45 67 89 01',
        location: 'Toulouse, France',
        github: 'https://github.com/sophielefebvre',
        linkedin: 'https://linkedin.com/in/sophielefebvre'
      }
    },
    {
      firstName: 'Thomas',
      lastName: 'Garcia',
      role: 'Expert Données',
      photo: 'https://via.placeholder.com/150',
      coordinates: {
        email: 'thomas.garcia@skypioneers.com',
        phone: '+33 6 56 78 90 12',
        location: 'Nice, France',
        github: 'https://github.com/thomasgarcia',
        linkedin: 'https://linkedin.com/in/thomasgarcia'
      }
    }
  ];

  const stats = [
    { icon: <FiUsers />, value: '5', label: 'Membres d\'équipe' },
    { icon: <FiGlobe />, value: '1000+', label: 'Utilisateurs actifs' },
    { icon: <FiTrendingUp />, value: '24/7', label: 'Surveillance' },
    { icon: <FiAward />, value: '2024', label: 'Lancement' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Notre Équipe
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez les membres passionnés de SkyPioneers qui travaillent chaque jour
            à révolutionner la qualité de l'air.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg mb-4">
                  <span className="text-2xl text-white">{stat.icon}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            L'Équipe SkyPioneers
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-center">
                  <img
                    src={member.photo}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white dark:border-gray-700 shadow-lg object-cover"
                  />

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.firstName} {member.lastName}
                  </h3>

                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                    {member.role}
                  </p>

                  {/* Coordonnées */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {member.coordinates.email && (
                      <div className="flex items-center justify-center space-x-2">
                        <FiMail className="h-4 w-4 text-gray-500" />
                        <span className="truncate">{member.coordinates.email}</span>
                      </div>
                    )}

                    {member.coordinates.phone && (
                      <div className="flex items-center justify-center space-x-2">
                        <FiPhone className="h-4 w-4 text-gray-500" />
                        <span>{member.coordinates.phone}</span>
                      </div>
                    )}

                    {member.coordinates.location && (
                      <div className="flex items-center justify-center space-x-2">
                        <FiMapPin className="h-4 w-4 text-gray-500" />
                        <span>{member.coordinates.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Réseaux sociaux */}
                  <div className="flex justify-center space-x-3 mt-4">
                    {member.coordinates.github && (
                      <a
                        href={member.coordinates.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <FiGithub className="h-5 w-5" />
                      </a>
                    )}
                    {member.coordinates.linkedin && (
                      <a
                        href={member.coordinates.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <FiLinkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Notre Mission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Chez SkyPioneers, nous nous engageons à fournir des données de qualité de l'air précises et accessibles à tous.
            Notre équipe passionnée travaille sans relâche pour développer des solutions innovantes qui améliorent la
            compréhension et la gestion de la qualité de l'air.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Nous croyons que l'accès à des informations environnementales fiables est un droit fondamental,
            et nous nous efforçons de rendre ces données compréhensibles et utiles pour tous.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Prêt à découvrir SkyPioneers ?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Rejoignez des milliers d'utilisateurs qui font confiance à nos données pour prendre des décisions éclairées.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
            >
              Découvrir l'application
            </Link>
            <Link
              to="/forecast"
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-lg font-medium rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Voir les prévisions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;