// components/promoteur/PhaseCard.jsx
import React, { useState } from 'react';
import PhaseForm from './PhaseForm';
import ImageUploader from './ImageUploader';
import { formatDate, getStatutLabel } from '../../utils/formatters';

const PhaseCard = ({ 
  phase, 
  projectId,
  isLast, 
  onUpdate, 
  onDelete,
  onImageUpload,
  onImageDelete,
  loading 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showImages, setShowImages] = useState(false);

  const handleUpdate = async (phaseData) => {
    await onUpdate(phase._id, phaseData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(phase._id);
  };

  const handleImageUpload = (images) => {
    onImageUpload(phase._id, images);
  };

  const handleImageDelete = (imageUrl) => {
    onImageDelete(phase._id, imageUrl);
  };

  const getStatusColor = (statut) => {
    const colors = {
      non_commence: 'bg-gray-100 text-gray-700',
      en_cours: 'bg-blue-100 text-blue-700',
      termine: 'bg-green-100 text-green-700',
      en_retard: 'bg-red-100 text-red-700'
    };
    return colors[statut] || 'bg-gray-100 text-gray-700';
  };

  if (isEditing) {
    return (
      <div className="relative">
        <PhaseForm
          initialData={phase}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          loading={loading}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Ligne de connexion timeline */}
      {!isLast && (
        <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-300 -z-10"></div>
      )}

      <div className="flex gap-4">
        {/* Numéro de phase */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-lg font-bold shadow-lg">
            {phase.numero}
          </div>
        </div>

        {/* Contenu de la phase */}
        <div className="flex-1 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 mb-6">
          {/* En-tête */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{phase.titre}</h3>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(phase.statut)}`}>
                {getStatutLabel(phase.statut)}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                disabled={loading}
                className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors disabled:opacity-50"
                title="Modifier"
              >
                ✏️
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4 leading-relaxed">{phase.description}</p>

          {/* Dates */}
          <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">📅 Début :</span>
              <span>{formatDate(phase.dateDebut)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">📅 Fin :</span>
              <span>{formatDate(phase.dateFin)}</span>
            </div>
          </div>

          {/* Images */}
          <div>
            <button
              onClick={() => setShowImages(!showImages)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-3 transition-colors"
            >
              <span>{showImages ? '▼' : '▶'}</span>
              <span>Images de la phase</span>
              {phase.images && phase.images.length > 0 && (
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                  {phase.images.length}
                </span>
              )}
            </button>

            {showImages && (
              <div className="bg-gray-50 rounded-lg p-4">
                <ImageUploader
                  existingImages={phase.images || []}
                  onImagesChange={handleImageUpload}
                  onImageDelete={handleImageDelete}
                  maxImages={15}
                  label="Images de cette phase"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhaseCard;