// components/promoteur/ProjectFilters.jsx
import React, { useState } from 'react';
import { TYPE_BIEN, STATUT_PROJET, VILLES_MAROC } from '../../utils/constants';

const ProjectFilters = ({ onApplyFilters, onResetFilters }) => {
  const [filters, setFilters] = useState({
    typeBien: '',
    ville: '',
    prixMin: '',
    prixMax: '',
    surfaceMin: '',
    surfaceMax: '',
    nombreChambres: '',
    statut: '',
    dateDebut: '',
    dateFin: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});
    onApplyFilters(cleanFilters);
  };

  const handleReset = () => {
    setFilters({
      typeBien: '',
      ville: '',
      prixMin: '',
      prixMax: '',
      surfaceMin: '',
      surfaceMax: '',
      nombreChambres: '',
      statut: '',
      dateDebut: '',
      dateFin: ''
    });
    onResetFilters();
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      {/* En-tête */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          🔍 Filtrer les projets
        </h3>
        <button 
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
        >
          {isExpanded ? '▲ Masquer' : '▼ Afficher les filtres'}
        </button>
      </div>

      {/* Formulaire de filtres */}
      {isExpanded && (
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* Type de bien */}
            <div>
              <label htmlFor="typeBien" className="block text-sm font-medium text-gray-700 mb-1">
                Type de bien
              </label>
              <select
                id="typeBien"
                name="typeBien"
                value={filters.typeBien}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous les types</option>
                {Object.entries(TYPE_BIEN).map(([key, value]) => (
                  <option key={value} value={value}>
                    {key.charAt(0) + key.slice(1).toLowerCase().replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Ville */}
            <div>
              <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-1">
                Ville
              </label>
              <select
                id="ville"
                name="ville"
                value={filters.ville}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Toutes les villes</option>
                {VILLES_MAROC.map(ville => (
                  <option key={ville} value={ville}>{ville}</option>
                ))}
              </select>
            </div>

            {/* Prix minimum */}
            <div>
              <label htmlFor="prixMin" className="block text-sm font-medium text-gray-700 mb-1">
                Prix min (DH)
              </label>
              <input
                type="number"
                id="prixMin"
                name="prixMin"
                value={filters.prixMin}
                onChange={handleChange}
                placeholder="Ex: 500000"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Prix maximum */}
            <div>
              <label htmlFor="prixMax" className="block text-sm font-medium text-gray-700 mb-1">
                Prix max (DH)
              </label>
              <input
                type="number"
                id="prixMax"
                name="prixMax"
                value={filters.prixMax}
                onChange={handleChange}
                placeholder="Ex: 2000000"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Surface minimum */}
            <div>
              <label htmlFor="surfaceMin" className="block text-sm font-medium text-gray-700 mb-1">
                Surface min (m²)
              </label>
              <input
                type="number"
                id="surfaceMin"
                name="surfaceMin"
                value={filters.surfaceMin}
                onChange={handleChange}
                placeholder="Ex: 50"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Surface maximum */}
            <div>
              <label htmlFor="surfaceMax" className="block text-sm font-medium text-gray-700 mb-1">
                Surface max (m²)
              </label>
              <input
                type="number"
                id="surfaceMax"
                name="surfaceMax"
                value={filters.surfaceMax}
                onChange={handleChange}
                placeholder="Ex: 200"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Nombre de chambres */}
            <div>
              <label htmlFor="nombreChambres" className="block text-sm font-medium text-gray-700 mb-1">
                Chambres min
              </label>
              <input
                type="number"
                id="nombreChambres"
                name="nombreChambres"
                value={filters.nombreChambres}
                onChange={handleChange}
                placeholder="Ex: 2"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Statut */}
            <div>
              <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                id="statut"
                name="statut"
                value={filters.statut}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous les statuts</option>
                {Object.entries(STATUT_PROJET).map(([key, value]) => (
                  <option key={value} value={value}>
                    {key.charAt(0) + key.slice(1).toLowerCase().replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Date début */}
            <div>
              <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700 mb-1">
                Date début
              </label>
              <input
                type="date"
                id="dateDebut"
                name="dateDebut"
                value={filters.dateDebut}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Date fin */}
            <div>
              <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700 mb-1">
                Date fin
              </label>
              <input
                type="date"
                id="dateFin"
                name="dateFin"
                value={filters.dateFin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-3 mt-6">
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-200"
            >
              ✓ Appliquer les filtres
            </button>
            <button 
              type="button" 
              onClick={handleReset}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium transition-colors duration-200"
            >
              ✕ Réinitialiser
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProjectFilters;