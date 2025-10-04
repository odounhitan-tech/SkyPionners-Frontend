// src/components/dashboard/TempoControls.tsx
import React, { useState, useCallback } from 'react';
import { FiPlay, FiPause, FiRotateCcw, FiFastForward, FiSkipBack, FiVolume2, FiVolumeX } from 'react-icons/fi';

interface TempoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onReset: () => void;
  onTimeChange: (time: number) => void;
  onSpeedChange: (speed: number) => void;
}

const TempoControls: React.FC<TempoControlsProps> = ({
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onReset,
  onTimeChange,
  onSpeedChange
}) => {
  const [speed, setSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
    onSpeedChange(newSpeed);
  }, [onSpeedChange]);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseInt(e.target.value);
    onTimeChange(time);
  }, [onTimeChange]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const speeds = [0.25, 0.5, 1, 2, 4];

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        {/* Contrôles principaux */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={onReset}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Réinitialiser"
          >
            <FiRotateCcw className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>

          <button
            onClick={() => onTimeChange(Math.max(0, currentTime - 10))}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Reculer de 10s"
          >
            <FiSkipBack className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>

          <button
            onClick={onPlayPause}
            className={`p-4 rounded-full transition-all duration-300 ${
              isPlaying
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                : 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
            }`}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FiPause className="h-6 w-6" /> : <FiPlay className="h-6 w-6" />}
          </button>

          <button
            onClick={() => onTimeChange(Math.min(duration, currentTime + 10))}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Avancer de 10s"
          >
            <FiFastForward className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-full transition-colors ${
              isMuted
                ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title={isMuted ? 'Activer le son' : 'Couper le son'}
          >
            {isMuted ? <FiVolumeX className="h-5 w-5" /> : <FiVolume2 className="h-5 w-5" />}
          </button>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {formatTime(currentTime)}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {formatTime(duration)}
            </span>
          </div>

          <div className="relative">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(currentTime / duration) * 100}%, #E5E7EB ${(currentTime / duration) * 100}%, #E5E7EB 100%)`
              }}
            />

            {/* Marqueurs temporels */}
            <div className="absolute -top-1 left-0 right-0 flex justify-between text-xs text-gray-400 mt-1">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>24:00</span>
            </div>
          </div>
        </div>

        {/* Contrôle de vitesse */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Vitesse de lecture
          </label>
          <div className="flex items-center space-x-2">
            {speeds.map((speedValue) => (
              <button
                key={speedValue}
                onClick={() => handleSpeedChange(speedValue)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  speed === speedValue
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {speedValue}x
              </button>
            ))}
          </div>
        </div>

        {/* Informations sur les données */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">Résolution</p>
              <p className="font-semibold text-gray-900 dark:text-white">2.5 km</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">Couverture</p>
              <p className="font-semibold text-gray-900 dark:text-white">France</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">Fréquence</p>
              <p className="font-semibold text-gray-900 dark:text-white">Toutes les heures</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">Source</p>
              <p className="font-semibold text-gray-900 dark:text-white">NASA TEMPO</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default TempoControls;
