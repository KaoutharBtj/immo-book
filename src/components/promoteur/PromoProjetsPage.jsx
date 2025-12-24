import React, { useState, useEffect } from 'react';
import { Plus } from '../../constants/icons';
import { getMockProjets, calculateAvancementGlobal } from '../../utils/mockData';
import ProjetCard from './ProjetCard';

export default function MesProjetsPage() {
    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('tous');

    useEffect(() => {
        const mockProjets = getMockProjets();
        
        setTimeout(() => {
        setProjets(mockProjets);
        setLoading(false);
        }, 500);
    }, []);

    const projetsFiltres = filter === 'tous' 
        ? projets 
        : projets.filter(p => p.statut === filter);

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-2xl font-bold text-gray-800">Mes Projets</h1>
                <p className="text-gray-600 text-sm mt-1">
                    {projets.length} projets immobiliers
                </p>
                </div>
                <button className="flex items-center gap-2 bg-[#1d4370] text-white px-4 py-2 rounded-lg hover:bg-[#27578F] transition">
                <Plus className="w-5 h-5" />
                Nouveau Projet
                </button>
            </div>

            {/* Filtres */}
            <div className="flex gap-2 mt-4">
                {['tous', 'en_cours', 'termine', 'a_venir'].map(statut => (
                <button
                    key={statut}
                    onClick={() => setFilter(statut)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                    filter === statut
                        ? 'bg-[#1d4370] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {statut === 'tous' ? 'Tous' : 
                    statut === 'en_cours' ? 'En cours' : 
                    statut === 'termine' ? 'Terminés' : 'À venir'}
                </button>
                ))}
            </div>
            </div>
        </div>

        {/* Liste des projets */}
        <div className="max-w-7xl mx-auto px-4 py-6">
            {loading ? (
            <div className="text-center py-12">Chargement...</div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projetsFiltres.map(projet => (
                <ProjetCard 
                    key={projet._id} 
                    projet={projet} 
                    avancement={calculateAvancementGlobal(projet.phases)} 
                />
                ))}
            </div>
            )}
        </div>
        </div>
    );
}