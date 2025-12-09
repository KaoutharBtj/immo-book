import React, { useState } from 'react';
import {Link} from 'react-router-dom'

export default function SignupForm() {
  
  const [userType, setUserType] = useState('client');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("/assets/bg-signup.jpg")' }}
      />
      {/* Overlay for slight darkening */}
      <div className="absolute inset-0 bg-black/10 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-20">
        <div className="bg-[#FBFBFB] rounded-lg shadow-lg w-full max-w-xl p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Créer un compte</h1>
          <p className="text-sm text-gray-500">Rejoignez-nous et réussissez</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Link
            to="/se-connecter"
            className="flex-1 py-2 px-4 rounded-lg font-medium text-center transition bg-white border-2 border-gray-300 text-gray-800 hover:bg-gray-50"
          >
            Connexion
          </Link>
          <Link
            to="/nouveau-compte"
            className="flex-1 py-2 px-4 rounded-lg font-medium text-center transition bg-[#1d4370] text-white hover:bg-[#27578F]"
          >
            Inscription
          </Link>
        </div>

        {/* User Type Selection */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setUserType('client')}
            className={`flex-1 py-4 px-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
              userType === 'client'
                ? 'bg-[#f4f9ff] border-[#1d4370]'
                : 'bg-white border-gray-300'
            }`}
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span className="font-medium">Client</span>
          </button>

          <button
            onClick={() => setUserType('entreprise')}
            className={`flex-1 py-4 px-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
              userType === 'entreprise'
                ? 'bg-[#f4f9ff] border-[#1d4370]'
                : 'bg-white border-gray-300'
            }`}
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
            </svg>
            <span className="font-medium">Entreprise</span>
          </button>
        </div>

        {/* Form Fields - Client */}
        {userType === 'client' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Entez votre nom"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Entrez votre Prénom "
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="0743563761"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

           

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="************"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                alert('Inscription client soumise!');
              }}
              className="w-full bg-[#1d4370] hover:bg-[#27578F] text-white font-medium py-3 rounded-lg transition"
            >
              S'inscrire
            </button>
          </div>
        )}

        {/* Form Fields - Entreprise */}
        {userType === 'entreprise' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l'entreprise <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Entrez le Nom de l'entreprise"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="exemple@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="0645372898"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="10 Rue Al Massira, Casablanca"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numero RC <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Entrez le Numero RC "
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="************"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                alert('Inscription entreprise soumise!');
              }}
              className="w-full bg-[#1d4370] hover:bg-[#27578F] text-white font-medium py-3 rounded-lg transition"
            >
              S'inscrire
            </button>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Vous avez déjà un compte ? <Link to="/se-connecter" className=" text-[#a18651] hover:underline">Se connecter</Link>
        </p>
      </div>
      </div>
    </div>
  );
}