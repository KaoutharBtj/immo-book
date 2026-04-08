import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clientFavorisService from '../../../services/clientServices/clientFavorisService';
import { MapPin, Heart, BadgeDollarSign, Square, Bed, Eye } from 'lucide-react';
import { formatPrice, formatSurface, formatDate, getTypeBienLabel, getStatutLabel, truncateText } from '../../../utils/formatters';

const API_URL = 'http://localhost:3000';

const MesFavoris = () => {
    const navigate = useNavigate();
    const [favoris, setFavoris] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadFavoris();
    }, []);

    const loadFavoris = async () => {
        try {
            setLoading(true);
            const data = await clientFavorisService.getMyFavoris();
            console.log('favoris data:', data);
            setFavoris(data.data || data.favoris || []);
        } catch (err) {
            setError(err.message || 'Erreur lors du chargement');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFavoris = async (projectId) => {
        try {
            await clientFavorisService.removeFavoris(projectId);
            setFavoris(prev => prev.filter(p => p._id !== projectId));
        } catch (err) {
            alert('Erreur: ' + err.message);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#1d4370] mb-4"></div>
                <p className="text-gray-600">Chargement de vos favoris...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Hero */}
            <div
                className="relative rounded-2xl overflow-hidden mb-8 shadow-xl h-64"
                style={{ 
                    backgroundImage: `url('/assets/clientProjectPicture.jpeg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-10">
                    <Heart size={40} className="text-white mb-3" fill="white"/>
                    <h1 className="text-4xl font-bold text-white mb-2">Mes Favoris</h1>
                    <p className="text-gray-200">Retrouvez tous les projets que vous avez sauvegardés</p>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow p-4 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Heart size={20} className="text-[#a18651]" fill="#a18651"/>
                    <span className="text-gray-700 font-medium">
                        {favoris.length} projet{favoris.length > 1 ? 's' : ''} sauvegardé{favoris.length > 1 ? 's' : ''}
                    </span>
                </div>
                <button
                    onClick={() => navigate('/client/projets')}
                    className="text-[#1d4370] hover:text-[#27578F] text-sm font-medium transition-colors"
                >
                    + Découvrir plus de projets
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
                    <p className="font-medium">{error}</p>
                </div>
            )}

            {/* Empty state */}
            {favoris.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-12 text-center">
                    <Heart size={80} className="text-gray-200 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Aucun favori</h2>
                    <p className="text-gray-600 mb-6">Vous n'avez pas encore sauvegardé de projets</p>
                    <button
                        onClick={() => navigate('/client/projets')}
                        className="bg-[#1d4370] hover:bg-[#27578F] text-white py-3 px-6 rounded-lg font-medium transition-colors"
                    >
                        Découvrir les projets
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favoris.map(project => (
                        <div key={project._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                {project.imagePrincipale ? (
                                    <img
                                        src={`${API_URL}/${project.imagePrincipale}`}
                                        alt={project.titre}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-400">Aucune image</span>
                                    </div>
                                )}
                                {/* Remove favoris button */}
                                <button
                                    onClick={() => handleRemoveFavoris(project._id)}
                                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50 transition-colors"
                                    title="Retirer des favoris"
                                >
                                    <Heart size={18} className="text-red-500" fill="#ef4444"/>
                                </button>
                                {/* Statut badge */}
                                <span className="absolute top-3 left-3 bg-[#1d4370] text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    {getStatutLabel(project.statut)}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{project.titre}</h3>
                                    <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                        {getTypeBienLabel(project.typeBien)}
                                    </span>
                                </div>

                                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                                    {truncateText(project.description, 80)}
                                </p>

                                <div className="space-y-1 mb-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin size={15} className="text-[#1d4370]"/>
                                        <span>{project.localisation?.ville}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <BadgeDollarSign size={15} className="text-[#a18651]"/>
                                        <span className="font-bold text-[#a18651]">{formatPrice(project.prix)}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Square size={15}/>
                                            <span>{formatSurface(project.caracteristiques?.surfaceTotale)}</span>
                                        </div>
                                        {project.caracteristiques?.nombreChambres && (
                                            <div className="flex items-center gap-1">
                                                <Bed size={15}/>
                                                <span>{project.caracteristiques.nombreChambres} ch.</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pt-3 border-t">
                                    <div className="flex items-center gap-1">
                                        <Eye size={14}/>
                                        <span>{project.vues || 0} vues</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate(`/client/projets/${project._id}`)}
                                    className="w-full bg-[#1d4370] hover:bg-[#27578F] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
                                >
                                    Voir le projet
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MesFavoris;