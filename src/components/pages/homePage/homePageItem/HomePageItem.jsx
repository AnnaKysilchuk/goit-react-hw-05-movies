import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import style from './HomePageItem.module.css';

export default function HomePageItem({ title, id, poster_path }) {
    const posterImg = `https://image.tmdb.org/t/p/w300/${poster_path}`;
    const location = useLocation();

    return (
        <NavLink
            className={style.movieLink}
            to={{
                pathname: `/movies/${id}`,
                state: { from: location },
            }}
        >
            <li className={style.homePageItem}>
                {poster_path ? (
                    <img src={posterImg} alt="" className={style.homePageItemImg} />
                ) : (
                    <div className={style.imgNotFound}></div>
                )}

                <div className={style.homePageItemTitleThumb}>
                    <h2 className={style.homePageItemTitle}> {title} </h2>
                </div>
            </li>
        </NavLink>
    );
}

HomePageItem.propTypes = {
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};
