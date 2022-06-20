import axios from 'axios';

const URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'e6a569883b3b117f94872785524b59f2';

export class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.id = '';
    }

    async fetchMovieTrend() {
        const response = await axios.get(`${URL}trending/movie/day?api_key=${API_KEY}`);
        return response.data.results;
    }

    async fetchMovieSearch(query) {
        const response = await axios.get(
            `${URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}`,
        );
        return response.data.results;
    }

    async fetchMovie(id) {
        const response = await axios.get(`${URL}movie/${id}?api_key=${API_KEY}&language=en-US`);
        return response.data;
    }

    async fetchCast(id) {
        const response = await axios.get(
            `${URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
        );
        return response.data;
    }

    async fetchReviews(id) {
        const response = await axios.get(
            `${URL}movie/${id}/reviews?api_key=${API_KEY}&language=en-US`,
        );
        return response.data;
    }

    // incrementPage() {
    //     this.page += 1;
    // }

    // resetPage() {
    //     this.page = 1;
    // }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
