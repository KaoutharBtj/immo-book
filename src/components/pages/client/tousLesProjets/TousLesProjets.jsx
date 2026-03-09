import React from 'react';
import { useNavigate } from "react-router-dom";
import { useProjects } from '../../../../hooks/useProjects';
import ProjectCard from '../../../shared/ProjectCard';
import ProjectFilters from '../../../shared/ProjectFilters';
import { Folder } from 'lucide-react';

const TousLesProjets = () => {
    const navigate = useNavigate();
    const {
        projects,
        loading,
        error,
        pagination,
        applyFilters,
        resetFilters,
        changePage
    } = useProjects({ page: 1, limit: 10});

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

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
                        isClient= {true}
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
                </div>
                )}
        </div>
    )
}

export default TousLesProjets;