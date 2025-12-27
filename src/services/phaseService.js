// services/phaseService.js
import api from './api';

/**
 * Service de gestion des phases de projet
 */
const phaseService = {
  /**
   * Ajouter une phase à un projet
   */
  addPhase: async (projectId, phaseData) => {
    try {
      const response = await api.post(`/projets/mes-prjets/${projectId}/phases`, phaseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Mettre à jour une phase
   */
  updatePhase: async (projectId, phaseId, phaseData) => {
    try {
      const response = await api.put(`/projets/${projectId}/phases/${phaseId}`, phaseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Supprimer une phase
   */
  deletePhase: async (projectId, phaseId) => {
    try {
      const response = await api.delete(`/projets/mes-projets/${projectId}/phases/${phaseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Upload des images d'une phase
   */
  uploadPhaseImages: async (projectId, phaseId, images) => {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await api.post(
        `/projets/mes-projets/${projectId}/phases/${phaseId}/images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Supprimer une image d'une phase
   */
  deletePhaseImage: async (projectId, phaseId, imageUrl) => {
    try {
      const response = await api.delete(
        `/projects/mes-projets/${projectId}/phases/${phaseId}/images`,
        {
          data: { imageUrl }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default phaseService;