// services/projectService.js
import api from './api';

/**
 * Service de gestion des projets
 */
const projectService = {
  /**
   * Créer un nouveau projet
   */
  createProject: async (projectData) => {
    try {
      const response = await api.post('/projects', projectData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Récupérer tous mes projets avec filtres et pagination
   */
  getMyProjects: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.statut) params.append('statut', filters.statut);
      if (filters.typeBien) params.append('typeBien', filters.typeBien);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);

      const response = await api.get(`/projets/mes-projets?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Récupérer un projet par ID
   */
  getProjectById: async (projectId) => {
    try {
      const response = await api.get(`/projets/mes-projets/${projectId}`);
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur API getProjectById:", error);
      throw error.response?.data || error;
    }
  },

  /**
   * Mettre à jour un projet
   */
  updateProject: async (projectId, projectData) => {
    try {
      const response = await api.put(`/projets/mes-projets/${projectId}`, projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Supprimer un projet
   */
  deleteProject: async (projectId) => {
    try {
      const response = await api.delete(`/projets/mes-projets/${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Rechercher des projets (pour les clients)
   */
  searchProjects: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.typeBien) params.append('typeBien', filters.typeBien);
      if (filters.ville) params.append('ville', filters.ville);
      if (filters.prixMin) params.append('prixMin', filters.prixMin);
      if (filters.prixMax) params.append('prixMax', filters.prixMax);
      if (filters.surfaceMin) params.append('surfaceMin', filters.surfaceMin);
      if (filters.surfaceMax) params.append('surfaceMax', filters.surfaceMax);
      if (filters.nombreChambres) params.append('nombreChambres', filters.nombreChambres);
      if (filters.statut) params.append('statut', filters.statut);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);

      const response = await api.get(`/projets/search/?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Upload des images du projet
   */
  uploadProjectImages: async (projectId, images) => {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await api.post(`/projets/mes-projets/${projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Supprimer une image du projet
   */
  deleteProjectImage: async (projectId, imageUrl) => {
    try {
      const response = await api.delete(`/projets/mes-projets/${projectId}`, {
        data: { imageUrl }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default projectService;