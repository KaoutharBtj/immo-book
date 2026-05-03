import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import reservationService from '../../../services/promoteurServices/reservationService';
import { Clock, CheckCircle, XCircle, MapPin, Calendar, User } from 'lucide-react';
import { formatDate, formatPrice } from '../../../utils/formatters';

const API_URL = 'http://localhost:3000';

const PromoReservations = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        loadReservations();
    }, []);

    const loadReservations = async () => {
        try {
            setLoading(true);
            const data = await reservationService.getMyReservations();
            console.log('Reservations promoteur data', data);
            setReservations(data.reservations || data.data || []);
        } catch (err) {
            setError(err.message || 'Erreur lors du chargement');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (reservationId) => {
        try {
            await reservationService.approveReservation(reservationId);
            await loadReservations();
        } catch (err) {
            alert('Erreur: ' + err.message);
        }
    };

    const handleRefuse = async (reservationId) => {
        try {
            await reservationService.refuseReservation(reservationId);
            await loadReservations();
        } catch (err) {
            alert('Erreur: ' + err.message);
        }
    };

    const getStatutConfig = (statut) => {
        const config = {
            'en attente': { 
                label: 'En attente', 
                icon: <Clock size={16}/>, 
                class: 'bg-yellow-100 text-yellow-700 border-yellow-200' 
            },
            'acceptée': { 
                label: 'Acceptée', 
                icon: <CheckCircle size={16}/>, 
                class: 'bg-green-100 text-green-700 border-green-200' 
            },
            'refusée': { 
                label: 'Refusée', 
                icon: <XCircle size={16}/>, 
                class: 'bg-red-100 text-red-700 border-red-200' 
            }
        };
        return config[statut] || config['en attente'];
    };

    const filteredReservations = reservations.filter(r => {
        if (activeFilter === 'all') return true;
        return r.statut === activeFilter;
    });

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#1d4370] mb-4"></div>
                <p className="text-gray-600">Chargement des réservations...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Réservations</h1>
                <p className="text-gray-600">Gérez les demandes de réservation de vos projets</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-yellow-400">
                    <p className="text-2xl font-bold text-yellow-500">
                        {reservations.filter(r => r.statut === 'en attente').length}
                    </p>
                    <p className="text-sm text-gray-600">En attente</p>
                </div>
                <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-green-400">
                    <p className="text-2xl font-bold text-green-500">
                        {reservations.filter(r => r.statut === 'acceptée').length}
                    </p>
                    <p className="text-sm text-gray-600">Acceptées</p>
                </div>
                <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-red-400">
                    <p className="text-2xl font-bold text-red-500">
                        {reservations.filter(r => r.statut === 'refusée').length}
                    </p>
                    <p className="text-sm text-gray-600">Refusées</p>
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-6">
                {[
                    { key: 'all', label: 'Toutes' },
                    { key: 'en attente', label: 'En attente' },
                    { key: 'acceptée', label: 'Acceptées' },
                    { key: 'refusée', label: 'Refusées' }
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveFilter(tab.key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeFilter === tab.key
                            ? 'bg-[#1d4370] text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Reservations list */}
            {filteredReservations.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Aucune réservation</h2>
                    <p className="text-gray-600">Aucune réservation trouvée pour ce filtre</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredReservations.map(reservation => {
                        const statut = getStatutConfig(reservation.statut);
                        const project = reservation.project;
                        const client = reservation.client;
                        return (
                            <div key={reservation._id} className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    {/* Image */}
                                    <div className="w-full md:w-48 h-40 md:h-auto flex-shrink-0">
                                        {project?.imagePrincipale ? (
                                            <img
                                                src={`${API_URL}/${project.imagePrincipale}`}
                                                alt={project.titre}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-400">Aucune image</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-1">{project?.titre}</h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <User size={14}/>
                                                    <span>{client?.nom} {client?.prenom}</span>
                                                    <span>•</span>
                                                    <span>{client?.email}</span>
                                                </div>
                                            </div>
                                            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${statut.class}`}>
                                                {statut.icon}
                                                {statut.label}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                            <div className="flex items-center gap-1">
                                                <MapPin size={16} className="text-[#1d4370]"/>
                                                <span>{project?.localisation?.ville}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar size={16} className="text-[#1d4370]"/>
                                                <span>Demandé le {formatDate(reservation.createdAt)}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-[#a18651]">
                                                {formatPrice(project?.prix)}
                                            </span>
                                            {reservation.statut === 'en attente' && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleApprove(reservation._id)}
                                                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        <CheckCircle size={16}/>
                                                        Approuver
                                                    </button>
                                                    <button
                                                        onClick={() => handleRefuse(reservation._id)}
                                                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        <XCircle size={16}/>
                                                        Refuser
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PromoReservations;