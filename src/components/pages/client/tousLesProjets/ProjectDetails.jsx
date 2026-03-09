import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clientProjectService from '../../../../services/clientServices/clientProjectService';
import PhaseList from '../../../shared/PhaseList';
import ProjectMap from '../../../shared/ProjectMap';
import { MapPin, Home, Square, DollarSign, Eye, Calendar, Bed, ShowerHead, Camera } from "lucide-react";
import { 
    formatPrice, 
    formatSurface, 
    formatDate, 
    getTypeBienLabel 
} from '../../../../utils/formatters';

const API_URL = 'http://localhost:3000';

const ClientProjectDetails = () => {
    const { id: projectId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState(null);
    const [activeTab, setActiveTab] = useState('details');
    const [error, setError] = useState('');
    
    useEffect(() => {
        if(projectId) {
            loadProject(projectId);
        }
    }, [projectId]);

    const loadProject = async (id) => {
        try {
            setLoading(true);
            setError('');
            const data = await clientProjectService.getProjectById(id);
            setProject(data.data);
        } catch (err) {
            console.error('Erreur de chargement de projet:', err);
            setError(err.message || 'Erreur lors du chargement de projet');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (statut) => {
        const colors = {
            a_venir: 'bg-purple-100 text-purple-800',
            en_cours: 'bg-blue-100 text-blue-800',
            termine: 'bg-gray-100 text-gray-800'
        };
        return colors[statut] || 'bg-gray-100 text-gray-800';
    };

    if(loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4'></div>
                <p className='text-gray-600'>Chargement du projet...</p>
            </div>
        );
    }

    if(error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className='bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-lg'>
                    <p className="font-medium mb-4">{error}</p>
                    <button 
                        onClick={() => navigate('/client/projets')}
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
                        ← Retour aux projets
                    </button>
                </div>
            </div>
        );
    }

    if(!project) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <p className="text-gray-600 text-lg mb-6">Projet non trouvé</p>
                    <button 
                        onClick={() => navigate('/client/projets')}
                        className="bg-[#1d4370] hover:bg-[#27578F] text-white py-2 px-6 rounded-lg transition-colors"
                    >
                        ← Retour aux projets
                    </button>
                </div>
            </div>
        );
    }

    const tabs = [
        {id: 'details', label: 'Détails', count: null},
        {id: 'phases', label: 'Phases', count: project.phases?.length || 0},
        {id: 'localisation', label: 'Localisation', count: null}
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <button 
                    onClick={() => navigate('/client/projets')}
                    className="text-[#1d4370] hover:text-[#27578F] font-medium flex items-center gap-2 transition-colors"
                >
                    ← Retour
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <MapPin size={18} />
                        <span>{project.localisation?.ville}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Home size={18}/>
                        <span>{getTypeBienLabel(project.typeBien)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye size={18}/>
                        <span>{project.vues || 0} vues</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={18}/>
                        <span>Créé le {formatDate(project.createdAt)}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-t-lg shadow-md overflow-x-auto">
                <div className="flex border-b">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 min-w-max px-6 py-4 font-medium transition-colors relative
                                ${activeTab === tab.id 
                                ? 'text-[#1d4370] border-b-2 border-[#1d4370] bg-blue-50' 
                                : 'text-[#1d4370] hover:text-[#27578F] hover:bg-gray-50'}`}
                        >
                            {tab.label}
                            {tab.count !== null && (
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs
                                    ${activeTab === tab.id ? 'bg-[#1d4370] text-white' : 'bg-gray-200 text-gray-700'}`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-8 mt-6">
                {activeTab === 'details' && (
                    <div>
                        <section className="mb-6">
                            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                                <Camera size={24} className="text-[#1d4370]" />
                                Images du projet
                            </h2>
                            
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">Image Principale</h3>
                                {project.imagePrincipale ? (
                                    <img 
                                        src={`${API_URL}/${project.imagePrincipale}`}
                                        alt="Image principale"
                                        className="w-full max-w-md h-64 object-cover rounded-lg shadow-lg"
                                    />
                                ) : (
                                    <div className="w-full max-w-md h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-500">Aucune image principale</span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">Galerie</h3>
                                {project.galerie && project.galerie.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {project.galerie.map((img, index) => (
                                            <img 
                                                key={index}
                                                src={`${API_URL}${img}`}
                                                alt={`Galerie ${index + 1}`}
                                                className="w-full h-48 object-cover rounded-lg shadow"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-500">Aucune image dans la galerie</span>
                                    </div>
                                )}
                            </div>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            <InfoCard icon={<DollarSign size={18} />} label="Prix" value={formatPrice(project.prix)} />
                            <InfoCard icon={<Square size={18} />} label="Surface totale" value={formatSurface(project.caracteristiques?.surfaceTotale)} />
                            <InfoCard icon={<Calendar size={18} />} label="Date début" value={formatDate(project.dateDebut)} />
                            {project.dateFinPrevue && (
                                <InfoCard icon={<Calendar size={18} />} label="Date fin prévue" value={formatDate(project.dateFinPrevue)} />
                            )}
                            {project.caracteristiques?.nombreChambres !== undefined && (
                                <InfoCard icon={<Bed size={18} />} label="Chambres" value={project.caracteristiques.nombreChambres} />
                            )}
                            {project.caracteristiques?.nombreSallesBain !== undefined && (
                                <InfoCard icon={<ShowerHead size={18} />} label="Salles de bain" value={project.caracteristiques.nombreSallesBain} />
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {project.caracteristiques?.ascenseur && <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">✓ Ascenseur</span>}
                            {project.caracteristiques?.balcon && <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">✓ Balcon</span>}
                            {project.caracteristiques?.terrasse && <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">✓ Terrasse</span>}
                            {project.caracteristiques?.garage && <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">✓ Garage</span>}
                            {project.caracteristiques?.jardin && <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">✓ Jardin</span>}
                            {project.caracteristiques?.piscine && <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">✓ Piscine</span>}
                            {project.caracteristiques?.climatisation && <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">✓ Climatisation</span>}
                            {project.caracteristiques?.chauffage && <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">✓ Chauffage</span>}
                            {project.caracteristiques?.securite && <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">✓ Sécurité</span>}
                            {project.caracteristiques?.gardien && <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">✓ Gardien</span>}
                            {project.caracteristiques?.meuble && <span className="bg-blue-50 text-[#1d4370] px-3 py-1 rounded-full text-sm font-medium">✓ Meublé</span>}
                        </div>
                    </div>
                )}

                {activeTab === 'phases' && (
                    <PhaseList
                        projectId={projectId}
                        phases={project.phases || []}
                        onPhasesUpdate={() => loadProject(projectId)}
                        isClient={true}
                    />
                )}

                {activeTab === 'localisation' && (
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Adresse</h2>
                            <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                                <InfoRow label="Ville" value={project.localisation?.ville} />
                                <InfoRow label="Quartier" value={project.localisation?.quartier} />
                                <InfoRow label="Adresse" value={project.localisation?.adresse} />
                                {project.localisation?.codePostal && (
                                    <InfoRow label="Code postal" value={project.localisation.codePostal} />
                                )}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-black mb-4">Carte</h2>
                            <ProjectMap
                                latitude={project.localisation?.coordinates?.latitude}
                                longitude={project.localisation?.coordinates?.longitude}
                                title={project.titre}
                                address={project.localisation?.adresse}
                            />
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

const InfoCard = ({ icon, label, value }) => (
    <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{icon}</span>
            <span className="text-sm font-semibold text-[#1d4370]">{label}</span>
        </div>
        <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
);

const InfoRow = ({ label, value }) => (
    <div className="flex items-start gap-2">
        <span className="font-semibold text-gray-700 min-w-[120px]">{label}:</span>
        <span className="text-gray-600">{value}</span>
    </div>
);

export default ClientProjectDetails;