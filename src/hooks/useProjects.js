import { useState, useEffect, useCallback } from 'react';
import projectService from '../services/projectService';
import clientProjectService from '../services/clientServices/clientProjectService';


export const useProjects = (initialFilters = {}, isClient = false) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  const [filters, setFilters] = useState(initialFilters);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if(isClient) {
        data = await clientProjectService.getAllProjects(filters);
        setProjects(data.data);
        console.log('data from API:', data);
      } else {
        data = await projectService.getMyProjects(filters);
        setProjects(data.projects);
      }
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


  const createProject = async (projectData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.createProject(projectData);
      await loadProjects(); 
      return data;
    } catch (err) {
      setError(err.message || 'Erreur lors de la création du projet');
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const updateProject = async (projectId, projectData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.updateProject(projectId, projectData);
      await loadProjects(); 
      return data;
    } catch (err) {
      setError(err.message || 'Erreur lors de la mise à jour du projet');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.deleteProject(projectId);
      await loadProjects(); 
      return data;
    } catch (err) {
      setError(err.message || 'Erreur lors de la suppression du projet');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const changePage = (page) => {
    setFilters({ ...filters, page });
  };

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
