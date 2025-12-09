import React, { useState } from 'react';
import {Link} from 'react-router-dom'

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        alert('Connexion soumise!');
    };

    return (
        <div className="relative ">
        {/* Background image */}
        <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: 'url("/assets/bg-signup.jpg")' }}
        />
        {/* Overlay for slight darkening */}
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center p-20 max-auto">
            <div className="bg-[#FBFBFB]

] rounded-lg shadow-2xl w-full max-w-xl p-8">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Bon retour !</h1>
                <p className="text-gray-600">Connectez-vous à votre compte</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 mb-8">
                <Link
                to="/se-connecter"
                className="flex-1 py-3 px-4 rounded-lg font-semibold text-center transition bg-white border-2 border-gray-300 text-gray-800 hover:bg-gray-50"
                >
                Connexion
                </Link>
                <Link
                to="/nouveau-compte"
                className="flex-1 py-3 px-4 rounded-lg font-semibold text-center transition bg-[#1d4370] text-white hover:bg-[#27578F]"
                >
                Inscription
                </Link>
            </div>

            {/* Form */}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition pr-12"
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
                onClick={handleSubmit}
                className="w-full bg-[#1d4370] hover:bg-[#27578F] text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg mt-6"
                >
                Se connecter
                </button>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-6">
                Pas encore de compte ? <Link to="/nouveau-compte" className="text-[#a18651] hover:underline font-semibold">S'inscrire</Link>
            </p>
            </div>
        </div>
        </div>
    );
}