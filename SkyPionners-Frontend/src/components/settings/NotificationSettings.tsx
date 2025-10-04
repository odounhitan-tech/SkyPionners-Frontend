// src/components/settings/NotificationSettings.tsx
import React, { useState, useEffect } from 'react';
import { FiBell, FiMail, FiMessageSquare, FiSettings, FiZap } from 'react-icons/fi';
import { notificationService, type NotificationConfig } from '../../services/notifications';

interface NotificationSettingsProps {
  onClose?: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onClose }) => {
  const [config, setConfig] = useState<NotificationConfig>({
    criticalThreshold: 150,
    warningThreshold: 100,
    enablePush: false,
    enableEmail: false,
    enableSMS: false
  });

  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: ''
  });

  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    // Charger la configuration depuis le localStorage
    const savedConfig = localStorage.getItem('notificationConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }

    const savedContact = localStorage.getItem('notificationContact');
    if (savedContact) {
      setContactInfo(JSON.parse(savedContact));
    }
  }, []);

  const handleConfigChange = (key: keyof NotificationConfig, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    localStorage.setItem('notificationConfig', JSON.stringify(newConfig));
    notificationService.setConfig(newConfig);
  };

  const handleContactChange = (field: 'email' | 'phone', value: string) => {
    const newContact = { ...contactInfo, [field]: value };
    setContactInfo(newContact);
    localStorage.setItem('notificationContact', JSON.stringify(newContact));
  };

  const handleTestNotifications = async () => {
    setIsTesting(true);
    try {
      await notificationService.testNotifications();
      alert('Notification de test envoyée !');
    } catch (error) {
      alert('Erreur lors de l\'envoi de la notification de test');
    } finally {
      setIsTesting(false);
    }
  };

  const notificationStatus = notificationService.getNotificationStatus();

  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Paramètres de notifications
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ✕
          </button>
        )}
      </div>

      {/* Types de notifications */}
      <div className="space-y-4 mb-6">
        <h3 className="font-medium text-gray-900 dark:text-white">Types de notifications</h3>

        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <input
              type="checkbox"
              checked={config.enablePush}
              onChange={(e) => handleConfigChange('enablePush', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <FiBell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">Notifications push</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Recevoir des notifications directement sur votre navigateur
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              notificationStatus.pushEnabled
                ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
            }`}>
              {notificationStatus.pushEnabled ? 'Activé' : 'Désactivé'}
            </span>
          </label>

          <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <input
              type="checkbox"
              checked={config.enableEmail}
              onChange={(e) => handleConfigChange('enableEmail', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <FiMail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">Notifications par email</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Recevoir des alertes par email
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              notificationStatus.emailEnabled
                ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
            }`}>
              {notificationStatus.emailEnabled ? 'Activé' : 'Désactivé'}
            </span>
          </label>

          <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <input
              type="checkbox"
              checked={config.enableSMS}
              onChange={(e) => handleConfigChange('enableSMS', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <FiMessageSquare className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">Notifications SMS</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Recevoir des alertes par SMS (service payant)
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              notificationStatus.smsEnabled
                ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
            }`}>
              {notificationStatus.smsEnabled ? 'Activé' : 'Désactivé'}
            </span>
          </label>
        </div>
      </div>

      {/* Seuils d'alerte */}
      <div className="space-y-4 mb-6">
        <h3 className="font-medium text-gray-900 dark:text-white">Seuils d'alerte</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Seuil d'alerte critique
            </label>
            <input
              type="number"
              value={config.criticalThreshold}
              onChange={(e) => handleConfigChange('criticalThreshold', parseInt(e.target.value) || 150)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              min="50"
              max="300"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              AQI à partir duquel une alerte critique est envoyée
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Seuil d'alerte warning
            </label>
            <input
              type="number"
              value={config.warningThreshold}
              onChange={(e) => handleConfigChange('warningThreshold', parseInt(e.target.value) || 100)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              min="50"
              max="200"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              AQI à partir duquel une alerte warning est envoyée
            </p>
          </div>
        </div>
      </div>

      {/* Informations de contact */}
      {(config.enableEmail || config.enableSMS) && (
        <div className="space-y-4 mb-6">
          <h3 className="font-medium text-gray-900 dark:text-white">Informations de contact</h3>

          {config.enableEmail && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Adresse email
              </label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                placeholder="votre.email@example.com"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          )}

          {config.enableSMS && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                placeholder="+33 6 12 34 56 78"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={handleTestNotifications}
          disabled={isTesting}
          className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
        >
          <FiZap className="h-4 w-4" />
          <span>{isTesting ? 'Test en cours...' : 'Tester les notifications'}</span>
        </button>

        <button className="w-full flex items-center justify-center space-x-2 p-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <FiSettings className="h-4 w-4" />
          <span>Configuration avancée</span>
        </button>
      </div>

      {/* État des permissions */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>• Les notifications sont gérées par votre navigateur</p>
          <p>• Vous pouvez modifier ces paramètres à tout moment</p>
          <p>• Les données de contact sont stockées localement</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
