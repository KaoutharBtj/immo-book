// components/promoteur/ReviewsList.jsx
import React from 'react';
import StarRating from './StarRating';
import { formatDateTime } from '../../utils/formatters';

const ReviewsList = ({ reviews = [], averageRating = 0 }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 text-lg">📝 Aucun avis pour le moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Résumé des avis */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow p-6">
        <div className="flex items-center justify-center gap-4">
          <StarRating rating={averageRating} readonly size="large" />
          <span className="text-gray-600 text-lg">
            ({reviews.length} avis)
          </span>
        </div>
      </div>

      {/* Liste des avis */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div 
            key={review._id || index} 
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
          >
            {/* En-tête de l'avis */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                  {review.client?.nom ? review.client.nom.charAt(0).toUpperCase() : '?'}
                </div>
                {/* Info client */}
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {review.client?.nom || 'Client anonyme'}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {formatDateTime(review.createdAt)}
                  </span>
                </div>
              </div>
              {/* Note */}
              <StarRating rating={review.note} readonly size="small" />
            </div>

            {/* Commentaire */}
            {review.commentaire && (
              <p className="text-gray-700 mb-4 leading-relaxed">
                {review.commentaire}
              </p>
            )}

            {/* Réponse du promoteur */}
            {review.reponse && (
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  Réponse du promoteur :
                </p>
                <p className="text-gray-700 text-sm">
                  {review.reponse}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;