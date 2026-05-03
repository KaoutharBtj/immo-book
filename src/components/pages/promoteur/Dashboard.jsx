import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardService from '../../../services/promoteurServices/dashboardService';
import { 
    FolderOpen, Eye, CalendarCheck, Clock, 
    CheckCircle, XCircle, Star, TrendingUp, Plus
} from 'lucide-react';
import { formatPrice, formatDate } from '../../../utils/formatters';

const API_URL = 'http://localhost:3000';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            const data = await dashboardService.getStats();
            setStats(data.data);
        } catch (err) {
            setError(err.message || 'Erreur lors du chargement');
        } finally {
            setLoading(false);
        }
    };

    const getStatutLabel = (statut) => {
        const labels = {
            'en attente': { label: 'En attente', class: 'bg-yellow-100 text-yellow-700' },
            'acceptée': { label: 'Acceptée', class: 'bg-green-100 text-green-700' },
            'refusée': { label: 'Refusée', class: 'bg-red-100 text-red-700' }
        };
        return labels[statut] || labels['en attente'];
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#1d4370] mb-4"></div>
                <p className="text-gray-600">Chargement du tableau de bord...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-lg">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    const { kpis, projectsByStatut, topProjectsByViews, reservationsPerProject, recentReservations, recentReviews } = stats;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
                    <p className="text-gray-500 mt-1">Vue d'ensemble de votre activité</p>
                </div>
                <button
                    onClick={() => navigate('/promoteur/mes-projets/creer-projet')}
                    className="flex items-center gap-2 bg-[#1d4370] hover:bg-[#27578F] text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                    <Plus size={18}/>
                    Nouveau projet
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-[#1d4370]">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500">Total projets</p>
                        <FolderOpen size={20} className="text-[#1d4370]"/>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{kpis.totalProjects}</p>
                </div>

                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-[#a18651]">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500">Total vues</p>
                        <Eye size={20} className="text-[#a18651]"/>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{kpis.totalVues}</p>
                </div>

                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500">Réservations acceptées</p>
                        <CheckCircle size={20} className="text-green-500"/>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{kpis.reservationsAcceptees}</p>
                </div>

                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-400">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500">En attente</p>
                        <Clock size={20} className="text-yellow-500"/>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{kpis.reservationsEnAttente}</p>
                </div>
            </div>

            {/* Second row KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-red-400">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500">Réservations refusées</p>
                        <XCircle size={20} className="text-red-400"/>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{kpis.reservationsRefusees}</p>
                </div>

                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-purple-400">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500">Note moyenne</p>
                        <Star size={20} className="text-yellow-400"/>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{kpis.averageRating} ★</p>
                </div>

                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-400">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500">Total avis</p>
                        <TrendingUp size={20} className="text-blue-400"/>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{kpis.totalReviews}</p>
                </div>

                <div className="bg-white rounded-xl shadow p-5 border-l-4 border-[#1d4370]">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500">Total réservations</p>
                        <CalendarCheck size={20} className="text-[#1d4370]"/>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{kpis.totalReservations}</p>
                </div>
            </div>

            {/* Projects by statut + Top projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Projects by statut */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Projets par statut</h2>
                    <div className="space-y-3">
                        {[
                            { key: 'a_venir', label: 'À venir', color: 'bg-purple-400' },
                            { key: 'en_cours', label: 'En cours', color: 'bg-blue-400' },
                            { key: 'termine', label: 'Terminés', color: 'bg-green-400' },
                            { key: 'vendu', label: 'Vendus', color: 'bg-[#a18651]' },
                        ].map(item => (
                            <div key={item.key}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">{item.label}</span>
                                    <span className="font-semibold">{projectsByStatut[item.key]}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                        className={`${item.color} h-2 rounded-full transition-all`}
                                        style={{ width: kpis.totalProjects > 0 ? `${(projectsByStatut[item.key] / kpis.totalProjects) * 100}%` : '0%' }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top projects by views */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Top projets par vues</h2>
                    <div className="space-y-3">
                        {topProjectsByViews.map((project, index) => (
                            <div key={project._id} className="flex items-center gap-3">
                                <span className="w-7 h-7 rounded-full bg-[#1d4370] text-white text-xs flex items-center justify-center font-bold">
                                    {index + 1}
                                </span>
                                {project.imagePrincipale ? (
                                    <img src={`${API_URL}/${project.imagePrincipale}`} className="w-10 h-10 rounded-lg object-cover"/>
                                ) : (
                                    <div className="w-10 h-10 rounded-lg bg-gray-200"/>
                                )}
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">{project.titre}</p>
                                    <p className="text-xs text-gray-500">{project.vues} vues</p>
                                </div>
                                <Eye size={16} className="text-[#a18651]"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent reservations + Recent reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent reservations */}
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-800">Dernières réservations</h2>
                        <button
                            onClick={() => navigate('/promoteur/reservations')}
                            className="text-sm text-[#1d4370] hover:text-[#27578F] font-medium"
                        >
                            Voir tout →
                        </button>
                    </div>
                    <div className="space-y-3">
                        {recentReservations.length === 0 ? (
                            <p className="text-gray-500 text-sm text-center py-4">Aucune réservation</p>
                        ) : (
                            recentReservations.map(r => {
                                const statut = getStatutLabel(r.statut);
                                return (
                                    <div key={r._id} className="flex items-center justify-between py-2 border-b last:border-0">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">{r.project?.titre}</p>
                                            <p className="text-xs text-gray-500">{r.client?.nom} {r.client?.prenom}</p>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statut.class}`}>
                                            {statut.label}
                                        </span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Recent reviews */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Derniers avis</h2>
                    <div className="space-y-3">
                        {recentReviews.length === 0 ? (
                            <p className="text-gray-500 text-sm text-center py-4">Aucun avis</p>
                        ) : (
                            recentReviews.map(r => (
                                <div key={r._id} className="flex items-center justify-between py-2 border-b last:border-0">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{r.project?.titre}</p>
                                        <p className="text-xs text-gray-500">{r.client?.nom} {r.client?.prenom}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[1,2,3,4,5].map(star => (
                                            <span key={star} className={star <= r.stars ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Actions rapides</h2>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => navigate('/promoteur/mes-projets/creer-projet')}
                        className="flex items-center gap-2 bg-[#1d4370] hover:bg-[#27578F] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                        <Plus size={16}/>
                        Créer un projet
                    </button>
                    <button
                        onClick={() => navigate('/promoteur/mes-projets')}
                        className="flex items-center gap-2 bg-white border border-[#1d4370] text-[#1d4370] hover:bg-blue-50 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                        <FolderOpen size={16}/>
                        Mes projets
                    </button>
                    <button
                        onClick={() => navigate('/promoteur/reservations')}
                        className="flex items-center gap-2 bg-white border border-[#a18651] text-[#a18651] hover:bg-amber-50 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                        <CalendarCheck size={16}/>
                        Réservations
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;