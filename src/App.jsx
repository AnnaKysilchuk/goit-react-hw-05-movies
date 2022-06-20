import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useState, useEffect } from 'react';
import { ApiService } from './services/api';
import { Navigation } from './components/navigation/Navigation';
import { Loader } from './components/loader/Loader';

const HomePage = lazy(() =>
    import('./components/pages/homePage/HomePage' /* webpackChunkName: "HomePage" */),
);
const MoviesPage = lazy(() =>
    import('./components/pages/moviesPage/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);
const MovieDetailsPage = lazy(() =>
    import(
        './components/pages/movieDetailsPage/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */
    ),
);
const Cast = lazy(() => import('./components/pages/cast/Cast' /* webpackChunkName: "Cast" */));
const Reviews = lazy(() =>
    import('./components/pages/reviews/Reviews' /* webpackChunkName: "Reviews" */),
);
const NotFoundPage = lazy(() =>
    import('./components/pages/notFoundPage/notFoundPage' /* webpackChunkName: "notFoundPage" */),
);

const api = new ApiService();

const App = () => {
    const [movies, setMovies] = useState([]);
    const [foundedMovies, setFoundedMovies] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const onFetchTrendingMovies = async () => {
            try {
                const newMovies = await api.fetchMovieTrend();
                setMovies(newMovies);
            } catch (error) {
                return error;
            }
        };

        onFetchTrendingMovies();
    }, []);

    const onSubmitSearchForm = async query => {
        try {
            const foundedMovies = await api.fetchMovieSearch(query);
            setFoundedMovies(query ? foundedMovies : []);
        } catch (error) {
            return error;
        }
    };

    return (
        <div>
            {location.pathname === '/goit-react-hw-05-movies/' && <Redirect to="/" />}
            <header>
                <Navigation />
            </header>
            <main>
                <Suspense fallback={<Loader />}>
                    <Switch>
                        <Route path="/" exact>
                            <HomePage movies={movies} title="TOP20 for today" />
                        </Route>

                        <Route path="/movies" exact>
                            <MoviesPage onSubmit={onSubmitSearchForm} />
                            {foundedMovies.length > 0 && <HomePage movies={foundedMovies} />}
                        </Route>

                        <Route path="/movies/:movieId/">
                            <MovieDetailsPage />

                            <Route path="/movies/:movieId/cast">
                                <Cast />
                            </Route>

                            <Route path="/movies/:movieId/reviews">
                                <Reviews />
                            </Route>
                        </Route>

                        <Route>
                            <NotFoundPage />
                        </Route>
                    </Switch>
                </Suspense>
            </main>
        </div>
    );
};

export default App;
