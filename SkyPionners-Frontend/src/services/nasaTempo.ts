// src/services/nasaTempo.ts
export interface TempoDataPoint {
  latitude: number;
  longitude: number;
  no2: number;
  o3: number;
  aod: number;
  timestamp: string;
  confidence: number;
}

export interface TempoLayer {
  id: string;
  name: string;
  description: string;
  timestamp: string;
  bounds: [[number, number], [number, number]];
  data: TempoDataPoint[];
}

class NASATempoService {
  /**
   * Récupère les données TEMPO pour une date donnée
   * Note: L'API NASA TEMPO réelle nécessite une clé API et peut avoir des limitations
   */
  async getTempoData(date: string, bounds?: [[number, number], [number, number]]): Promise<TempoLayer> {
    try {
      // Simulation des données TEMPO car l'API réelle nécessite des autorisations spéciales
      const mockData: TempoLayer = {
        id: `tempo_${date}`,
        name: `TEMPO Data - ${date}`,
        description: 'Données satellite TEMPO pour la qualité de l\'air',
        timestamp: new Date().toISOString(),
        bounds: bounds || [[40.0, -10.0], [50.0, 10.0]], // Europe par défaut
        data: this.generateMockTempoData(bounds || [[40.0, -10.0], [50.0, 10.0]])
      };

      return mockData;
    } catch (error) {
      console.error('Erreur lors de la récupération des données TEMPO:', error);
      throw error;
    }
  }

  /**
   * Génère des données mockées pour les tests et le développement
   */
  private generateMockTempoData(bounds: [[number, number], [number, number]]): TempoDataPoint[] {
    const [minLat, minLng] = bounds[0];
    const [maxLat, maxLng] = bounds[1];
    const dataPoints: TempoDataPoint[] = [];

    // Générer des points de données simulés sur une grille
    const gridSize = 0.5; // Résolution de 0.5 degré

    for (let lat = minLat; lat <= maxLat; lat += gridSize) {
      for (let lng = minLng; lng <= maxLng; lng += gridSize) {
        // Ajouter de la variation réaliste basée sur la localisation
        const baseLat = 46.5; // Latitude centrale de la France
        const baseLng = 2.5;  // Longitude centrale de la France

        // Distance approximative du centre (en degrés)
        const distanceFromCenter = Math.sqrt(
          Math.pow(lat - baseLat, 2) + Math.pow(lng - baseLng, 2)
        );

        // Générer des valeurs réalistes avec variation géographique
        const no2 = Math.max(20, 45 - distanceFromCenter * 15 + (Math.random() - 0.5) * 20);
        const o3 = Math.max(80, 120 - distanceFromCenter * 10 + (Math.random() - 0.5) * 30);
        const aod = Math.max(0.3, 0.8 - distanceFromCenter * 0.2 + (Math.random() - 0.5) * 0.4);

        dataPoints.push({
          latitude: lat,
          longitude: lng,
          no2: Math.round(no2 * 10) / 10,
          o3: Math.round(o3 * 10) / 10,
          aod: Math.round(aod * 100) / 100,
          timestamp: new Date().toISOString(),
          confidence: 0.85 + Math.random() * 0.1 // 85-95% de confiance
        });
      }
    }

    return dataPoints;
  }

  /**
   * Récupère les données TEMPO pour une bounding box spécifique
   */
  async getTempoDataForBounds(
    north: number,
    south: number,
    east: number,
    west: number,
    date: string
  ): Promise<TempoLayer> {
    const bounds: [[number, number], [number, number]] = [[south, west], [north, east]];
    return this.getTempoData(date, bounds);
  }

  /**
   * Récupère les données TEMPO pour la France
   */
  async getFranceTempoData(date: string): Promise<TempoLayer> {
    // Bounding box approximative de la France métropolitaine
    const franceBounds: [[number, number], [number, number]] = [
      [42.0, -5.0], // Sud-Ouest
      [51.0, 8.0]   // Nord-Est
    ];

    return this.getTempoData(date, franceBounds);
  }

  /**
   * Récupère les données TEMPO historiques pour une période donnée
   */
  async getTempoHistory(
    startDate: string,
    endDate: string,
    bounds?: [[number, number], [number, number]]
  ): Promise<TempoLayer[]> {
    const layers: TempoLayer[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Générer des données pour chaque jour de la période
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().split('T')[0];
      try {
        const layer = await this.getTempoData(dateString, bounds);
        layers.push(layer);
      } catch (error) {
        console.warn(`Impossible de récupérer les données TEMPO pour ${dateString}:`, error);
      }
    }

    return layers;
  }

  /**
   * Calcule des statistiques sur les données TEMPO
   */
  calculateTempoStatistics(data: TempoDataPoint[]) {
    if (data.length === 0) {
      return {
        count: 0,
        no2: { avg: 0, min: 0, max: 0 },
        o3: { avg: 0, min: 0, max: 0 },
        aod: { avg: 0, min: 0, max: 0 },
        confidence: { avg: 0, min: 0, max: 0 }
      };
    }

    const no2Values = data.map(d => d.no2);
    const o3Values = data.map(d => d.o3);
    const aodValues = data.map(d => d.aod);
    const confidenceValues = data.map(d => d.confidence);

    return {
      count: data.length,
      no2: {
        avg: no2Values.reduce((a, b) => a + b, 0) / no2Values.length,
        min: Math.min(...no2Values),
        max: Math.max(...no2Values)
      },
      o3: {
        avg: o3Values.reduce((a, b) => a + b, 0) / o3Values.length,
        min: Math.min(...o3Values),
        max: Math.max(...o3Values)
      },
      aod: {
        avg: aodValues.reduce((a, b) => a + b, 0) / aodValues.length,
        min: Math.min(...aodValues),
        max: Math.max(...aodValues)
      },
      confidence: {
        avg: confidenceValues.reduce((a, b) => a + b, 0) / confidenceValues.length,
        min: Math.min(...confidenceValues),
        max: Math.max(...confidenceValues)
      }
    };
  }
}

export const nasaTempoService = new NASATempoService();
