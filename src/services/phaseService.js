
import api from './api';

const phaseService = {

  addPhase: async (projectId, phaseData) => {
    try {
        const formData = new FormData();
        formData.append('titre', phaseData.titre);
        formData.append('description', phaseData.description);
        if (phaseData.dateDebut) formData.append('dateDebut', phaseData.dateDebut);
        if (phaseData.dateFin) formData.append('dateFin', phaseData.dateFin);
        if (phaseData.statut) formData.append('statut', phaseData.statut);
      const response = await api.post(`/projets/mes-projets/${projectId}/phases`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updatePhase: async (projectId, phaseId, phaseData) => {
    try {
      const response = await api.put(`/projets/mes-projets/${projectId}/phases/${phaseId}`, phaseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deletePhase: async (projectId, phaseId) => {
    try {
      const response = await api.delete(`/projets/mes-projets/${projectId}/phases/${phaseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  uploadPhaseImages: async (projectId, phaseId, images) => {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await api.post(
        `/projets/mes-projets/${projectId}/phases/${phaseId}`,
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

  deletePhaseImage: async (projectId, phaseId, imageUrl) => {
    try {
      const response = await api.delete(
        `/projets/mes-projets/${projectId}/phases/${phaseId}/images`,
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