import axios from 'axios';

//Base da API = https://api.themoviedb.org/3/
//URL API = /movie/now_playing?api_key=047ecea442f859b2999a63a9fa133b0e&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;