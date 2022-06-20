import PropTypes from 'prop-types';
import style from './Button.module.css';

export const Button = ({ onGoBackBtn }) => {
    return (
        <div>
            <button className={style.goBackBtn} type="button" onClick={onGoBackBtn}>
                &#8656; Go back
            </button>
        </div>
    );
};

Button.propTypes = {
    onGoBackBtn: PropTypes.func.isRequired,
};
