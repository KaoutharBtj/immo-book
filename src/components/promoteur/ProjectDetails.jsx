import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectService from '../../services/projectService';
import PhaseList from '../../components/promoteur/PhaseList';
import ProjectMap from '../../components/promoteur/ProjectMap';
import ReviewsList from '../../components/promoteur/ReviewsList';
import ImageUploader from '../../components/promoteur/ImageUploader';
import { MapPin, Home, Square, DollarSign, Eye, Trash, Calendar, Bed, ShowerHead, Camera } from "lucide-react";
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    typeBien: '',
    statut: '',
    prix: 0,
    dateDebut: '',
    dateFinPrevue: '',
    imagePrincipale: null, 
    galerie: null,
    localisation: {
      adresse: '',
      ville: '',
      codePostal: '',
      quartier: '',
      coordinates: { latitude: 0, longitude: 0 }
    },
    caracteristiques: {
      surfaceTotale: 0,
      nombreChambres: 0,
      nombreSallesBain: 0,
      etage: 0,
      nombrePlacesParking: 0,
      ascenseur: false,
      balcon: false,
      terrasse: false,
      garage: false,
      jardin: false,
      piscine: false,
      climatisation: false,
      chauffage: false,
      cuisine: '',
      meuble: false,
      securite: false,
      gardien: false
    }
  });

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
      console.log('Données reçues du backend:', data);
      
      setProject(data.project); 

      // ✅ CORRECTION 2: Utiliser data.project au lieu de data
      setFormData({
        titre: data.project.titre || '',
        description: data.project.description || '',
        typeBien: data.project.typeBien || '',
        statut: data.project.statut || '',
        prix: data.project.prix || 0,
        dateDebut: data.project.dateDebut ? data.project.dateDebut.split('T')[0] : '',
        dateFinPrevue: data.project.dateFinPrevue ? data.project.dateFinPrevue.split('T')[0] : '',
        localisation: {
          adresse: data.project.localisation?.adresse || '',
          ville: data.project.localisation?.ville || '',
          codePostal: data.project.localisation?.codePostal || '',
          quartier: data.project.localisation?.quartier || '',
          coordinates: {
            latitude: data.project.localisation?.coordinates?.latitude || 0,
            longitude: data.project.localisation?.coordinates?.longitude || 0
          }
        },
        caracteristiques: {
          surfaceTotale: data.project.caracteristiques?.surfaceTotale || 0,
          nombreChambres: data.project.caracteristiques?.nombreChambres || 0,
          nombreSallesBain: data.project.caracteristiques?.nombreSallesBain || 0,
          etage: data.project.caracteristiques?.etage || 0,
          nombrePlacesParking: data.project.caracteristiques?.nombrePlacesParking || 0,
          ascenseur: data.project.caracteristiques?.ascenseur || false,
          balcon: data.project.caracteristiques?.balcon || false,
          terrasse: data.project.caracteristiques?.terrasse || false,
          garage: data.project.caracteristiques?.garage || false,
          jardin: data.project.caracteristiques?.jardin || false,
          piscine: data.project.caracteristiques?.piscine || false,
          climatisation: data.project.caracteristiques?.climatisation || false,
          chauffage: data.project.caracteristiques?.chauffage || false,
          cuisine: data.project.caracteristiques?.cuisine || '',
          meuble: data.project.caracteristiques?.meuble || false,
          securite: data.project.caracteristiques?.securite || false,
          gardien: data.project.caracteristiques?.gardien || false
        }
      });
    } catch (err) {
      console.error('Erreur chargement projet:', err);
      setError(err.message || 'Erreur lors du chargement du projet');
    } finally {
      setLoading(false);
    }
  };

  // ✅ CORRECTION 3: Ajouter handleChange pour les inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Pour les champs imbriqués (ex: localisation.ville)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      // Pour les champs simples
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // ✅ CORRECTION 4: Fonction handleSave corrigée
  const handleSave = async () => {
    try {
      setLoading(true);
      await projectService.updateProject(projectId, formData);
      await loadProject(projectId);
      setIsEditMode(false);
      alert('Projet mis à jour avec succès !');
    } catch (err) {
      console.error('Erreur lors de la mise à jour du projet:', err);
      setError(err.message || 'Erreur lors de la mise à jour du projet');
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

  // ✅ CORRECTION 5: handleEdit active le mode édition
  const handleEdit = () => {
    setIsEditMode(true);
  };

  // ✅ CORRECTION 6: handleCancel annule l'édition
  const handleCancel = () => {
    setIsEditMode(false);
    loadProject(projectId); // Recharger les données originales
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
      a_venir: 'bg-purple-100 text-purple-800',
      en_cours: 'bg-blue-100 text-blue-800',
      termine: 'bg-green-100 text-green-800',
      vendu: 'bg-gray-100 text-gray-800'
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
          <p className="font-medium mb-4">{error}</p>
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
            className="bg-[#1d4370] hover:bg-[#27578F] text-white py-2 px-6 rounded-lg transition-colors"
          >
            ← Retour à mes projets
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'details', label: 'Détails', count: null },
    { id: 'phases', label: 'Phases', count: project.phases?.length || 0 },
    { id: 'localisation', label: '   Localisation', count: null }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/promoteur/mes-projets')}
          className="text-[#1d4370] hover:text-[#27578F] font-medium flex items-center gap-2 transition-colors"
        >
          ← Retour
        </button>
        
        {/* ✅ CORRECTION 7: Boutons conditionnels selon le mode */}
        <div className="flex gap-3">
          {isEditMode ? (
            <>
              <button 
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Enregistrer
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleEdit}
                className="bg-[#1d4370] hover:bg-[#27578F] text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                Modifier
              </button>
              <button 
                onClick={handleDelete}
                className="bg-gray-200 hover:bg-red-600 text-black py-2 px-4 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                Supprimer
              </button>
            </>
          )}
        </div>
      </div>

      {/* Titre et statut */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div className="flex-1">
            {/* ✅ CORRECTION 8: Mode édition pour le titre */}
            {isEditMode ? (
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                className="text-3xl font-bold text-gray-800 mb-2 w-full border-2 border-blue-300 rounded px-2 py-1"
              />
            ) : (
              <h1 className="text-3xl font-bold text-[#a18651] mb-2">{project.titre}</h1>
            )}
            
            {/* ✅ CORRECTION 9: Mode édition pour le statut */}
            {isEditMode ? (
              <select
                name="statut"
                value={formData.statut}
                onChange={handleChange}
                className="px-3 py-1 rounded-full text-sm font-semibold border-2 border-blue-300"
              >
                <option value="a_venir">À venir</option>
                <option value="en_cours">En cours</option>
                <option value="termine">Terminé</option>
                <option value="vendu">Vendu</option>
              </select>
            ) : (
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.statut)}`}>
                {getStatutLabel(project.statut)}
              </span>
            )}
          </div>
        </div>

        {/* Meta informations */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span className="mr-2 text-gray-600" ><MapPin size={18} /></span>
            <span>{project.localisation?.ville}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className='mr-2 text-gray-600'><Home size={18}/></span>
            <span>{getTypeBienLabel(project.typeBien)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span classeName = "mr-2 text-gray-600"><Eye  size={18}/> </span>
            <span>{project.vues || 0} vues</span>
          </div>
          <div className="flex items-center gap-1">
            <span className='mr-2 text-gray-600'><Calendar size={18}/></span>
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
                  ? 'text-[#1d4370] border-b-2 border-[#1d4370] bg-blue-50' 
                  : 'text-[#1d4370] hover:text-[#27578F] hover:bg-gray-50'
                }
              `}
            >
              {tab.label}
              {tab.count !== null && (
                <span className={`
                  ml-2 px-2 py-0.5 rounded-full text-xs
                  ${activeTab === tab.id ? 'bg-[#1d4370] text-white' : 'bg-gray-200 text-gray-700'}
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
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                Images du projet
              </h2>
              <ImageUploader
                existingImages={[project.imagePrincipale, ...(project.galerie || [])].filter(Boolean)}
                onImagesChange={handleImageUpload}
                onImageDelete={handleImageDelete}
                maxImages={11}
              />
            </section>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
              {/* ✅ CORRECTION 10: Mode édition pour la description */}
              {isEditMode ? (
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  className="w-full text-gray-700 leading-relaxed border-2 border-blue-300 rounded px-4 py-2"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              )}
            </section>

            {/* Informations principales */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4"> Informations principales</h2>
              {/* ✅ CORRECTION 11: Formulaire d'édition des infos */}
              {isEditMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix (DH)</label>
                    <input
                      type="number"
                      name="prix"
                      value={formData.prix}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Surface totale (m²)</label>
                    <input
                      type="number"
                      name="caracteristiques.surfaceTotale"
                      value={formData.caracteristiques.surfaceTotale}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de chambres</label>
                    <input
                      type="number"
                      name="caracteristiques.nombreChambres"
                      value={formData.caracteristiques.nombreChambres}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1d4370]  mb-1">Salles de bain</label>
                    <input
                      type="number"
                      name="caracteristiques.nombreSallesBain"
                      value={formData.caracteristiques.nombreSallesBain}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoCard icon={<DollarSign size={18} className="text-[#1d4370]" />} label="Prix" value={formatPrice(project.prix)} />
                  <InfoCard 
                    icon={<Square size={18} className="text-[#1d4370]" />}
                    label="Surface totale" 
                    value={formatSurface(project.caracteristiques?.surfaceTotale)} 
                  />
                  <InfoCard 
                    icon={<Calendar size={18} className="text-[#1d4370]" />}
                    label="Date début" 
                    value={formatDate(project.dateDebut)} 
                  />
                  {project.dateFinPrevue && (
                    <InfoCard 
                      icon={<Calendar size={18} className="text-[#1d4370]" />}
                      label="Date fin prévue" 
                      value={formatDate(project.dateFinPrevue)} 
                    />
                  )}
                  {project.caracteristiques?.nombreChambres !== undefined && (
                    <InfoCard 
                      icon={<Bed size={18} className="text-[#1d4370]" />} 
                      label="Chambres" 
                      value={project.caracteristiques.nombreChambres} 
                    />
                  )}
                  {project.caracteristiques?.nombreSallesBain !== undefined && (
                    <InfoCard 
                      icon={<ShowerHead size={18} className="text-[#1d4370]" />} 
                      label="Salles de bain" 
                      value={project.caracteristiques.nombreSallesBain} 
                    />
                  )}
                </div>
              )}
            </section>

            {/* Équipements booléens */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Équipements</h2>
              {/* ✅ CORRECTION 12: Checkboxes en mode édition */}
              {isEditMode ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['ascenseur', 'balcon', 'terrasse', 'garage', 'jardin', 'piscine', 'climatisation', 'chauffage', 'securite', 'gardien', 'meuble'].map(equip => (
                    <label key={equip} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name={`caracteristiques.${equip}`}
                        checked={formData.caracteristiques[equip]}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm capitalize">{equip.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {project.caracteristiques?.ascenseur && (
                    <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Ascenseur
                    </span>
                  )}
                  {project.caracteristiques?.balcon && (
                    <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Balcon
                    </span>
                  )}
                  {project.caracteristiques?.terrasse && (
                    <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Terrasse
                    </span>
                  )}
                  {project.caracteristiques?.garage && (
                    <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Garage
                    </span>
                  )}
                  {project.caracteristiques?.jardin && (
                    <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Jardin
                    </span>
                  )}
                  {project.caracteristiques?.piscine && (
                    <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Piscine
                    </span>
                  )}
                  {project.caracteristiques?.climatisation && (
                    <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Climatisation
                    </span>
                  )}
                  {project.caracteristiques?.chauffage && (
                    <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Chauffage
                    </span>
                  )}
                  {project.caracteristiques?.securite && (
                    <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Sécurité
                    </span>
                  )}
                  {project.caracteristiques?.gardien && (
                    <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Gardien
                    </span>
                  )}
                  {project.caracteristiques?.meuble && (
                    <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Meublé
                    </span>
                  )}
                </div>
              )}
            </section>
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

        {/* Onglet Localisation */}
        {activeTab === 'localisation' && (
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4"> Adresse</h2>
              {/* ✅ CORRECTION 13: Mode édition pour la localisation */}
              {isEditMode ? (
                
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                    <input
                      type="text"
                      name="localisation.ville"
                      value={formData.localisation.ville}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quartier</label>
                    <input
                      type="text"
                      name="localisation.quartier"
                      value={formData.localisation.quartier}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <input
                      type="text"
                      name="localisation.adresse"
                      value={formData.localisation.adresse}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                    <input
                      type="text"
                      name="localisation.codePostal"
                      value={formData.localisation.codePostal}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                  <InfoRow label="Ville" value={project.localisation?.ville} />
                  <InfoRow label="Quartier" value={project.localisation?.quartier} />
                  <InfoRow label="Adresse" value={project.localisation?.adresse} />
                  {project.localisation?.codePostal && (
                    <InfoRow label="Code postal" value={project.localisation.codePostal} />
                  )}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">Carte</h2>
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
  <div className="bg-blue-50 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-semibold text-[#1d4370]">{label}</span>
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