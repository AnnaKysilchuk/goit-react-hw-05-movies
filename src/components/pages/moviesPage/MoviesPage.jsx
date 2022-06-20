import PropTypes from 'prop-types';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import style from './MoviesPage.module.css';

export default function MoviesPage({ onSubmit }) {
    const [value, setValue] = useState('');
    const history = useHistory();
    const location = useLocation();

    const handleSubmit = event => {
        event.preventDefault();
        history.push({
            ...location,
            search: `query=${value}`,
        });

        if (value.trim() === '') {
            return;
        }
        onSubmit(value);
        // resetForm();
    };

    const handleChange = event => {
        setValue(event.currentTarget.value);
    };

    // const resetForm = () => {
    //     setValue('');
    // }

    return (
        <div className={style.searchbar}>
            <form className={style.searchForm} onSubmit={handleSubmit}>
                <button type="submit" className={style.searchFormBtn}>
                    <span className={style.searchFormBtnLabel}>Search</span>
                </button>

                <input
                    className={style.searchFormInput}
                    onChange={handleChange}
                    value={value}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search movies"
                />
            </form>
        </div>
    );
}

MoviesPage.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
