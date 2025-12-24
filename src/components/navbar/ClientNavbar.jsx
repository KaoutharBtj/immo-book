import React, { useState } from "react";
import { Menu, X, Home, Building2, BookmarkCheck, LogOut, User, Heart } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function ClientNavbar({ user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      
      await axios.post("http://localhost:3000/api/v1/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      if (onLogout) {
        onLogout();
      }
      
      navigate("/se-connecter");
    }
  };

  const navLinks = [
    { to: "/client/accueil", label: "Accueil", icon: Home },
    { to: "/client/tous-les-projets", label: "Tous les Projets", icon: Building2 },
    { to: "/client/mes-reservations", label: "Mes Réservations", icon: BookmarkCheck },
    { to: "/client/favoris", label: "Favoris", icon: Heart },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/client/accueil" className="flex items-center flex-shrink-0">
            <img
              src="/assets/logoNavbar.png"
              alt="Logo ImmoBook"
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                    isActive(link.to)
                      ? "bg-[#1d4370] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-[#1d4370]"
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* User Menu Desktop */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0 relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a18651] to-[#B89C64] flex items-center justify-center text-white font-bold">
                {user?.nom?.[0]?.toUpperCase() || "C"}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.nom || "Client"}
                </p>
                <p className="text-xs text-gray-500">Client</p>
              </div>
            </button>

            {/* Dropdown User Menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                <Link
                  to="/client/profil"
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User size={18} className="text-gray-600" />
                  <span className="text-gray-700 font-medium">Mon Profil</span>
                </Link>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut size={18} className="text-red-600" />
                  <span className="text-red-600 font-medium">Déconnexion</span>
                </button>
              </div>
            )}
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
          <div className="px-4 py-4 space-y-2">
            {/* User Info Mobile */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a18651] to-[#B89C64] flex items-center justify-center text-white font-bold text-lg">
                {user?.nom?.[0]?.toUpperCase() || "C"}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user?.nom || "Client"}</p>
                <p className="text-sm text-gray-500">Client</p>
              </div>
            </div>

            {/* Nav Links Mobile */}
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.to)
                      ? "bg-[#1d4370] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}

            {/* Mobile Actions */}
            <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
              <Link
                to="/client/profil"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User size={20} />
                <span className="font-medium">Mon Profil</span>
              </Link>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}