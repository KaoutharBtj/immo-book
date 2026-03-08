import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../../hooks/useProjects';
import ProjectCard from './ProjectCard';
import ProjectFilters from './/ProjectFilters';
import { Folder } from 'lucide-react';

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
  } = useProjects({ page: 1, limit: 10 });

  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId);
    } catch (err) {
      alert('Erreur lors de la suppression: ' + err.message);
    }
  };

  const handleCreateProject = () => {
    navigate('/promoteur/mes-projets');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            Mes Projets
          </h1>
          <button 
            onClick={() => navigate('/promoteur/mes-projets/creer-projet')}
            className="w-full sm:w-auto bg-[#1d4370]  hover:bg-[#27578F]  text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
          >
            Nouveau Projet
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div >
                <p className="text-2xl font-bold text-gray-800">{pagination.total}</p>
                <p className="text-sm text-gray-600">Total projets</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-2xl font-bold text-[#a18651]">
                  {projects.filter(p => p.statut === 'termine').length}
                </p>
                <p className="text-sm text-gray-600">Terminés</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-2xl font-bold text-black">
                  {projects.filter(p => p.statut === 'en_cours').length}
                </p>
                <p className="text-sm text-gray-600">En cours</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-2xl font-bold text-[#a18651]">
                  {projects.filter(p => p.statut === 'Vendu').length}
                </p>
                <p className="text-sm text-gray-600">Vendu</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProjectFilters
        onApplyFilters={applyFilters}
        onResetFilters={resetFilters}
      />

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Chargement des projets...</p>
        </div>
      )}


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

      {!loading && projects.length === 0 && (
        
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className=" mb-4 flex justify-center "><Folder size={90} color="black" strokeWidth={1}/></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Aucun projet trouvé
          </h2>
          <p className="text-gray-600 mb-6">
            Commencez par créer votre premier projet immobilier
          </p>
          <button 
            onClick = {() => navigate('/promoteur/mes-projets/creer-projet')}
            className="bg-[#1d4370] hover:bg-[#27578F]  text-white py-3 px-8 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center gap-2"
          >
            Créer mon premier projet
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;