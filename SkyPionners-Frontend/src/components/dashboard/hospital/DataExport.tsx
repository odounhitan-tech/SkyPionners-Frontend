// src/components/dashboard/hospital/DataExport.tsx
import React, { useState } from 'react';
import { FiDownload, FiFileText, FiCalendar, FiFilter, FiSettings, FiCheck } from 'react-icons/fi';

interface DataExportProps {
  selectedRoom?: string | null;
}

const DataExport: React.FC<DataExportProps> = ({ selectedRoom }) => {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv' | 'excel'>('pdf');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const availableRooms = [
    'Salle 301', 'Salle 205', 'Soins Intensifs', 'Bloc Opératoire 1',
    'Salle d\'attente', 'Couloir A', 'Salle 102', 'Salle 203'
  ];

  const handleRoomToggle = (room: string) => {
    setSelectedRooms(prev =>
      prev.includes(room)
        ? prev.filter(r => r !== room)
        : [...prev, room]
    );
  };

  const handleExport = async () => {
    setIsExporting(true);

    // Simulation de l'export
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Création du contenu du fichier
    const exportData = {
      format: exportFormat,
      dateRange,
      rooms: selectedRooms.length > 0 ? selectedRooms : ['Toutes les salles'],
      generatedAt: new Date().toISOString(),
      hospital: 'Centre Hospitalier Universitaire'
    };

    if (exportFormat === 'pdf') {
      // Simulation de génération PDF
      console.log('Génération PDF:', exportData);
      // Ici vous intégreriez une vraie librairie PDF comme jsPDF ou react-pdf
    } else if (exportFormat === 'csv') {
      // Simulation de génération CSV
      console.log('Génération CSV:', exportData);
    } else {
      // Simulation de génération Excel
      console.log('Génération Excel:', exportData);
    }

    setIsExporting(false);
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return <FiFileText className="h-4 w-4" />;
      case 'csv': return <FiFileText className="h-4 w-4" />;
      case 'excel': return <FiFileText className="h-4 w-4" />;
      default: return <FiFileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Export des données
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Téléchargez les rapports de qualité de l'air
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Format d'export */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Format d'export
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'pdf', label: 'PDF' },
              { value: 'csv', label: 'CSV' },
              { value: 'excel', label: 'Excel' }
            ].map((format) => (
              <button
                key={format.value}
                onClick={() => setExportFormat(format.value as any)}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  exportFormat === format.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {getFormatIcon(format.value)}
                  <span className="text-sm font-medium">{format.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Plage de dates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            <FiCalendar className="inline h-4 w-4 mr-1" />
            Période
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Date de début
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Date de fin
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* Sélection des salles */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            <FiFilter className="inline h-4 w-4 mr-1" />
            Salles à inclure
          </label>

          {selectedRoom && (
            <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Salle sélectionnée: <strong>{selectedRoom}</strong>
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
            {availableRooms.map((room) => (
              <label key={room} className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedRooms.includes(room) || selectedRoom === room}
                  onChange={() => handleRoomToggle(room)}
                  disabled={selectedRoom === room}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{room}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Options avancées */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <details className="group">
            <summary className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer list-none">
              <FiSettings className="h-4 w-4" />
              <span>Options avancées</span>
              <FiCheck className="h-4 w-4 ml-auto opacity-0 group-open:opacity-100 transition-opacity" />
            </summary>

            <div className="mt-4 space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Inclure les graphiques</span>
              </label>

              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Inclure les alertes</span>
              </label>

              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Rapport détaillé</span>
              </label>
            </div>
          </details>
        </div>

        {/* Bouton d'export */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Génération en cours...</span>
            </>
          ) : (
            <>
              <FiDownload className="h-5 w-5" />
              <span>Télécharger le rapport</span>
            </>
          )}
        </button>

        {/* Informations sur l'export */}
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>• Le rapport inclura les données AQI, température et humidité</p>
          <p>• Format {exportFormat.toUpperCase()} avec graphiques et statistiques</p>
          <p>• Génération automatique du nom de fichier avec date et heure</p>
        </div>
      </div>
    </div>
  );
};

export default DataExport;
