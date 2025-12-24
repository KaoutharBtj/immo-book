import React from 'react';
import { MapPin } from '../../../constants/icons';

export default function LocalisationSection({ projet }) {
    return (
        <div className="space-y-6">
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Adresse</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-800 font-medium">{projet.localisation.quartier}</p>
            <p className="text-gray-600">{projet.localisation.ville}</p>
            </div>
        </div>

        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Carte</h3>
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
                <MapPin className="w-12 h-12 text-[#1d4370] mx-auto mb-2" />
                <p className="text-gray-600">Carte interactive</p>
                <p className="text-sm text-gray-500">
                {projet.localisation.quartier}, {projet.localisation.ville}
                </p>
            </div>
            </div>
        </div>
        </div>
    );
}