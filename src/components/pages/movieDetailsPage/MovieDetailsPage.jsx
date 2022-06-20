import { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { ApiService } from '../../../services/api';
import { Button } from '../../button/Button';
import style from './MovieDetailsPage.module.css';

const api = new ApiService();

export default function MovieDetailsPage() {
    const [movie, setMovie] = useState({});
    const { movieId } = useParams();
    const { url } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const { title, overview, release_date, genres, poster_path, vote_average } = movie;
    const posterImage = `https://image.tmdb.org/t/p/w500/${poster_path}`;

    useEffect(() => {
        const onGetMovie = async () => {
            try {
                const movie = await api.fetchMovie(movieId);
                setMovie(movie);
            } catch (error) {
                return error;
            }
        };

        onGetMovie();
    }, [movieId]);

    const onGoBackBtnClick = () => {
        history.push(location?.state?.from ?? '/movies');
    };

    return (
        <div className={style.movieDetailsPage}>
            <div className={style.movieDetails}>
                <Button onGoBackBtn={onGoBackBtnClick} />
                {poster_path ? (
                    <img className={style.movieDetailsImg} src={posterImage} alt="" />
                ) : (
                    <div className={style.imgNotFound}></div>
                )}
                <div className={style.movieDetailsInfoBlock}>
                    <div className={style.movieDetailsInfo}>
                        <h2 className={style.movieDetailsMovieTitle}>
                            {title} ({release_date && release_date.slice(0, 4)})
                        </h2>
                        <p className={style.movieDetailsScore}>User score: {vote_average}</p>
                        <h3 className={style.movieDetailsTitle}>Overview</h3>
                        <p className={style.movieDetailsText}>{overview}</p>
                        <h3 className={style.movieDetailsTitle}>Genres</h3>
                        <ul className={style.movieDetailsList}>
                            {genres && genres.map(({ name, id }) => <li key={id}>{name}</li>)}
                        </ul>
                    </div>
                    <h3 className={style.movieDetailsTitle}>Additional information</h3>
                    <nav className={style.navigation}>
                        <NavLink
                            exact
                            to={`${url}/cast`}
                            className={style.navigationLink}
                            activeClassName={style.navigationLinkActive}
                        >
                            Cast
                        </NavLink>
                        <NavLink
                            to={`${url}/reviews`}
                            className={style.navigationLink}
                            activeClassName={style.navigationLinkActive}
                        >
                            Reviews
                        </NavLink>
                    </nav>
                </div>
            </div>
        </div>
    );
}
