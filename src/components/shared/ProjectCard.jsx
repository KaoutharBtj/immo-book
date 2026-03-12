import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Square, BadgeDollarSign, Eye, Trash, Calendar, Bed } from "lucide-react";
import StarRating from '../pages/client/tousLesProjets/StarRating';
import clientReviewService from '../../services/clientServices/clientReviewService';
import clientReservationService from '../../services/clientServices/clientReservationService'
import { 
  formatPrice, 
  formatSurface, 
  formatDate, 
  getStatutLabel, 
  getTypeBienLabel,
  truncateText 
} from '../../utils/formatters';

const ProjectCard = ({ project, onDelete, isClient= false, onRefresh}) => {
  const navigate = useNavigate();
  const API_URL = 'http://localhost:3000'
  const handleViewDetails = () => {
    if(isClient) {
      navigate(`/client/projets/${project._id}`)
    }else{
      navigate(`/promoteur/mes-projets/${project._id}`);
    }
  };

  const handleReserve = async () => {
    try{
          if(isClient) {
            await clientReservationService.createReservation(project._id);
            alert("Le projet est bien réservé");
          }
    }catch(err) {
      alert("Erreur", + err.message);
    }
  }

  const handleEdit = () => {
    navigate(`/promoteur/mes-projets/${project._id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      onDelete(project._id);
    }
  };

  const handleReview = async (stars) => {
    try {
      await clientReviewService.createReview(project._id, stars);
      alert("Avis envoyé avec succès");
      if(onRefresh) onRefresh();
    }catch(err) {
      alert('Vous ne pouvez pas laisser un avis. Vous devez avoir une réservation acceptée pour ce projet.', +err.message);
    }
  }

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
      <div className="relative h-48 overflow-hidden">
        {project.imagePrincipale ? (
          <img
            src={`${API_URL}/${project.imagePrincipale}`}
            alt="Project"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            Aucune image
          </div>
        )}
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.statut)}`}>
          {getStatutLabel(project.statut)}
        </span>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
            {project.titre}
          </h3>
          <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
            {getTypeBienLabel(project.typeBien)}
          </span>
        </div>
        <div className="flex items-center justify-between p-4">
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {truncateText(project.description, 100)}
          </p>

          {isClient && (
            <StarRating 
              rating={project.averageStars} 
              size="sm"
              interactive= {true}
              onRate={handleReview}
            />
          )}
        </div>


        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <span className="mr-2"><MapPin size={18} color="black"/></span>
            <span>{project.localisation?.ville}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <span className="mr-2"><BadgeDollarSign size={18} /></span>
            <span className="font-semibold text-[#a18651]">
              {formatPrice(project.prix)}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-700">
            <div className="flex items-center">
              <span className="mr-1"><Square size={18} /></span>
              <span>{formatSurface(project.caracteristiques?.surfaceTotale)}</span>
            </div>
            {project.caracteristiques?.nombreChambres && (
              <div className="flex items-center">
                <span className="mr-1"><Bed size={16}/></span>
                <span>{project.caracteristiques.nombreChambres}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pt-4 border-t">
          <div className="flex items-center gap-1">
            <span><Eye size={16}/></span>
            <span>{project.vues || 0} vues</span>
          </div>
          <div className="flex items-center gap-1">
            <span><Calendar size={16}/></span>
            <span>{formatDate(project.createdAt)}</span>
          </div>
          {project.phases && project.phases.length > 0 && (
            <div className="flex items-center gap-1">
              <span>{project.phases.length} phases</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleViewDetails}
            className="flex-1 bg-[#1d4370] hover:bg-[#27578F] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
          >
            Voir
          </button>
          {!isClient ? (
            <div className="flex gap-2">
                <button 
                    onClick={handleEdit}
                    className="flex-1 bg-[#a18651] hover:bg-[#B89C64] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                  >
                    Modifier
                </button>
                <button 
                    onClick={handleDelete}
                    className="bg-gray-200 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
                    title="Supprimer"
                  >
                    <Trash size={16} color="black"/>
                </button>
            </div>
          ) : (
            <div className='flex gap-2'>
              <button 
              onClick={handleReserve}
              className= "bg-[#a18651] hover:bg-[#B89C64] rounded-lg py-2 px-2 text-white text-sm font-medium transition-colors duration-200"
              title="reserver">
                Réserver
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;