import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiService } from '../../../services/api';
import style from './Reviews.module.css';

const api = new ApiService();

export default function Reviews() {
    const [reviewsArr, setReviewsArr] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        const onGetReviews = async () => {
            try {
                const reviews = await api.fetchReviews(movieId);
                setReviewsArr(reviews.results);
            } catch (error) {
                return error;
            }
        };

        onGetReviews();
    }, [movieId]);

    return (
        <div className={style.reviews}>
            {reviewsArr.length > 0 ? (
                <ul className={style.reviewsList}>
                    {reviewsArr.map(({ author, content, created_at, id }) => {
                        return (
                            <li className={style.reviewsItem} key={id}>
                                <h3 className={style.reviewsAuthor}>{author}:</h3>
                                <p className={style.reviewsContent}>"{content}"</p>
                                <p className={style.reviewsDate}>{created_at.slice(0, 10)}</p>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <h3 className={style.noReviews}>There are no reviews on this movie.</h3>
            )}
        </div>
    );
}
