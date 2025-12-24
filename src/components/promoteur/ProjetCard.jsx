import React, { useState } from 'react';
import { MapPin, Eye, Square, Bed, Bath, Edit, Trash2 } from '../../constants/icons';
import DetailProjetModal from './DetailProjetModal';

export default function ProjetCard({ projet, avancement }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div 
        onClick={() => setShowDetails(true)}
        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer"
      >
        <div className="relative h-48">
          <img 
            src={projet.imagePrincipale} 
            alt={projet.titre} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold">
            {projet.prix.toLocaleString()} DH
          </div>
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
            projet.statut === 'en_cours' ? 'bg-blue-100 text-blue-700' :
            projet.statut === 'termine' ? 'bg-green-100 text-green-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {projet.statut === 'en_cours' ? 'En cours' : 
              projet.statut === 'termine' ? 'Terminé' : 'À venir'}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 mb-2">{projet.titre}</h3>
          
          <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>{projet.localisation.quartier}, {projet.localisation.ville}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span>{projet.caracteristiques.surfaceTotale} m²</span>
            </div>
            {projet.caracteristiques.nombreChambres && (
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span>{projet.caracteristiques.nombreChambres}</span>
              </div>
            )}
            {projet.caracteristiques.nombreSallesBain && (
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{projet.caracteristiques.nombreSallesBain}</span>
              </div>
            )}
          </div>

          {avancement > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Avancement</span>
                <span className="font-semibold text-[#1d4370]">{avancement}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#1d4370] h-2 rounded-full transition-all"
                  style={{ width: `${avancement}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Eye className="w-4 h-4" />
              <span>{projet.vues} vues</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="p-2 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <DetailProjetModal 
          projet={projet} 
          onClose={() => setShowDetails(false)} 
        />
      )}
    </>
  );
}