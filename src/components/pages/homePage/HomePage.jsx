import PropTypes from 'prop-types';
import HomePageItem from './homePageItem/HomePageItem';
import style from './HomePage.module.css';

export default function HomePage({ movies }) {
    return (
        <ul className={style.homePage}>
            {movies.map(({ title, id, poster_path }) => (
                <HomePageItem key={id} title={title} id={id} poster_path={poster_path} />
            ))}
        </ul>
    );
}

HomePage.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object),
};
