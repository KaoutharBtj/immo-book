import React from 'react';


export default function Footer() {
  return (
    <div className="bg-[#1d4370] text-white py-12 px-[12vw]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo et Description */}
          <div>
            <img src="/assets/logoFooter.png" alt="Logo ImmoBook" className="mb-4 h-16"/>
        
            <p className="text-sm">
              Réservez en ligne et<br />
              réalisez vos rêves<br />
              immobiliers.
            </p>
        </div>

          {/* Navigation */}
          <div className='flex justify-center'>
            <div className="flex flex-col items-start text-sm">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Acceuil</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">A propos</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Projets</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Mes Réservations</a></li>
              </ul>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Mes avis</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Mes Projets</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Demandes</a></li>
              </ul>
              </div>    
            </div>
          </div>

          {/* Contact */}
          <div className="flex justify-end">
        <div className="flex flex-col items-start text-sm">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <a href="tel:+212577452061" className="hover:text-orange-500 transition-colors mb-2">
                +212 577 452 061
            </a>
            <a href="mailto:info@immobook.ac.ma" className="hover:text-orange-500 transition-colors">
                info@immobook.ac.ma
            </a>
        </div>
        </div>

 
          </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 pt-6 text-center text-sm">
          <p>© 2025 ImmoBook. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
}