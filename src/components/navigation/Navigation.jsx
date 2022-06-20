import { NavLink } from 'react-router-dom';
import style from './Navigation.module.css';

export const Navigation = () => {
    return (
        <nav className={style.navigation}>
            <NavLink
                exact
                to="/"
                className={style.navigationLink}
                activeClassName={style.navigationLinkActive}
            >
                Home
            </NavLink>
            <NavLink
                to="/movies"
                className={style.navigationLink}
                activeClassName={style.navigationLinkActive}
            >
                Movies
            </NavLink>
        </nav>
    );
};
