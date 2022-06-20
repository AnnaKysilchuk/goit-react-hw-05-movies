import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiService } from '../../../services/api';
import style from './Cast.module.css';

const api = new ApiService();

export default function Cast() {
    const [castArr, setCastArr] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        const onGetCast = async () => {
            try {
                const castMovie = await api.fetchCast(movieId);
                setCastArr(castMovie.cast);
            } catch (error) {
                return error;
            }
        };

        onGetCast();
    }, [movieId]);

    return (
        <ul className={style.castList}>
            {castArr.map(({ profile_path, name, character, cast_id }) => {
                const img = `https://image.tmdb.org/t/p/w300/${profile_path}`;
                return (
                    profile_path && (
                        <li className={style.castItem} key={cast_id}>
                            <img className={style.castImg} src={profile_path && img} alt="" />
                            <p className={style.castName}>{name}</p>
                            <p className={style.castCharacter}>{character}</p>
                        </li>
                    )
                );
            })}
        </ul>
    );
}
