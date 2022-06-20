import { Bars } from 'react-loader-spinner';
import style from './Loader.module.css';

export const Loader = () => {
    return (
        <div className={style.loaderContainer}>
            <Bars height="80" width="80" color="#00ffff" ariaLabel="loading" />
        </div>
    );
};
