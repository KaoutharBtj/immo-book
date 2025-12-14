import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // States pour le formulaire
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // States pour la gestion de l'UI
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // States pour la sélection de rôle (entreprise)
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');

  // Récupérer le message de redirection depuis Signup
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Effacer le message après 5 secondes
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  }, [location]);

  // Fonction de connexion (Étape 1)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      console.log('Réponse login:', response.data);

      // CAS 1: L'utilisateur a plusieurs rôles (entreprise)
      if (response.data.needRoleSelection) {
        setShowRoleSelector(true);
        setAvailableRoles(response.data.availableRoles);
        setUserId(response.data.userId);
        setSuccessMessage('Veuillez choisir votre rôle pour cette session');
      } 
      // CAS 2: L'utilisateur a un seul rôle (client physique)
      else if (response.data.token) {
        // Stocker le token et les infos utilisateur
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('currentRole', response.data.currentRole);

        setSuccessMessage('Connexion réussie !');

        // Rediriger selon le rôle
        setTimeout(() => {
          if (response.data.currentRole === 'client_physique') {
            navigate('/client/dashboard');
          } else if (response.data.currentRole === 'promoteur') {
            navigate('/promoteur/dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 1500);
      }

    } catch (error) {
      console.error('Erreur de connexion:', error);

      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else if (error.response?.status === 401) {
        setErrors({ general: 'Email ou mot de passe incorrect' });
      } else {
        setErrors({ general: 'Erreur de connexion au serveur' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Fonction de sélection de rôle (Étape 2 - uniquement pour entreprise)
  const handleRoleSelection = async () => {
    if (!selectedRole) {
      setErrors({ general: 'Veuillez sélectionner un rôle' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post('http://localhost:3000/api/auth/select-role', {
        userId,
        selectedRole
      });

      console.log('Rôle sélectionné:', response.data);

      // Stocker le token et les infos
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('currentRole', response.data.currentRole);

      setSuccessMessage(`Connexion réussie en tant que ${selectedRole === 'promoteur' ? 'Promoteur' : 'Client Entreprise'}`);

      // Rediriger selon le rôle
      setTimeout(() => {
        if (selectedRole === 'promoteur') {
          navigate('/promoteur/dashboard');
        } else if (selectedRole === 'client_entreprise') {
          navigate('/client-entreprise/dashboard');
        } else {
          navigate('/dashboard');
        }
      }, 1500);

    } catch (error) {
      console.error('Erreur sélection de rôle:', error);

      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: 'Erreur lors de la sélection du rôle' });
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
      <div className="relative z-10 flex items-center justify-center p-4 md:p-20 min-h-screen">
        <div className="bg-[#FBFBFB] rounded-lg shadow-2xl w-full max-w-xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Bon retour !</h1>
            <p className="text-gray-600">Connectez-vous à votre compte</p>
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
          <div className="flex gap-3 mb-8">
            <Link
              to="/se-connecter"
              className="flex-1 py-3 px-4 rounded-lg font-semibold text-center transition bg-[#1d4370] text-white hover:bg-[#27578F]"
            >
              Connexion
            </Link>
            <Link
              to="/nouveau-compte"
              className="flex-1 py-3 px-4 rounded-lg font-semibold text-center transition bg-white border-2 border-gray-300 text-gray-800 hover:bg-gray-50"
            >
              Inscription
            </Link>
          </div>

          {/* FORMULAIRE DE CONNEXION */}
          {!showRoleSelector && (
            <form onSubmit={handleLogin}>
              <div className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d4370] focus:border-transparent outline-none transition"
                    required
                    disabled={loading}
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d4370] focus:border-transparent outline-none transition pr-12"
                      required
                      minLength={6}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1d4370] hover:bg-[#27578F] text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Connexion en cours...' : 'Se connecter'}
                </button>
              </div>
            </form>
          )}

          {/* SÉLECTEUR DE RÔLE (pour entreprise) */}
          {showRoleSelector && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Choisissez votre rôle
                </h2>
                <p className="text-sm text-gray-600">
                  Sélectionnez le rôle avec lequel vous souhaitez vous connecter
                </p>
              </div>

              {/* Options de rôle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableRoles.includes('promoteur') && (
                  <button
                    onClick={() => setSelectedRole('promoteur')}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      selectedRole === 'promoteur'
                        ? 'border-[#1d4370] bg-[#f4f9ff]'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <svg className="w-12 h-12 text-[#1d4370]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                      </svg>
                      <div>
                        <h3 className="font-bold text-lg">Promoteur</h3>
                        <p className="text-sm text-gray-600">Gérer et publier des biens</p>
                      </div>
                    </div>
                  </button>
                )}

                {availableRoles.includes('client_entreprise') && (
                  <button
                    onClick={() => setSelectedRole('client_entreprise')}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      selectedRole === 'client_entreprise'
                        ? 'border-[#1d4370] bg-[#f4f9ff]'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <svg className="w-12 h-12 text-[#1d4370]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                      </svg>
                      <div>
                        <h3 className="font-bold text-lg">Client Entreprise</h3>
                        <p className="text-sm text-gray-600">Rechercher et acheter des biens</p>
                      </div>
                    </div>
                  </button>
                )}
              </div>

              {/* Bouton de confirmation */}
              <button
                onClick={handleRoleSelection}
                disabled={!selectedRole || loading}
                className="w-full bg-[#1d4370] hover:bg-[#27578F] text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion en cours...' : 'Continuer'}
              </button>

              {/* Bouton retour */}
              <button
                onClick={() => {
                  setShowRoleSelector(false);
                  setSelectedRole('');
                  setUserId(null);
                  setAvailableRoles([]);
                }}
                className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 transition"
              >
                ← Retour à la connexion
              </button>
            </div>
          )}

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Pas encore de compte ?{' '}
            <Link to="/nouveau-compte" className="text-[#a18651] hover:underline font-semibold">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}