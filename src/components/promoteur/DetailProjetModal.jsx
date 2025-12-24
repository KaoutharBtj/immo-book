import React, { useState } from 'react';
import { MapPin } from '../../constants/icons';
import InformationsGenerales from './sections/InformationsGenerales';
import LocalisationSection from './sections/LocalisationSection';
import PhasesSection from './sections/PhasesSection';
import AddPhaseModal from './AddPhaseModal';

export default function DetailProjetModal({ projet, onClose }) {
    const [activeTab, setActiveTab] = useState('infos');
    const [showAddPhase, setShowAddPhase] = useState(false);

    return (
        <>
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 py-8">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl">
                <div className="relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="relative h-96 bg-gray-200">
                    <img 
                    src={projet.imagePrincipale} 
                    alt={projet.titre} 
                    className="w-full h-full object-cover" 
                    />
                    <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-[#1d4370]">
                        {projet.prix.toLocaleString()} DH
                    </div>
                    </div>
                </div>
                </div>

                <div className="p-6 border-b">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">{projet.titre}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-[#1d4370]" />
                    <span className="text-lg">
                    {projet.localisation.quartier}, {projet.localisation.ville}
                    </span>
                </div>
                </div>

                <div className="border-b">
                <div className="flex gap-6 px-6">
                    {['infos', 'localisation', 'phases'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 font-medium transition ${
                        activeTab === tab
                            ? 'text-[#1d4370] border-b-2 border-[#1d4370]'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {tab === 'infos' ? 'Informations' : 
                        tab === 'localisation' ? 'Localisation' : 'Phases'}
                    </button>
                    ))}
                </div>
                </div>

                <div className="p-6">
                {activeTab === 'infos' && <InformationsGenerales projet={projet} />}
                {activeTab === 'localisation' && <LocalisationSection projet={projet} />}
                {activeTab === 'phases' && (
                    <PhasesSection 
                    projet={projet} 
                    onAddPhase={() => setShowAddPhase(true)} 
                    />
                )}
                </div>
            </div>
            </div>
        </div>

        {showAddPhase && (
            <AddPhaseModal 
            onClose={() => setShowAddPhase(false)} 
            projetId={projet._id} 
            />
        )}
        </>
    );
}