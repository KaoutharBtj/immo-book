
export const getMockProjets = () => [
    {
        _id: '1',
        titre: 'Résidence Al Majd',
        typeBien: 'appartement',
        prix: 1500000,
        statut: 'en_cours',
        imagePrincipale: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        localisation: { ville: 'Casablanca', quartier: 'Maarif' },
        caracteristiques: { 
        surfaceTotale: 120, 
        nombreChambres: 3, 
        nombreSallesBain: 2 
        },
        vues: 245,
        createdAt: '2024-01-15',
        phases: [
        { 
            numero: 1, 
            titre: 'Fondations', 
            pourcentageAvancement: 100, 
            statut: 'termine', 
            description: 'Fondations complétées avec succès' 
        },
        { 
            numero: 2, 
            titre: 'Structure', 
            pourcentageAvancement: 60, 
            statut: 'en_cours', 
            description: 'Construction de la structure en cours' 
        }
        ]
    },
    {
        _id: '2',
        titre: 'Villa Anfa Premium',
        typeBien: 'villa',
        prix: 5200000,
        statut: 'en_cours',
        imagePrincipale: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        localisation: { ville: 'Casablanca', quartier: 'Anfa' },
        caracteristiques: { 
        surfaceTotale: 350, 
        nombreChambres: 5, 
        nombreSallesBain: 4, 
        surfaceTerrain: 500 
        },
        vues: 512,
        createdAt: '2024-02-20',
        phases: []
    }
    ];

    export const calculateAvancementGlobal = (phases) => {
    if (!phases || phases.length === 0) return 0;
    const total = phases.reduce((sum, p) => sum + p.pourcentageAvancement, 0);
    return Math.round(total / phases.length);
};