import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import clientReservationService from '../../../services/clientServices/clientReservationService';
import { Home, Calendar, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';
import { formatDate, formatPrice } from '../../../utils/formatters';

const API_URL = 'http://localhost:3000';

const MesReservations = () => {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadReservations();
    }, []);
    const loadReservations = async () => {
        try {
            setLoading(true);
            const data = await clientReservationService.getMyReservation();
            console.log('reservations data:', data);
            setReservations(data.reservation || []);
        } catch (err) {
            setError(err.message || 'Erreur lors du chargement');
        } finally {
            setLoading(false);
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

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                <p className="text-gray-600">Chargement de vos réservations...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div
                className="relative rounded-xl overflow-hidden mb-8 shadow-xl h-110"
                style={{ 
                    backgroundImage: `url('/assets/clientReservationPicture.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-10">
                    <h1 className="text-4xl font-bold text-white mb-2">Mes Réservations</h1>
                    <p className="text-gray-200">Suivez l'état de vos demandes de réservation</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-500">{reservations.filter(r => r.statut === 'en attente').length}</p>
                    <p className="text-sm text-gray-600">En attente</p>
                </div>
                <div className="bg-white rounded-xl shadow p-4 text-center">
                    <p className="text-2xl font-bold text-green-500">{reservations.filter(r => r.statut === 'acceptée').length}</p>
                    <p className="text-sm text-gray-600">Acceptées</p>
                </div>
                <div className="bg-white rounded-xl shadow p-4 text-center">
                    <p className="text-2xl font-bold text-red-500">{reservations.filter(r => r.statut === 'refusée').length}</p>
                    <p className="text-sm text-gray-600">Refusées</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
                    <p className="font-medium">{error}</p>
                </div>
            )}

            {reservations.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-12 text-center">
                    <p className="flex justify-center text-5xl mb-4"><Home size={50} strokeWidth={1.5}/></p>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Aucune réservation</h2>
                    <p className="text-gray-600 mb-6">Vous n'avez pas encore effectué de réservation</p>
                    <button
                        onClick={() => navigate('/client/projets')}
                        className="bg-[#1d4370] hover:bg-[#27578F] text-white py-3 px-6 rounded-lg font-medium transition-colors"
                    >
                        Voir les projets
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {reservations.map(reservation => {
                        const statut = getStatutConfig(reservation.statut);
                        const project = reservation.project;
                        return (
                            <div key={reservation._id} className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden">
                                <div className="flex flex-col md:flex-row">
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

                                    <div className="flex-1 p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-xl font-bold text-gray-800">{project?.titre}</h3>
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
                                                <span>Réservé le {formatDate(reservation.createdAt)}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-[#a18651]">
                                                {formatPrice(project?.prix)}
                                            </span>
                                            <button
                                                onClick={() => navigate(`/client/projets/${project?._id}`)}
                                                className="bg-[#1d4370] hover:bg-[#27578F] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                Voir le projet
                                            </button>
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

export default MesReservations;