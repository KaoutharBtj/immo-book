import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {Link} from 'react-router-dom'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#F1F2F6]  shadow-sm px-[12vw]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
            <img src="/assets/logoNavbar.svg" alt="Logo ImmoBook" className='mb-2 mt-2 h-14' />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-800 hover:text-[#EC5A14] transition-colors font-medium">
            Acceuil
          </a>
          <a href="/about" className="text-gray-800 hover:text-[#EC5A14] transition-colors font-medium">
            A propos
          </a>
          <Link to="/nouveau-compte" className='max-md:hidden'>
            <button className="px-6 py-2 bg-[#1d4370] text-white rounded-md hover:bg-[#27578F] transition-colors font-medium">
              Inscription 
            </button>
          </Link>
          <Link to="/se-connecter" className='max-md:hidden'>
            <button className="px-6 py-2 bg-[#a18651] text-white rounded-md hover:bg-[#B89C64] transition-colors font-medium">
              Connexion
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-800 hover:text-[#EC5A14] transition-colors"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-4">
          <a href="#" className="block text-gray-800 hover:text-[#EC5A14] transition-colors font-medium">
            Acceuil
          </a>
          <a href="#" className="block text-gray-800 hover:text-[#EC5A14] transition-colors font-medium">
            A propos
          </a>
           <Link to="/nouveau-compte" className='max-md:hidden'>
            <button className="w-full px-6 py-2 bg-[#F1F2F6] text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium">
                S'inscrire
            </button>
          </Link>

          <Link to="/se-connecter" className='max-md:hidden'>
            <button className="w-full px-6 py-2 bg-[#EC5A14] text-white rounded-md hover:bg-[#d94f0f] transition-colors font-medium">
                Connexion
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}