import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ rating }) => {
    const totalStars = 5;
    let stars = [];

    for (let i = 1; i <= totalStars; i++) {
        if (i <= rating) {
            // Full star
            stars.push(<FaStar key={i} color="orange" />);
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            // Half star
            stars.push(<FaStarHalfAlt key={i} color="orange" />);
        } else {
            // Empty star
            stars.push(<FaRegStar key={i} color="orange" />);
        }
    }

    return <div className='flex flex-row items-center'>{stars}</div>;
};

export default Rating;