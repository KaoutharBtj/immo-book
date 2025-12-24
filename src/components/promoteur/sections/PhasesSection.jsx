import React from 'react';
import { Plus, TrendingUp } from '../../../constants/icons';

export default function PhasesSection({ projet, onAddPhase }) {
    return (
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Phases d'avancement</h3>
            <button 
            onClick={onAddPhase}
            className="flex items-center gap-2 bg-[#1d4370] text-white px-4 py-2 rounded-lg hover:bg-[#27578F]"
            >
            <Plus className="w-5 h-5" />
            Ajouter une phase
            </button>
        </div>

        {projet.phases && projet.phases.length > 0 ? (
            <div className="space-y-4">
            {projet.phases.map((phase, idx) => (
                <div key={idx} className="border rounded-lg p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                    <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-[#1d4370] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {phase.numero}
                        </span>
                        <h4 className="text-lg font-bold text-gray-800">{phase.titre}</h4>
                    </div>
                    <p className="text-gray-600">{phase.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    phase.statut === 'termine' ? 'bg-green-100 text-green-700' :
                    phase.statut === 'en_cours' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                    }`}>
                    {phase.statut === 'termine' ? 'Terminé' : 
                    phase.statut === 'en_cours' ? 'En cours' : 'Non commencé'}
                    </span>
                </div>

                <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progression</span>
                    <span className="font-bold text-[#1d4370]">{phase.pourcentageAvancement}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                        className="bg-[#1d4370] h-3 rounded-full transition-all"
                        style={{ width: `${phase.pourcentageAvancement}%` }}
                    ></div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Aucune phase ajoutée</p>
            <button 
                onClick={onAddPhase}
                className="mt-4 text-[#1d4370] font-medium hover:underline"
            >
                Ajouter la première phase
            </button>
            </div>
        )}
        </div>
    );
}