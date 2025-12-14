import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignupForm() {
  const navigate = useNavigate();
  
  const [userType, setUserType] = useState('client');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // State pour Client Physique
  const [formClient, setFormClient] = useState({
    nom: '',
    email: '',
    telephone: '',
    password: '',
    typeCompte: 'physique'
  });

  // State pour Entreprise
  const [formEntreprise, setFormEntreprise] = useState({
    nomEntreprise: '',
    email: '',
    telephone: '',
    adresse: '',
    numeroRC: '',
    password: '',
    typeCompte: 'entreprise'
  });

  // Fonction d'inscription
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      // Choisir les bonnes données selon le type d'utilisateur
      const userData = userType === 'client' ? formClient : formEntreprise;

      const response = await axios.post(
        'http://localhost:3000/api/auth/signup',
        userData
      );

      console.log('Inscription réussie:', response.data);
      setSuccessMessage('Inscription réussie !');

      // Si c'est un client physique, on a directement le token
      if (response.data.token) {
        // Stocker le token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Rediriger vers le dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } 
      // Si c'est une entreprise, rediriger vers la page de connexion
      else if (response.data.needRoleSelection) {
        setTimeout(() => {
          navigate('/se-connecter', { 
            state: { 
              message: 'Inscription réussie ! Connectez-vous pour choisir votre rôle.' 
            } 
          });
        }, 1500);
      }

    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      
      if (error.response?.data?.errors) {
        // Erreurs de validation
        setErrors({ general: error.response.data.errors.join(', ') });
      } else if (error.response?.data?.message) {
        // Message d'erreur du serveur
        setErrors({ general: error.response.data.message });
      } else {
        // Erreur réseau
        setErrors({ general: 'Erreur de connexion au serveur' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("/assets/bg-signup.jpg")' }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-20">
        <div className="bg-[#FBFBFB] rounded-lg shadow-lg w-full max-w-xl p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Créer un compte</h1>
            <p className="text-sm text-gray-500">Rejoignez-nous et réussissez</p>
          </div>

          {/* Messages de succès/erreur */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}
          
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.general}
            </div>
          )}

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

          {/* Formulaire */}
          <form onSubmit={handleSignup}>
            {/* Form Fields - Client Physique */}
            {userType === 'client' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Entrez votre nom"
                    value={formClient.nom}
                    onChange={(e) => setFormClient({ ...formClient, nom: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d4370] focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="exemple@gmail.com"
                    value={formClient.email}
                    onChange={(e) => setFormClient({ ...formClient, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d4370] focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="0612345678"
                    value={formClient.telephone}
                    onChange={(e) => setFormClient({ ...formClient, telephone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d4370] focus:border-transparent outline-none"
                    required
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
                      value={formClient.password}
                      onChange={(e) => setFormClient({ ...formClient, password: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d4370] focus:border-transparent outline-none"
                      required
                      minLength={6}
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
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1d4370] hover:bg-[#27578F] text-white font-medium py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Inscription en cours...' : 'S\'inscrire'}
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
                    placeholder="Entrez le nom de l'entreprise"
                    value={formEntreprise.nomEntreprise}
                    onChange={(e) => setFormEntreprise({ ...formEntreprise, nomEntreprise: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d4370] focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="exemple@gmail.com"
                    value={formEntreprise.email}
                    onChange={(e) => setFormEntreprise({ ...formEntreprise, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d4370] focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="0612345678"
                    value={formEntreprise.telephone}
                    onChange={(e) => setFormEntreprise({ ...formEntreprise, telephone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d4370] focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="10 Rue Al Massira, Casablanca"
                    value={formEntreprise.adresse}
                    onChange={(e) => setFormEntreprise({ ...formEntreprise, adresse: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d4370] focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro RC <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="RC123456"
                    value={formEntreprise.numeroRC}
                    onChange={(e) => setFormEntreprise({ ...formEntreprise, numeroRC: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d4370] focus:border-transparent outline-none"
                    required
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
                      value={formEntreprise.password}
                      onChange={(e) => setFormEntreprise({ ...formEntreprise, password: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d4370] focus:border-transparent outline-none"
                      required
                      minLength={6}
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
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1d4370] hover:bg-[#27578F] text-white font-medium py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                </button>
              </div>
            )}
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Vous avez déjà un compte ?{' '}
            <Link to="/se-connecter" className="text-[#a18651] hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}