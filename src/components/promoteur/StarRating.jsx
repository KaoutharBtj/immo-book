// components/promoteur/StarRating.jsx
import React from 'react';

const StarRating = ({ 
  rating = 0, 
  maxStars = 5, 
  size = 'medium', 
  onRate, 
  readonly = false 
}) => {
  const stars = [];

  const handleClick = (starIndex) => {
    if (!readonly && onRate) {
      onRate(starIndex + 1);
    }
  };

  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl'
  };

  for (let i = 0; i < maxStars; i++) {
    const isFilled = i < Math.floor(rating);
    const isHalf = !isFilled && i < rating;

    stars.push(
      <span
        key={i}
        onClick={() => handleClick(i)}
        className={`
          ${sizeClasses[size]}
          ${!readonly ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}
          ${isFilled ? 'text-yellow-400' : isHalf ? 'text-yellow-300' : 'text-gray-300'}
        `}
      >
        {isFilled ? '★' : isHalf ? '⯨' : '☆'}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {stars}
      {rating > 0 && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;