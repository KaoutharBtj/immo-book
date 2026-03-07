import React from 'react'

const StarRating = ({rating, totalReviews, size = 'md'}) => {

    const sizes = {
        sm : 'text-sm',
        md: 'text-lg',
        lg: 'text-2xl'
    }

    const renderStar = () => {
        return [1, 2, 3, 4, 5].map ((star) => {
            const filled =  star <= Math.floor(rating);
            const partial = !filled && star === Math.ceil(rating) && rating % 1 !== 0;

            return (
                <span key={star} 
                    className={`${sizes[size]} 
                    ${ filled ? 'text-yellow-400' :
                        partial ? 'text-yellow-300' : 
                        'text-gray-300'
                    }`}
                    >
                        ★
                    </span>
            );
        });
    };

    if (!rating) {
        return (
            <div className=' flex items-center gap-1'>
                {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={`${sizes[size]} text-gray-100`}>★</span>

                ))}
            </div>
        )
    }

    return (
        <div className='flex items-center gap-1'>
            {renderStar()}
            <span className='text-gray-600 text-sm ml-1'>
                {parseFloat(rating).toFixed(1)}
                {totalReviews&& `(${totalReviews} avis)`}
            </span>
        </div>
    )
};

export default StarRating;