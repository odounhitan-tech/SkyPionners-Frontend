// src/services/notifications.ts
export interface NotificationConfig {
  criticalThreshold: number;
  warningThreshold: number;
  enablePush: boolean;
  enableEmail: boolean;
  enableSMS: boolean;
  email?: string;
  phone?: string;
}

export interface AlertNotification {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  location?: string;
  parameter?: string;
  value?: number;
  threshold?: number;
}

class NotificationService {
  private config: NotificationConfig = {
    criticalThreshold: 150,
    warningThreshold: 100,
    enablePush: false,
    enableEmail: false,
    enableSMS: false
  };

  private permissionGranted = false;

  constructor() {
    this.requestNotificationPermission();
  }

  /**
   * Demande la permission pour les notifications push
   */
  async requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('Ce navigateur ne supporte pas les notifications push');
      return false;
    }

    if (Notification.permission === 'granted') {
      this.permissionGranted = true;
      return true;
    }

    if (Notification.permission === 'denied') {
      console.warn('Les notifications sont bloquées par l\'utilisateur');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      this.permissionGranted = permission === 'granted';
      return this.permissionGranted;
    } catch (error) {
      console.error('Erreur lors de la demande de permission:', error);
      return false;
    }
  }

  /**
   * Configure les paramètres de notification
   */
  setConfig(config: Partial<NotificationConfig>) {
    this.config = { ...this.config, ...config };
  }

  /**
   * Vérifie si une alerte nécessite une notification
   */
  shouldNotify(alert: AlertNotification): boolean {
    if (!this.config.enablePush && !this.config.enableEmail && !this.config.enableSMS) {
      return false;
    }

    // Vérifier les seuils
    if (alert.type === 'critical' && alert.value && alert.value >= this.config.criticalThreshold) {
      return true;
    }

    if (alert.type === 'warning' && alert.value && alert.value >= this.config.warningThreshold) {
      return true;
    }

    return false;
  }

  /**
   * Envoie une notification push
   */
  async sendPushNotification(alert: AlertNotification): Promise<void> {
    if (!this.permissionGranted || !this.shouldNotify(alert)) {
      return;
    }

    try {
      const notification = new Notification(alert.title, {
        body: alert.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: alert.id,
        requireInteraction: alert.type === 'critical',
        silent: false,
        data: alert
      });

      notification.onclick = () => {
        // Ouvrir l'application ou naviguer vers la page appropriée
        window.focus();
        notification.close();
      };

      // Fermeture automatique après 10 secondes pour les alertes non critiques
      if (alert.type !== 'critical') {
        setTimeout(() => notification.close(), 10000);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification push:', error);
    }
  }

  /**
   * Envoie une notification email (simulation)
   */
  async sendEmailNotification(alert: AlertNotification): Promise<void> {
    if (!this.config.enableEmail || !this.config.email) {
      return;
    }

    try {
      // Simulation d'envoi d'email
      console.log('Envoi d\'email de notification:', {
        to: this.config.email,
        subject: `Alerte AQI - ${alert.title}`,
        content: `
          Bonjour,

          Une alerte de qualité de l'air a été détectée :

          Type: ${alert.type}
          Titre: ${alert.title}
          Message: ${alert.message}
          ${alert.location ? `Lieu: ${alert.location}` : ''}
          ${alert.parameter ? `Paramètre: ${alert.parameter}` : ''}
          ${alert.value ? `Valeur: ${alert.value}` : ''}

          Consultez votre tableau de bord pour plus de détails.

          Cordialement,
          L'équipe SkyPioneers
        `
      });

      // Ici vous intégreriez un service d'email réel comme SendGrid, Mailgun, etc.
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
  }

  /**
   * Envoie une notification SMS (simulation)
   */
  async sendSMSNotification(alert: AlertNotification): Promise<void> {
    if (!this.config.enableSMS || !this.config.phone) {
      return;
    }

    try {
      // Simulation d'envoi de SMS
      console.log('Envoi de SMS de notification:', {
        to: this.config.phone,
        message: `Alerte AQI ${alert.type.toUpperCase()}: ${alert.message} ${alert.location ? `à ${alert.location}` : ''}`
      });

      // Ici vous intégreriez un service SMS réel comme Twilio, etc.
    } catch (error) {
      console.error('Erreur lors de l\'envoi du SMS:', error);
    }
  }

  /**
   * Envoie tous les types de notifications configurés
   */
  async sendAlertNotification(alert: AlertNotification): Promise<void> {
    // Envoyer la notification push
    await this.sendPushNotification(alert);

    // Envoyer l'email si configuré
    if (this.config.enableEmail) {
      await this.sendEmailNotification(alert);
    }

    // Envoyer le SMS si configuré
    if (this.config.enableSMS) {
      await this.sendSMSNotification(alert);
    }
  }

  /**
   * Teste les notifications
   */
  async testNotifications(): Promise<void> {
    const testAlert: AlertNotification = {
      id: 'test_' + Date.now(),
      type: 'info',
      title: 'Test de notification',
      message: 'Ceci est un test du système de notifications SkyPioneers',
      timestamp: new Date().toISOString()
    };

    await this.sendAlertNotification(testAlert);
  }

  /**
   * Obtient l'état actuel des notifications
   */
  getNotificationStatus() {
    return {
      pushEnabled: this.permissionGranted && this.config.enablePush,
      emailEnabled: this.config.enableEmail && !!this.config.email,
      smsEnabled: this.config.enableSMS && !!this.config.phone,
      permission: Notification.permission
    };
  }
}

export const notificationService = new NotificationService();
