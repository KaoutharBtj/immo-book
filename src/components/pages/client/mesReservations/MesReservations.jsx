import React from 'react';
import { useNavigate } from "react-router-dom";
import { useProjects } from '../../../../hooks/useProjects';
import ProjectFilters from '../../../shared/ProjectFilters';

const MesReservations = () => {
    const navigate = useNavigate();
    const {
        projects,
        loading,
        error,
        pagination,
        applyFilters,
        resetFilters,
        changePage,
        reloadProjects
    } = useProjects({ page: 1, limit: 10}, true);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div 
            className="relative rounded-2xl overflow-hidden mb-8 shadow-xl h-80"
            style={{ 
                backgroundImage: `url('/assets/clientProjectPicture.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0 bg-black opacity-30"></div>

            <div className="relative z-10 flex flex-col justify-center items-center h-full px-10 gap-6 text-center">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
                        Découvrez nos projets immobiliers
                    </h1>
                    <p className="text-gray-200 text-lg">
                        Trouvez le bien de vos rêves parmi nos projets soigneusement sélectionnés à travers tout le Maroc.
                    </p>
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
            </div>
    )
};

export default MesReservations;