// pages/promoteur/ProjectList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import ProjectCard from '../../components/promoteur/ProjectCard';
import ProjectFilters from '../../components/promoteur/ProjectFilters';

const ProjectList = () => {
  const navigate = useNavigate();
  const {
    projects,
    loading,
    error,
    pagination,
    deleteProject,
    applyFilters,
    resetFilters,
    changePage
  } = useProjects({ page: 1, limit: 12 });

  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId);
    } catch (err) {
      alert('Erreur lors de la suppression: ' + err.message);
    }
  };

  const handleCreateProject = () => {
    navigate('/promoteur/projets/nouveau');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            🏗️ Mes Projets
          </h1>
          <button 
            onClick={handleCreateProject}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
          >
            ➕ Nouveau Projet
          </button>
        </div>
        
        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <div>
                <p className="text-2xl font-bold text-gray-800">{pagination.total}</p>
                <p className="text-sm text-gray-600">Total projets</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <span className="text-3xl">✅</span>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {projects.filter(p => p.statut === 'termine').length}
                </p>
                <p className="text-sm text-gray-600">Terminés</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔄</span>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {projects.filter(p => p.statut === 'en_cours').length}
                </p>
                <p className="text-sm text-gray-600">En cours</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📅</span>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {projects.filter(p => p.statut === 'planifie').length}
                </p>
                <p className="text-sm text-gray-600">Planifiés</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <ProjectFilters
        onApplyFilters={applyFilters}
        onResetFilters={resetFilters}
      />

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
          <p className="font-medium">⚠️ {error}</p>
        </div>
      )}

      {/* Chargement */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Chargement des projets...</p>
        </div>
      )}

      {/* Liste des projets */}
      {!loading && projects.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map(project => (
              <ProjectCard
                key={project._id}
                project={project}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => changePage(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Précédent
              </button>
              
              <span className="text-gray-700 font-medium">
                Page {pagination.currentPage} sur {pagination.totalPages}
              </span>

              <button
                onClick={() => changePage(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Suivant →
              </button>
            </div>
          )}
        </>
      )}

      {/* Aucun projet */}
      {!loading && projects.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4 opacity-50">📁</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Aucun projet trouvé
          </h2>
          <p className="text-gray-600 mb-6">
            Commencez par créer votre premier projet immobilier
          </p>
          <button 
            onClick={handleCreateProject}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center gap-2"
          >
            ➕ Créer mon premier projet
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;