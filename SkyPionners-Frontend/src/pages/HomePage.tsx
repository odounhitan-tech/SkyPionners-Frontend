import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiActivity, FiHeart, FiBarChart2, FiGlobe, FiArrowRight, FiCheck, FiStar } from 'react-icons/fi';

const features = [
  {
    icon: <FiActivity className="h-8 w-8" />,
    title: 'Qualité de l\'air en temps réel',
    description: 'Obtenez des mises à jour instantanées sur la qualité de l\'air dans votre région grâce aux dernières données satellitaires TEMPO de la NASA.',
    color: 'from-blue-600 to-cyan-600'
  },
  {
    icon: <FiHeart className="h-8 w-8" />,
    title: 'Recommandations Santé',
    description: 'Recevez des recommandations de santé personnalisées basées sur les conditions actuelles de la qualité de l\'air.',
    color: 'from-pink-600 to-rose-600'
  },
  {
    icon: <FiBarChart2 className="h-8 w-8" />,
    title: 'Données Historiques',
    description: 'Analysez les tendances de la qualité de l\'air au fil du temps avec nos données historiques complètes.',
    color: 'from-purple-600 to-indigo-600'
  },
  {
    icon: <FiGlobe className="h-8 w-8" />,
    title: 'Couverture Mondiale',
    description: 'Accédez aux informations sur la qualité de l\'air pour des endroits du monde entier.',
    color: 'from-green-600 to-teal-600'
  }
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50"></div>
          <div className="absolute inset-0 backdrop-blur-3xl"></div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-lg rounded-full text-white font-medium text-sm mb-6 border border-white/30">
                🚀 Propulsé par NASA TEMPO
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Respirez un Air Plus Pur avec{' '}
              <span className="bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 bg-clip-text text-transparent">
                SkyPioneers
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto font-normal leading-relaxed" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Surveillance en temps réel de la qualité de l'air alimentée par les données satellitaires TEMPO de la NASA
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                className="group px-10 py-4 text-lg font-bold bg-white text-purple-600 hover:bg-gray-100 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
                onClick={() => navigate('/dashboard')}
              >
                <span>Voir le Dashboard</span>
                <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                className="px-10 py-4 text-lg font-bold bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-purple-600 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                En Savoir Plus
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-black text-white mb-2">24/7</div>
                <div className="text-sm text-white/80 font-medium">Surveillance Continue</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-black text-white mb-2">100+</div>
                <div className="text-sm text-white/80 font-medium">Villes Couvertes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-black text-white mb-2">NASA</div>
                <div className="text-sm text-white/80 font-medium">Données TEMPO</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Pourquoi Choisir SkyPioneers ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Découvrez les fonctionnalités qui font de SkyPioneers la meilleure plateforme de surveillance de la qualité de l'air
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Number badge */}
                <div className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br ${feature.color} text-white font-black flex items-center justify-center text-lg shadow-lg`}>
                  {index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Benefits List */}
          <div className="mt-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-3xl font-black text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ce qui nous rend unique
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Données satellitaires NASA TEMPO en temps réel',
                'Interface intuitive et facile à utiliser',
                'Alertes personnalisées de qualité de l\'air',
                'Analyses historiques détaillées',
                'Prévisions précises sur 5 jours',
                'Couverture mondiale complète'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-blue-900/50 p-4 rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <FiCheck className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50"></div>
        </div>
        
        {/* Animated stars background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 animate-pulse">
            <FiStar className="h-6 w-6 text-yellow-300" />
          </div>
          <div className="absolute top-40 right-40 animate-pulse animation-delay-1000">
            <FiStar className="h-4 w-4 text-yellow-300" />
          </div>
          <div className="absolute bottom-20 left-1/3 animate-pulse animation-delay-2000">
            <FiStar className="h-5 w-5 text-yellow-300" />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Prêt à Respirer Plus Facilement ?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui font confiance à SkyPioneers pour des informations précises sur la qualité de l'air.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <button 
                className="group px-12 py-5 text-xl font-bold bg-white text-purple-600 hover:bg-gray-100 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3"
                onClick={() => navigate('/login')}
              >
                <span>Commencer Gratuitement</span>
                <FiArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 items-center text-white/80">
              <div className="flex items-center space-x-2">
                <FiCheck className="h-5 w-5 text-green-300" />
                <span className="font-medium">Gratuit</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheck className="h-5 w-5 text-green-300" />
                <span className="font-medium">Pas de carte requise</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheck className="h-5 w-5 text-green-300" />
                <span className="font-medium">Données NASA</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
