import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Section: Qui sommes-nous */}
      <section className="max-w-[1555px] mx-auto px-6 py-15">
        <h1 className="text-3xl font-bold text-[#a18651] mb-6">Qui sommes-nous ?</h1>
        <div className="bg-[#1d4370] p-8 rounded-lg">
          <p className="text-white leading-relaxed">
            ImmoBook est une plateforme digitale qui facilite la rencontre entre promoteurs et 
            acheteurs. Nous centralisons les projets immobiliers neufs pour permettre à chacun de 
            découvrir, consulter et suivre facilement les opportunités disponibles, le tout dans un 
            environnement simple et intuitif.
          </p>
        </div>
      </section>

      {/* Section: Notre Histoire */}
      <section className="max-w-[1500px] mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-1 md:order-1">
            <img
              src="/assets/about-histoire.jpg"
              alt="Notre Histoire"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          
          {/* Content */}
          <div className="order-2 md:order-2">
            <h2 className="text-3xl font-bold text-[#a18651] mb-4">Notre Histoire</h2>
            <p className="text-[#1d4370] leading-relaxed">
              ImmoBook est né d'une vision : révolutionner le marché immobilier marocain en créant une 
              plateforme transparente, moderne et accessible qui connecte acheteurs et promoteurs.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Nos objectifs */}
      <section className="py-12">
        <div className="max-w-[1555px] mx-auto px-6">
          {/* Background container avec width limité */}
          <div className="bg-white rounded-3xl px-8 md:px-12 py-16 shadow-2xl border-4 border-[#1d4370]">
            <h2 className="text-3xl md:text-4xl font-bold text-[#a18651] text-center mb-12">
              Nos objectifs
            </h2>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Objectif 1 */}
              <div className="bg-[#f1f8ff] p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <div className="flex justify-center mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#27578F] to-[#1d4370] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md group-hover:shadow-lg transition-all duration-300">
                    1
                  </div>
                </div>
                <p className="text-[#1d4370] text-left text-lg leading-relaxed">
                  Devenir la référence incontournable de l'immobilier digital au Maroc.
                </p>
              </div>

              {/* Objectif 2 */}
              <div className="bg-[#f1f8ff] p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <div className="flex justify-center mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#27578F] to-[#1d4370] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md group-hover:shadow-lg transition-all duration-300">
                    2
                  </div>
                </div>
                <p className="text-[#1d4370] text-left text-lg leading-relaxed">
                  Innover constamment pour améliorer l'expérience utilisateur.
                </p>
              </div>

              {/* Objectif 3 */}
              <div className="bg-[#f1f8ff] p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <div className="flex justify-center mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#27578F] to-[#1d4370] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md group-hover:shadow-lg transition-all duration-300">
                    3
                  </div>
                </div>
                <p className="text-[#1d4370] text-left text-lg leading-relaxed">
                  Offrir les services les plus complets du marché.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Notre Vision */}
      <section className="max-w-[1555px] mx-auto px-6 py-15">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-[#a18651] mb-4">Notre Vision</h2>
            <p className="text-[#1d4370] leading-relaxed">
              Devenir la référence incontournable de l'immobilier digital au Maroc et, en innovant 
              constamment pour offrir la meilleure expérience utilisateur et les services les plus 
              complets du marché.
            </p>
          </div>
          
          {/* Image */}
          <div className="order-1 md:order-2">
            <img
              src="/assets/about-vision.jpg"
              alt="Notre Vision"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}