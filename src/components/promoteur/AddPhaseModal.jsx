import React, { useState } from 'react';

export default function AddPhaseModal({ onClose, projetId }) {
    const [formPhase, setFormPhase] = useState({
        titre: '',
        description: '',
        pourcentageAvancement: 0,
        statut: 'non_commence'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Ajouter phase:', formPhase);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Ajouter une phase</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>

            <div className="p-6 space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la phase *
                </label>
                <input
                type="text"
                value={formPhase.titre}
                onChange={(e) => setFormPhase({...formPhase, titre: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d4370]"
                placeholder="Ex: Fondations et structure"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
                </label>
                <textarea
                value={formPhase.description}
                onChange={(e) => setFormPhase({...formPhase, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d4370]"
                rows="4"
                placeholder="Décrivez l'avancement de cette phase..."
                ></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Pourcentage d'avancement : {formPhase.pourcentageAvancement}%
                </label>
                <input
                type="range"
                min="0"
                max="100"
                value={formPhase.pourcentageAvancement}
                onChange={(e) => setFormPhase({...formPhase, pourcentageAvancement: parseInt(e.target.value)})}
                className="w-full"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select
                value={formPhase.statut}
                onChange={(e) => setFormPhase({...formPhase, statut: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d4370]"
                >
                <option value="non_commence">Non commencé</option>
                <option value="en_cours">En cours</option>
                <option value="termine">Terminé</option>
                </select>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                Annuler
                </button>
                <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-[#1d4370] text-white rounded-lg hover:bg-[#27578F]"
                >
                Ajouter la phase
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}