// components/promoteur/PhaseList.jsx
import React, { useState } from 'react';
import PhaseCard from './PhaseCard';
import PhaseForm from './PhaseForm';
import phaseService from '../../services/phaseService';

const PhaseList = ({ projectId, phases = [], onPhasesUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddPhase = async (phaseData) => {
    setLoading(true);
    setError('');
    try {
      await phaseService.addPhase(projectId, phaseData);
      setIsAdding(false);
      onPhasesUpdate();
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'ajout de la phase');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePhase = async (phaseId, phaseData) => {
    setLoading(true);
    setError('');
    try {
      await phaseService.updatePhase(projectId, phaseId, phaseData);
      onPhasesUpdate();
    } catch (err) {
      setError(err.message || 'Erreur lors de la mise à jour de la phase');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhase = async (phaseId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette phase ?')) {
      return;
    }

    setLoading(true);
    setError('');
    try {
      await phaseService.deletePhase(projectId, phaseId);
      onPhasesUpdate();
    } catch (err) {
      setError(err.message || 'Erreur lors de la suppression de la phase');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (phaseId, images) => {
    setLoading(true);
    setError('');
    try {
      await phaseService.uploadPhaseImages(projectId, phaseId, images);
      onPhasesUpdate();
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'upload des images');
    } finally {
      setLoading(false);
    }
  };

  const handleImageDelete = async (phaseId, imageUrl) => {
    setLoading(true);
    setError('');
    try {
      await phaseService.deletePhaseImage(projectId, phaseId, imageUrl);
      onPhasesUpdate();
    } catch (err) {
      setError(err.message || 'Erreur lors de la suppression de l\'image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          📊 Phases du projet
        </h2>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            ➕ Ajouter une phase
          </button>
        )}
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
          ⚠️ {error}
        </div>
      )}

      {/* Formulaire d'ajout */}
      {isAdding && (
        <PhaseForm
          onSubmit={handleAddPhase}
          onCancel={() => setIsAdding(false)}
          loading={loading}
        />
      )}

      {/* Timeline des phases */}
      {phases.length > 0 ? (
        <div className="space-y-4">
          {phases
            .sort((a, b) => a.numero - b.numero)
            .map((phase, index) => (
              <PhaseCard
                key={phase._id}
                phase={phase}
                projectId={projectId}
                isLast={index === phases.length - 1}
                onUpdate={handleUpdatePhase}
                onDelete={handleDeletePhase}
                onImageUpload={handleImageUpload}
                onImageDelete={handleImageDelete}
                loading={loading}
              />
            ))}
        </div>
      ) : (
        !isAdding && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-5xl mb-4 opacity-50">📋</div>
            <p className="text-gray-600 mb-6">Aucune phase n'a encore été créée pour ce projet</p>
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              ➕ Créer la première phase
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default PhaseList;