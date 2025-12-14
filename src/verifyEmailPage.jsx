// pages/VerifyEmailPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Récupérer userId et email depuis la navigation
  const userId = location.state?.userId;
  const email = location.state?.email;
  
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
  
  // Gérer le changement de valeur dans les inputs
  const handleChange = (index, value) => {
    // N'accepter que les chiffres
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Passer au champ suivant automatiquement
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  // Gérer la touche Backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  // Gérer le collage de code
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d{6}$/.test(pastedData)) {
      setErrors({ general: 'Le code doit contenir 6 chiffres' });
      return;
    }
    
    const newCode = pastedData.split('');
    setCode(newCode);
    inputRefs.current[5].focus();
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
      const response = await axios.post('http://localhost:3000/api/auth/verify-email', {
        userId,
        code: fullCode
      });
      
      console.log('Vérification réussie:', response.data);
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
      console.error('Erreur vérification:', error);
      
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
      
      setSuccessMessage(response.data.message);
      setCanResend(false);
      setCountdown(60);  // Réinitialiser le countdown
      
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
              <strong>{email}</strong>
            </p>
          </div>
          
          {/* Messages */}
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
          
          {/* Formulaire */}
          <form onSubmit={handleVerify} className="space-y-6">
            {/* Inputs pour les 6 chiffres */}
            <div className="flex justify-center gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#1d4370] focus:ring-2 focus:ring-[#1d4370] focus:outline-none"
                  disabled={loading}
                />
              ))}
            </div>