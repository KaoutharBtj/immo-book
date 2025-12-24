// components/Navbar/PublicNavbar.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
                <img
                src="/assets/logoNavbar.png"
                alt="Logo ImmoBook"
                className="h-14 w-auto"
                />
            </Link>

            {/* Desktop Navigation - Centered Links */}
            <div className="hidden md:flex items-center gap-10 flex-1 justify-center">
                <Link
                to="/"
                className="text-gray-700 hover:text-[#1d4370] transition-colors font-medium text-base relative group"
                >
                Accueil
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1d4370] transition-all group-hover:w-full"></span>
                </Link>

                <Link
                to="/projets"
                className="text-gray-700 hover:text-[#1d4370] transition-colors font-medium text-base relative group"
                >
                Projets
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1d4370] transition-all group-hover:w-full"></span>
                </Link>

                <Link
                to="/about"
                className="text-gray-700 hover:text-[#1d4370] transition-colors font-medium text-base relative group"
                >
                À propos
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1d4370] transition-all group-hover:w-full"></span>
                </Link>

                <Link
                to="/contact"
                className="text-gray-700 hover:text-[#1d4370] transition-colors font-medium text-base relative group"
                >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1d4370] transition-all group-hover:w-full"></span>
                </Link>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                <Link to="/se-connecter">
                <button className="px-5 py-2.5 text-sm border-2 border-[#1d4370] text-[#1d4370] rounded-lg hover:bg-[#1d4370] hover:text-white transition-all font-semibold">
                    Connexion
                </button>
                </Link>

                <Link to="/nouveau-compte">
                <button className="px-5 py-2.5 text-sm bg-[#1d4370] text-white rounded-lg hover:bg-[#27578F] transition-all font-semibold shadow-md hover:shadow-lg">
                    Inscription
                </button>
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
            <div className="px-4 py-4 space-y-3">
                <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#1d4370] rounded-lg font-medium transition-colors"
                >
                Accueil
                </Link>

                <Link
                to="/projets"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#1d4370] rounded-lg font-medium transition-colors"
                >
                Projets
                </Link>

                <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#1d4370] rounded-lg font-medium transition-colors"
                >
                À propos
                </Link>

                <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#1d4370] rounded-lg font-medium transition-colors"
                >
                Contact
                </Link>

                <div className="pt-3 space-y-2 border-t border-gray-200">
                <Link to="/se-connecter" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full px-4 py-2.5 text-sm border-2 border-[#1d4370] text-[#1d4370] rounded-lg hover:bg-[#1d4370] hover:text-white transition-all font-semibold">
                    Connexion
                    </button>
                </Link>

                <Link to="/nouveau-compte" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full px-4 py-2.5 text-sm bg-[#1d4370] text-white rounded-lg hover:bg-[#27578F] transition-all font-semibold">
                    Inscription
                    </button>
                </Link>
                </div>
            </div>
            </div>
        )}
        </nav>
    );
}