// pages/promoteur/ProjectDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectService from '../../services/projectService';
import PhaseList from '../../components/promoteur/PhaseList';
import ProjectMap from '../../components/promoteur/ProjectMap';
import ReviewsList from '../../components/promoteur/ReviewsList';
import ImageUploader from '../../components/promoteur/ImageUploader';
import { 
  formatPrice, 
  formatSurface, 
  formatDate, 
  getStatutLabel,
  getTypeBienLabel 
} from '../../utils/formatters';

const ProjectDetails = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  console.log("Project ID from useParams:", projectId);

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId]);

  const loadProject = async (id) => {
    setLoading(true);
    setError('');
    try {
      const data = await projectService.getProjectById(id);
      console.log("Data backend", data); // <-- ici, pas data.response
      setProject(data); 
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erreur lors du chargement du projet');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (images) => {
    try {
      await projectService.uploadProjectImages(projectId, images);
      loadProject(projectId);
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'upload des images');
    }
  };

  const handleImageDelete = async (imageUrl) => {
    try {
      await projectService.deleteProjectImage(projectId, imageUrl);
      loadProject(projectId);
    } catch (err) {
      setError(err.message || 'Erreur lors de la suppression de l\'image');
    }
  };

  const handleEdit = () => {
    navigate(`/promoteur/mes-projets/${projectId}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.')) {
      try {
        await projectService.deleteProject(projectId);
        navigate('/promoteur/mes-projets');
      } catch (err) {
        setError(err.message || 'Erreur lors de la suppression du projet');
      }
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Chargement du projet...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-lg">
          <p className="font-medium mb-4">⚠️ {error}</p>
          <button 
            onClick={() => navigate('/promoteur/mes-projets')}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            ← Retour à mes projets
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 text-lg mb-6">❌ Projet non trouvé</p>
          <button 
            onClick={() => navigate('/promoteur/mes-projets')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors"
          >
            ← Retour à mes projets
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'details', label: '📋 Détails', count: null },
    { id: 'phases', label: '📊 Phases', count: project.phases?.length || 0 },
    { id: 'avis', label: '⭐ Avis', count: project.avis?.length || 0 },
    { id: 'localisation', label: '📍 Localisation', count: null }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/promoteur/mes-projets')}
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
        >
          ← Retour
        </button>
        <div className="flex gap-3">
          <button 
            onClick={handleEdit}
            className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            ✏️ Modifier
          </button>
          <button 
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            🗑️ Supprimer
          </button>
        </div>
      </div>

      {/* Titre et statut */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{project.titre}</h1>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.statut)}`}>
              {getStatutLabel(project.statut)}
            </span>
          </div>
        </div>

        {/* Meta informations */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span>{project.localisation?.ville}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🏠</span>
            <span>{getTypeBienLabel(project.typeBien)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👁️</span>
            <span>{project.vues || 0} vues</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📅</span>
            <span>Créé le {formatDate(project.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="bg-white rounded-t-lg shadow-md overflow-x-auto">
        <div className="flex border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 min-w-max px-6 py-4 font-medium transition-colors relative
                ${activeTab === tab.id 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }
              `}
            >
              {tab.label}
              {tab.count !== null && (
                <span className={`
                  ml-2 px-2 py-0.5 rounded-full text-xs
                  ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}
                `}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="bg-white rounded-b-lg shadow-md p-6">
        {/* Onglet Détails */}
        {activeTab === 'details' && (
          <div className="space-y-8">
            {/* Images */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                📷 Images du projet
              </h2>
              <ImageUploader
                existingImages={project.images || []}
                onImagesChange={handleImageUpload}
                onImageDelete={handleImageDelete}
                maxImages={20}
                label="Images du projet"
              />
            </section>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </section>

            {/* Informations principales */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">ℹ️ Informations principales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoCard icon="💰" label="Prix" value={formatPrice(project.prix)} />
                <InfoCard 
                  icon="📐" 
                  label="Surface totale" 
                  value={formatSurface(project.caracteristiques?.surfaceTotale)} 
                />
                {project.caracteristiques?.surfaceHabitable && (
                  <InfoCard 
                    icon="🏠" 
                    label="Surface habitable" 
                    value={formatSurface(project.caracteristiques.surfaceHabitable)} 
                  />
                )}
                {project.caracteristiques?.nombreChambres && (
                  <InfoCard 
                    icon="🛏️" 
                    label="Chambres" 
                    value={project.caracteristiques.nombreChambres} 
                  />
                )}
                {project.caracteristiques?.nombreSallesBain && (
                  <InfoCard 
                    icon="🚿" 
                    label="Salles de bain" 
                    value={project.caracteristiques.nombreSallesBain} 
                  />
                )}
                {project.caracteristiques?.nombreEtages && (
                  <InfoCard 
                    icon="🏢" 
                    label="Étages" 
                    value={project.caracteristiques.nombreEtages} 
                  />
                )}
              </div>
            </section>

            {/* Équipements */}
            {project.caracteristiques?.equipements && 
             project.caracteristiques.equipements.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">✨ Équipements</h2>
                <div className="flex flex-wrap gap-2">
                  {project.caracteristiques.equipements.map((equipement, index) => (
                    <span 
                      key={index}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      ✓ {equipement}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Onglet Phases */}
        {activeTab === 'phases' && (
          <PhaseList
            projectId={projectId}
            phases={project.phases || []}
            onPhasesUpdate={() => loadProject(projectId)}
          />
        )}

        {/* Onglet Avis */}
        {activeTab === 'avis' && (
          <ReviewsList
            reviews={project.avis || []}
            averageRating={project.noteGlobale || 0}
          />
        )}

        {/* Onglet Localisation */}
        {activeTab === 'localisation' && (
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📍 Adresse</h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <InfoRow label="Ville" value={project.localisation?.ville} />
                <InfoRow label="Quartier" value={project.localisation?.quartier} />
                <InfoRow label="Adresse" value={project.localisation?.adresse} />
                {project.localisation?.codePostal && (
                  <InfoRow label="Code postal" value={project.localisation.codePostal} />
                )}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🗺️ Carte</h2>
              <ProjectMap
                latitude={project.localisation?.coordinates?.latitude}
                longitude={project.localisation?.coordinates?.longitude}
                title={project.titre}
                address={project.localisation?.adresse}
              />
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

// Composant utilitaire pour les cartes d'information
const InfoCard = ({ icon, label, value }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-2xl">{icon}</span>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <p className="text-xl font-bold text-gray-800">{value}</p>
  </div>
);

// Composant utilitaire pour les lignes d'information
const InfoRow = ({ label, value }) => (
  <div className="flex items-start gap-2">
    <span className="font-semibold text-gray-700 min-w-[120px]">{label}:</span>
    <span className="text-gray-600">{value}</span>
  </div>
);

export default ProjectDetails;