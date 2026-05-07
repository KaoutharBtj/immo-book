import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, CalendarCheck, Heart, LayoutDashboard, List } from 'lucide-react';

const Home = ({ isClient = false }) => {
    const navigate = useNavigate();

    const promoteurLinks = [
        { label: 'Mes Projets', icon: <FolderOpen size={24}/>, path: '/promoteur/mes-projets', color: 'bg-[#1d4370]' },
        { label: 'Réservations', icon: <CalendarCheck size={24}/>, path: '/promoteur/reservations', color: 'bg-[#a18651]' },
        { label: 'Tableau de bord', icon: <LayoutDashboard size={24}/>, path: '/promoteur/tableau-de-bord', color: 'bg-[#27578F]' },
    ];

    const clientLinks = [
        { label: 'Tous les projets', icon: <List size={24}/>, path: '/client/projets', color: 'bg-[#1d4370]' },
        { label: 'Mes Réservations', icon: <CalendarCheck size={24}/>, path: '/client/reservations', color: 'bg-[#a18651]' },
        { label: 'Mes Favoris', icon: <Heart size={24}/>, path: '/client/favoris', color: 'bg-[#27578F]' },
    ];

    const links = isClient ? clientLinks : promoteurLinks;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div
                className="relative h-72 overflow-hidden"
                style={{
                    backgroundImage: `url('/assets/clientProjectPicture.jpeg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-[#1d4370] opacity-70"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        Bienvenue sur ImmoBook
                    </h1>
                    <p className="text-blue-100 text-lg max-w-xl">
                        {isClient 
                            ? 'Trouvez le bien immobilier de vos rêves parmi nos projets disponibles.'
                            : 'Gérez vos projets immobiliers et suivez vos réservations facilement.'
                        }
                    </p>
                </div>
            </div>

            {/* Quick access */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                    Accès rapide
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {links.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(link.path)}
                            className={`${link.color} hover:opacity-90 text-white rounded-2xl p-8 flex flex-col items-center gap-4 transition-all duration-200 hover:shadow-xl hover:-translate-y-1`}
                        >
                            {link.icon}
                            <span className="text-lg font-semibold">{link.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;