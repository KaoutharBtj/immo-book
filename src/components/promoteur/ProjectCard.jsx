// components/promoteur/ProjectCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import getImageUrl from '../../services/api';
import { 
  formatPrice, 
  formatSurface, 
  formatDate, 
  getStatutLabel, 
  getStatutClass,
  getTypeBienLabel,
  truncateText 
} from '../../utils/formatters';

const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate();
  const API_URL = 'http://localhost:3000'
  const handleViewDetails = () => {
    navigate(`/promoteur/mes-projets/${project._id}`);
  };

  const handleEdit = () => {
    navigate(`/promoteur/mes-projets/${project._id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      onDelete(project._id);
    }
  };

  const getStatusColor = (statut) => {
    const colors = {
      en_cours: 'bg-blue-100 text-blue-800',
      termine: 'bg-green-100 text-green-800',
      planifie: 'bg-yellow-100 text-yellow-800',
      suspendu: 'bg-red-100 text-red-800'
    };
    return colors[statut] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Image principale */}
      <div className="relative h-48 overflow-hidden">
        {project.imagePrincipale ? (
          <img
            src={`${API_URL}/${project.imagePrincipale}`}
            alt="Project"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            📷 Aucune image
          </div>
        )}
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.statut)}`}>
          {getStatutLabel(project.statut)}
        </span>
      </div>

      {/* Contenu */}
      <div className="p-4">
        {/* En-tête */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
            {project.titre}
          </h3>
          <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
            {getTypeBienLabel(project.typeBien)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {truncateText(project.description, 100)}
        </p>

        {/* Informations */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <span className="mr-2">📍</span>
            <span>{project.localisation?.ville}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <span className="mr-2">💰</span>
            <span className="font-semibold text-green-600">
              {formatPrice(project.prix)}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-700">
            <div className="flex items-center">
              <span className="mr-1">📐</span>
              <span>{formatSurface(project.caracteristiques?.surfaceTotale)}</span>
            </div>
            {project.caracteristiques?.nombreChambres && (
              <div className="flex items-center">
                <span className="mr-1">🛏️</span>
                <span>{project.caracteristiques.nombreChambres} ch</span>
              </div>
            )}
          </div>
        </div>

        {/* Statistiques */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pt-4 border-t">
          <div className="flex items-center gap-1">
            <span>👁️</span>
            <span>{project.vues || 0} vues</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📅</span>
            <span>{formatDate(project.createdAt)}</span>
          </div>
          {project.phases && project.phases.length > 0 && (
            <div className="flex items-center gap-1">
              <span>📊</span>
              <span>{project.phases.length} phases</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button 
            onClick={handleViewDetails}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
          >
            👁️ Voir
          </button>
          <button 
            onClick={handleEdit}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
          >
            ✏️ Modifier
          </button>
          <button 
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
            title="Supprimer"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;