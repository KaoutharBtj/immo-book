
import React, { useState } from 'react';
import { validatePhase } from '../../utils/validators';
import { STATUT_PHASE } from '../../utils/constants';

const PhaseForm = ({ initialData = {}, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    titre: initialData.titre || '',
    description: initialData.description || '',
    dateDebut: initialData.dateDebut ? initialData.dateDebut.split('T')[0] : '',
    dateFin: initialData.dateFin ? initialData.dateFin.split('T')[0] : '',
    statut: initialData.statut || 'non_commence'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validatePhase(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        {initialData.titre ? 'Modifier la phase' : 'Nouvelle phase'}
      </h3>

      {/* Titre */}
      <div className="mb-4">
        <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-2">
          Titre de la phase <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="titre"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          placeholder="Ex: Fondations et structure"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        {errors.titre && <p className="text-red-500 text-sm mt-1">{errors.titre}</p>}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Décrivez les travaux de cette phase..."
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          required
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700 mb-2">
            Date de début <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dateDebut"
            name="dateDebut"
            value={formData.dateDebut}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          {errors.dateDebut && <p className="text-red-500 text-sm mt-1">{errors.dateDebut}</p>}
        </div>

        <div>
          <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700 mb-2">
            Date de fin <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dateFin"
            name="dateFin"
            value={formData.dateFin}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          {errors.dateFin && <p className="text-red-500 text-sm mt-1">{errors.dateFin}</p>}
        </div>
      </div>

      {/* Statut */}
      <div className="mb-6">
        <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-2">
          Statut <span className="text-red-500">*</span>
        </label>
        <select
          id="statut"
          name="statut"
          value={formData.statut}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          {Object.entries(STATUT_PHASE).map(([key, value]) => (
            <option key={value} value={value}>
              {key.split('_').map(word => 
                word.charAt(0) + word.slice(1).toLowerCase()
              ).join(' ')}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button 
          type="button" 
          onClick={onCancel}
          disabled={loading}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          Annuler
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading ? 'En cours...' : initialData.titre ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default PhaseForm;