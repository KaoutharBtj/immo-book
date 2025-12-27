// hooks/useProjects.js
import { useState, useEffect, useCallback } from 'react';
import projectService from '../services/projectService';

/**
 * Hook personnalisé pour gérer les projets
 */
export const useProjects = (initialFilters = {}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  const [filters, setFilters] = useState(initialFilters);

  /**
   * Charger les projets
   */
  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.getMyProjects(filters);
      setProjects(data.projects);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        total: data.total
      });
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des projets');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  /**
   * Créer un projet
   */
  const createProject = async (projectData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.createProject(projectData);
      await loadProjects(); // Recharger la liste
      return data;
    } catch (err) {
      setError(err.message || 'Erreur lors de la création du projet');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Mettre à jour un projet
   */
  const updateProject = async (projectId, projectData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.updateProject(projectId, projectData);
      await loadProjects(); // Recharger la liste
      return data;
    } catch (err) {
      setError(err.message || 'Erreur lors de la mise à jour du projet');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Supprimer un projet
   */
  const deleteProject = async (projectId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.deleteProject(projectId);
      await loadProjects(); // Recharger la liste
      return data;
    } catch (err) {
      setError(err.message || 'Erreur lors de la suppression du projet');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Appliquer des filtres
   */
  const applyFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  /**
   * Réinitialiser les filtres
   */
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  /**
   * Changer de page
   */
  const changePage = (page) => {
    setFilters({ ...filters, page });
  };

  // Charger les projets au montage et lors du changement des filtres
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return {
    projects,
    loading,
    error,
    pagination,
    filters,
    createProject,
    updateProject,
    deleteProject,
    applyFilters,
    resetFilters,
    changePage,
    reloadProjects: loadProjects
  };
};
