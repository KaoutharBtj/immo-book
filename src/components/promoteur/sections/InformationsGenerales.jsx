import React from 'react';
import { Home, Square, Bed, Bath, Car } from '../../../constants/icons';

export default function InformationsGenerales({ projet }) {
    const infos = [
        { label: 'Type de bien', value: projet.typeBien, icon: Home },
        { label: 'Surface totale', value: `${projet.caracteristiques.surfaceTotale} m²`, icon: Square },
        ...(projet.caracteristiques.nombreChambres ? [{ 
        label: 'Chambres', 
        value: projet.caracteristiques.nombreChambres, 
        icon: Bed 
        }] : []),
        ...(projet.caracteristiques.nombreSallesBain ? [{ 
        label: 'Salles de bain', 
        value: projet.caracteristiques.nombreSallesBain, 
        icon: Bath 
        }] : []),
        ...(projet.caracteristiques.nombrePlacesParking ? [{ 
        label: 'Parking', 
        value: `${projet.caracteristiques.nombrePlacesParking} places`, 
        icon: Car 
        }] : []),
    ];

    const equipements = [];
    if (projet.caracteristiques.ascenseur) equipements.push('Ascenseur');
    if (projet.caracteristiques.balcon) equipements.push('Balcon');
    if (projet.caracteristiques.terrasse) equipements.push('Terrasse');
    if (projet.caracteristiques.climatisation) equipements.push('Climatisation');
    if (projet.caracteristiques.garage) equipements.push('Garage');

    return (
        <div className="space-y-6">
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">
            Magnifique projet immobilier situé dans un quartier prisé. Finitions haut de gamme et prestations exceptionnelles.
            </p>
        </div>

        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Caractéristiques</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {infos.map((info, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                {info.icon && <info.icon className="w-5 h-5 text-[#1d4370]" />}
                <div>
                    <div className="text-sm text-gray-600">{info.label}</div>
                    <div className="font-semibold text-gray-800">{info.value}</div>
                </div>
                </div>
            ))}
            </div>
        </div>

        {equipements.length > 0 && (
            <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Équipements</h3>
            <div className="flex flex-wrap gap-2">
                {equipements.map((eq, idx) => (
                <span key={idx} className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    ✓ {eq}
                </span>
                ))}
            </div>
            </div>
        )}
        </div>
    );
}