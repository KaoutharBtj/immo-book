// pages/promoteur/CreateProject.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectService from '../../services/projectService';
import { TYPE_BIEN, STATUT_PROJET, VILLES_MAROC } from '../../utils/constants';

const CreateProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    typeBien: 'appartement',
    statut: 'en_cours',
    prix: '',
    dateDebut: '',
    dateFinPrevue: '',
    imagePrincipale: null, 
    localisation: {
      adresse: '',
      ville: '',
      codePostal: '',
      quartier: '',
      coordinates: {
        latitude: '',
        longitude: ''
      }
    },
    caracteristiques: {
      surfaceTotale: '',
      nombreChambres: 0,
      nombreSallesBain: 0,
      nombreSallesEau: 0,
      etage: 0,
      ascenseur: false,
      balcon: false,
      terrasse: false,
      surfaceTerrasse: 0,
      garage: false,
      nombrePlacesParking: 0,
      surfaceTerrain: 0,
      jardin: false,
      piscine: false,
      openSpace: false,
      nombreBureaux: 0,
      salleReunion: false,
      mezzanine: false,
      hauteurSousPlafond: 0,
      vitrine: false,
      constructible: false,
      viabilise: false,
      zoneConstruction: '',
      climatisation: false,
      chauffage: false,
      cuisine: 'non_equipee',
      meuble: false,
      securite: false,
      gardien: false
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0] 
      }));
    } else if (name.includes('.')) {
      const keys = name.split('.');
      if (keys.length === 2) {
        const [parent, child] = keys;
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: type === 'checkbox' ? checked : value
          }
        }));
      } else if (keys.length === 3) {
        const [parent, child, grandchild] = keys;
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: {
              ...prev[parent][child],
              [grandchild]: value
            }
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('=== FRONTEND DEBUG ===');
    console.log('1. Fichier sélectionné:', formData.imagePrincipale);
    console.log('2. Est un File?', formData.imagePrincipale instanceof File);
    console.log('3. Nom du fichier:', formData.imagePrincipale?.name);


    try {
      // Validation
      if (!formData.imagePrincipale) {
        setError('Veuillez sélectionner une image principale');
        setLoading(false);
        return;
      }

      if (!formData.localisation.adresse || !formData.localisation.ville) {
        setError('L\'adresse et la ville sont requises');
        setLoading(false);
        return;
      }

      if (!formData.localisation.coordinates.latitude || !formData.localisation.coordinates.longitude) {
        setError('Les coordonnées GPS sont requises');
        setLoading(false);
        return;
      }

      if (!formData.caracteristiques.surfaceTotale) {
        setError('La surface totale est requise');
        setLoading(false);
        return;
      }

      // Créer FormData pour envoyer l'image
      const data = new FormData();
      
      // Ajouter l'image
      data.append('imagePrincipale', formData.imagePrincipale);
      
      // Ajouter les champs de base
      data.append('titre', formData.titre);
      data.append('description', formData.description);
      data.append('typeBien', formData.typeBien);
      data.append('statut', formData.statut);
      data.append('prix', formData.prix);
      data.append('dateDebut', formData.dateDebut);
      
      if (formData.dateFinPrevue) {
        data.append('dateFinPrevue', formData.dateFinPrevue);
      }

      // Ajouter les champs de localisation individuellement
      data.append('adresse', formData.localisation.adresse);
      data.append('ville', formData.localisation.ville);
      data.append('latitude', formData.localisation.coordinates.latitude);
      data.append('longitude', formData.localisation.coordinates.longitude);
      
      if (formData.localisation.codePostal) {
        data.append('codePostal', formData.localisation.codePostal);
      }
      if (formData.localisation.quartier) {
        data.append('quartier', formData.localisation.quartier);
      }

      // Ajouter la surface totale
      data.append('surfaceTotale', formData.caracteristiques.surfaceTotale);

      // Ajouter les autres caractéristiques
      data.append('nombreChambres', formData.caracteristiques.nombreChambres);
      data.append('nombreSallesBain', formData.caracteristiques.nombreSallesBain);
      data.append('nombreSallesEau', formData.caracteristiques.nombreSallesEau);
      data.append('etage', formData.caracteristiques.etage);
      data.append('ascenseur', formData.caracteristiques.ascenseur);
      data.append('balcon', formData.caracteristiques.balcon);
      data.append('terrasse', formData.caracteristiques.terrasse);
      data.append('garage', formData.caracteristiques.garage);
      data.append('jardin', formData.caracteristiques.jardin);
      data.append('piscine', formData.caracteristiques.piscine);
      data.append('climatisation', formData.caracteristiques.climatisation);
      data.append('chauffage', formData.caracteristiques.chauffage);
      data.append('cuisine', formData.caracteristiques.cuisine);
      data.append('meuble', formData.caracteristiques.meuble);
      data.append('securite', formData.caracteristiques.securite);
      data.append('gardien', formData.caracteristiques.gardien);

      console.log('Données envoyées:');
      for (let pair of data.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await projectService.createProject(data);
      
      if (response.success) {
        alert('Projet créé avec succès !');
        navigate('/promoteur/mes-projets');
      } else {
        setError(response.message || 'Erreur lors de la création du projet');
      }
    } catch (err) {
      console.error('Erreur création projet:', err);
      setError(err.response?.data?.message || err.message || 'Erreur lors de la création du projet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Créer un nouveau projet</h1>
        <button 
          type="button"
          onClick={() => navigate('/promoteur/mes-projets')}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Retour
        </button>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
          <p className="font-medium">⚠️ {error}</p>
        </div>
      )}

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        
        {/* Informations de base */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Informations de base</h2>
          
          <div className="space-y-4">
            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre du projet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                required
                maxLength={200}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Résidence Al Majd - Appartements standing"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                maxLength={5000}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Décrivez votre projet immobilier..."
              />
            </div>

            {/* Type de bien et Statut */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de bien <span className="text-red-500">*</span>
                </label>
                <select
                  name="typeBien"
                  value={formData.typeBien}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="appartement">Appartement</option>
                  <option value="villa">Villa</option>
                  <option value="studio">Studio</option>
                  <option value="bureau">Bureau</option>
                  <option value="local_commercial">Local commercial</option>
                  <option value="terrain_industriel">Terrain industriel</option>
                  <option value="terrain_agricole">Terrain agricole</option>
                  <option value="terrain_residentiel">Terrain résidentiel</option>
                  <option value="immeuble">Immeuble</option>
                  <option value="riad">Riad</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut <span className="text-red-500">*</span>
                </label>
                <select
                  name="statut"
                  value={formData.statut}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="a_venir">À venir</option>
                  <option value="en_cours">En cours</option>
                  <option value="termine">Terminé</option>
                  <option value="vendu">Vendu</option>
                </select>
              </div>
            </div>

            {/* Prix */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prix (DH) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 1500000"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de début <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateDebut"
                  value={formData.dateDebut}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de fin prévue
                </label>
                <input
                  type="date"
                  name="dateFinPrevue"
                  value={formData.dateFinPrevue}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Image principale */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image principale <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="imagePrincipale"
                onChange={handleChange}
                required
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.imagePrincipale && (
                <p className="text-sm text-gray-600 mt-1">
                  Fichier sélectionné: {formData.imagePrincipale.name}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Localisation */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">📍 Localisation</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ville <span className="text-red-500">*</span>
                </label>
                <select
                  name="localisation.ville"
                  value={formData.localisation.ville}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sélectionnez une ville</option>
                  {VILLES_MAROC.map(ville => (
                    <option key={ville} value={ville}>{ville}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quartier
                </label>
                <input
                  type="text"
                  name="localisation.quartier"
                  value={formData.localisation.quartier}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Hay Riad"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="localisation.adresse"
                value={formData.localisation.adresse}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Avenue Mohammed VI"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code postal
                </label>
                <input
                  type="text"
                  name="localisation.codePostal"
                  value={formData.localisation.codePostal}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 10000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.000001"
                  name="localisation.coordinates.latitude"
                  value={formData.localisation.coordinates.latitude}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 33.9716"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.000001"
                  name="localisation.coordinates.longitude"
                  value={formData.localisation.coordinates.longitude}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: -6.8498"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Caractéristiques */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">📐 Caractéristiques</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Surface totale (m²) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="caracteristiques.surfaceTotale"
                  value={formData.caracteristiques.surfaceTotale}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de chambres
                </label>
                <input
                  type="number"
                  name="caracteristiques.nombreChambres"
                  value={formData.caracteristiques.nombreChambres}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salles de bain
                </label>
                <input
                  type="number"
                  name="caracteristiques.nombreSallesBain"
                  value={formData.caracteristiques.nombreSallesBain}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Équipements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Équipements
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { name: 'ascenseur', label: 'Ascenseur' },
                  { name: 'balcon', label: 'Balcon' },
                  { name: 'terrasse', label: 'Terrasse' },
                  { name: 'garage', label: 'Garage' },
                  { name: 'jardin', label: 'Jardin' },
                  { name: 'piscine', label: 'Piscine' },
                  { name: 'climatisation', label: 'Climatisation' },
                  { name: 'chauffage', label: 'Chauffage' },
                  { name: 'securite', label: 'Sécurité' },
                  { name: 'gardien', label: 'Gardien' },
                  { name: 'meuble', label: 'Meublé' }
                ].map(equip => (
                  <label key={equip.name} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={`caracteristiques.${equip.name}`}
                      checked={formData.caracteristiques[equip.name]}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm">{equip.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Boutons d'action */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/promoteur/mes-projets')}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Création en cours...' : '✓ Créer le projet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;