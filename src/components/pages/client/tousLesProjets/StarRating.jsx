import React,{ useState} from "react"
import { Star} from 'lucide-react';

const StarRating = ({ rating, totalReviews, size = 'md', interactive = false, onRate }) => {
    const [hovered, setHovered] = useState(null);

    const sizes = {
        sm: 'text-sm',
        md: 'text-lg',
        lg: 'text-2xl'
    };

    const renderStar = () => {
        return [1, 2, 3, 4, 5].map((star) => {
            const filled = star <= (hovered || Math.floor(rating));
            const partial = !filled && star === Math.ceil(rating) && rating % 1 !== 0;

            return (
                <span
                    key={star}
                    className={`${sizes[size]} ${interactive ? 'cursor-pointer' : 'cursor-default'} ${
                        filled ? 'text-yellow-400' :
                        partial ? 'text-yellow-300' :
                        'text-gray-300'
                    }`}
                    onMouseEnter={() => interactive && setHovered(star)}
                    onMouseLeave={() => interactive && setHovered(null)}
                    onClick={() => interactive && onRate && onRate(star)}
                >
                    <Star size={20} className="flex "/>
                </span>
            );
        });
    };

    if (!rating && !interactive) {
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
                {rating ? parseFloat(rating).toFixed(1) : ""}
                {totalReviews && `(${totalReviews} avis)`}
            </span>
        </div>
    )
};


export default StarRating;