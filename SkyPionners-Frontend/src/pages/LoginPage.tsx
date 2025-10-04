import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiHome, FiHeart, FiUsers, FiArrowRight, FiCheck, FiEye, FiEyeOff } from 'react-icons/fi';

type UserType = 'individual' | 'hospital' | 'organization' | 'association';
type ViewMode = 'login' | 'signup';

const LoginPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [userType, setUserType] = useState<UserType>('individual');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    organizationName: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const userTypes = [
    { id: 'individual' as UserType, label: 'Individuel', icon: <FiUser className="h-6 w-6" />, color: 'from-blue-500 to-cyan-500', desc: 'Suivi personnel' },
    { id: 'hospital' as UserType, label: 'Hôpital', icon: <FiHeart className="h-6 w-6" />, color: 'from-red-500 to-pink-500', desc: 'Santé publique' },
    { id: 'organization' as UserType, label: 'Organisation', icon: <FiHome className="h-6 w-6" />, color: 'from-purple-500 to-indigo-500', desc: 'Entreprise' },
    { id: 'association' as UserType, label: 'Association', icon: <FiUsers className="h-6 w-6" />, color: 'from-green-500 to-teal-500', desc: 'ONG/Collectif' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (viewMode === 'signup') {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Veuillez remplir tous les champs');
        return;
      }
      if (userType !== 'individual' && !formData.organizationName) {
        setError('Veuillez entrer le nom de votre organisation');
        return;
      }
    } else {
      if (!formData.email || !formData.password) {
        setError('Veuillez remplir tous les champs');
        return;
      }
    }

    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      login(formData.name || formData.email, userType);
      navigate('/dashboard');
    } catch (err) {
      setError('Échec de la connexion. Vérifiez vos identifiants.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Welcome Section */}
          <div className="hidden lg:block text-white">
            <h1 className="text-6xl font-black mb-6 leading-tight">
              Rejoignez la <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">Révolution</span> de l'Air Pur
            </h1>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Données satellitaires NASA en temps réel • Analyses scientifiques avancées • Impact mesurable
            </p>
            <div className="space-y-4">
              {[
                'Données TEMPO de la NASA',
                'Alertes intelligentes en temps réel',
                'Tableaux de bord personnalisés',
                'Rapports d\'impact détaillés'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-400 rounded-full p-2">
                    <FiCheck className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* Header */}
            <div className="p-8 text-center">
              <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {viewMode === 'login' ? 'Bienvenue' : 'Inscription'}
              </h2>
              <p className="text-gray-600 font-medium">
                {viewMode === 'login' ? 'Connectez-vous pour continuer' : 'Créez votre compte en quelques secondes'}
              </p>
            </div>

            {/* Type Selection (only for signup) */}
            {viewMode === 'signup' && (
              <div className="px-8 pb-6">
                <label className="block text-sm font-bold text-gray-700 mb-4">Type de compte</label>
                <div className="grid grid-cols-2 gap-3">
                  {userTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setUserType(type.id)}
                      className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                        userType === type.id
                          ? `border-transparent bg-gradient-to-br ${type.color} shadow-xl scale-105`
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg'
                      }`}
                    >
                      <div className={`flex flex-col items-center space-y-2 ${
                        userType === type.id ? 'text-white' : 'text-gray-600'
                      }`}>
                        {type.icon}
                        <span className="font-bold text-sm">{type.label}</span>
                        <span className="text-xs opacity-75">{type.desc}</span>
                      </div>
                      {userType === type.id && (
                        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                          <FiCheck className="h-4 w-4 text-green-600" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form */}
            <div className="px-8 pb-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <p className="text-red-700 font-medium text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name (only for signup) */}
              {viewMode === 'signup' && (
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                      placeholder="Jean Dupont"
                    />
                  </div>
                </div>
              )}

              {/* Organization Name (only for non-individual signup) */}
              {viewMode === 'signup' && userType !== 'individual' && (
                <div>
                  <label htmlFor="organizationName" className="block text-sm font-bold text-gray-700 mb-2">
                    Nom de l'organisation
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiHome className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="organizationName"
                      name="organizationName"
                      type="text"
                      value={formData.organizationName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                      placeholder={`Nom de votre ${userTypes.find(t => t.id === userType)?.label.toLowerCase()}`}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                    placeholder="vous@exemple.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                    Mot de passe
                  </label>
                  {viewMode === 'login' && (
                    <a href="#" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                      Mot de passe oublié?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Chargement...</span>
                  </>
                ) : (
                  <>
                    <span>{viewMode === 'login' ? 'Se connecter' : 'Créer mon compte'}</span>
                    <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {viewMode === 'login' ? 'Nouveau sur SkyPioneers?' : 'Vous avez déjà un compte?'}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setViewMode(viewMode === 'login' ? 'signup' : 'login');
                    setError('');
                  }}
                  className="font-bold text-purple-600 hover:text-purple-800 transition-colors"
                >
                  {viewMode === 'login' ? 'Créer un compte' : 'Se connecter'}
                </button>
              </p>
            </div>

            {/* Terms */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                En continuant, vous acceptez nos{' '}
                <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Conditions</a> et{' '}
                <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Politique de confidentialité</a>
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
