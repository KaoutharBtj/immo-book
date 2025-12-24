import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId || localStorage.getItem('userId');

  const email = location.state?.email || localStorage.getItem('email');

  // States pour les 6 chiffres du code
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  
  // Refs pour les inputs
  const inputRefs = useRef([]);
  
  // Rediriger si pas de userId
  useEffect(() => {
    if (!userId) {
      navigate('/nouveau-compte');
    }
  }, [userId, navigate]);
  
  // Countdown pour le renvoi de code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);
  
  // Focus sur le premier input au chargement
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  
  // Gérer le changement de valeur dans les inputs
  const handleChange = (index, value) => {
    // N'accepter que les chiffres
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Passer au champ suivant automatiquement
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  // Gérer la touche Backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  // Gérer le collage de code
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, 6);
    
    if (!/^\d{6}$/.test(pastedData)) {
      setErrors({ general: 'Le code doit contenir 6 chiffres' });
      return;
    }
    
    const newCode = pastedData.split('');
    setCode(newCode);
    inputRefs.current[5]?.focus();
  };
  
  // Vérifier le code
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage('');
    
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      setErrors({ general: 'Veuillez entrer les 6 chiffres' });
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/verify-email', {
        userId,
        code: fullCode
      });
      console.log('SEND TO BACKEND:', { code: code.join('') });

      setSuccessMessage('Email vérifié avec succès !');
      
      // Si token reçu (client physique), stocker et rediriger
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } 
      // Si entreprise, rediriger vers login pour choisir le rôle
      else if (response.data.needRoleSelection) {
        setTimeout(() => {
          navigate('/se-connecter', {
            state: { message: 'Email vérifié ! Connectez-vous pour choisir votre rôle.' }
          });
        }, 1500);
      }
      
    } catch (error) {
      console.error(' Erreur vérification:', error);
      
      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: 'Erreur lors de la vérification' });
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Renvoyer le code
  const handleResendCode = async () => {
    setResendLoading(true);
    setErrors({});
    setSuccessMessage('');
    
    try {
      const response = await axios.post('http://localhost:3000/api/auth/resend-code', {
        userId
      });
      
      setSuccessMessage(response.data.message || 'Un nouveau code a été envoyé');
      setCanResend(false);
      setCountdown(60);
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      
    } catch (error) {
      console.error('Erreur renvoi code:', error);
      
      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: 'Erreur lors du renvoi du code' });
      }
    } finally {
      setResendLoading(false);
    }
  };
  
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("/assets/bg-signup.jpg")' }}
      />
      <div className="absolute inset-0 bg-black/10 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center p-4 md:p-20 min-h-screen">
        <div className="bg-[#FBFBFB] rounded-lg shadow-2xl w-full max-w-md p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-[#1d4370] rounded-full mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Vérifiez votre email</h1>
            <p className="text-gray-600">
              Nous avons envoyé un code à 6 chiffres à<br />
              <strong className="text-[#1d4370]">{email}</strong>
            </p>
          </div>
          
          {/* Messages */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {successMessage}
            </div>
          )}
          
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.general}
            </div>
          )}
          
          {/* Formulaire */}
          <form onSubmit={handleVerify} className="space-y-6">
            {/* Inputs pour les 6 chiffres */}
            <div className="flex justify-center gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#1d4370] focus:ring-2 focus:ring-[#1d4370] focus:outline-none transition"
                  disabled={loading}
                />
              ))}
            </div>
            
            {/* Bouton de vérification */}
            <button
              type="submit"
              disabled={loading || code.join('').length !== 6}
              className="w-full bg-[#1d4370] hover:bg-[#27578F] text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Vérification...
                </span>
              ) : (
                'Vérifier le code'
              )}
            </button>
          </form>
          
          {/* Renvoyer le code */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Vous n'avez pas reçu le code ?
            </p>
            {canResend ? (
              <button
                onClick={handleResendCode}
                disabled={resendLoading}
                className="text-[#1d4370] hover:underline font-semibold disabled:opacity-50"
              >
                {resendLoading ? 'Envoi en cours...' : 'Renvoyer le code'}
              </button>
            ) : (
              <p className="text-gray-500 text-sm">
                Renvoyer dans <strong>{countdown}s</strong>
              </p>
            )}
          </div>
          
          {/* Retour */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/nouveau-compte')}
              className="text-gray-600 hover:text-gray-800 text-sm flex items-center justify-center gap-1 mx-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à l'inscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}