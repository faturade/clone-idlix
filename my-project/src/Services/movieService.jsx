import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWI0NTNlYTFkZjVkY2E2YmNhMWY1ZGQ4ZTQwMGIwYSIsIm5iZiI6MTcyNzkzNTY1MS42ODcwMiwic3ViIjoiNjVkY2E2Mjg0NTM5ZDAwMTg2YzAxODA0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.M9-sYDGidr5xZV-SUxhPDWeMbpL_XfrE1BA_61k3Exc',
  },
});

export const getTVEpisodes = async (tvShowId, seasonNumber) => {
  const response = await apiClient.get(`/tv/${tvShowId}/season/${seasonNumber}`);
  return response.data;
};

export const getNowPlayingMovies = (page = 1) => {
  return apiClient.get(`/movie/now_playing?language=en-US&page=${page}`);
};

export const getPopularMovies = (page = 1) => {
  return apiClient.get(`/movie/popular?language=en-US&page=${page}`);
};

export const getTopRatedMovies = (page = 1) => {
  return apiClient.get(`/movie/top_rated?language=en-US&page=${page}`);
};

export const getUpcomingMovies = (page = 1) => {
  return apiClient.get(`/movie/upcoming?language=en-US&page=${page}`);
};

export const searchMovies = (query, page = 1) => {
  return apiClient.get(`/search/movie?query=${query}&language=en-US&page=${page}`);
};

export const getPopularTVShows = (page = 1) => {
  return apiClient.get(`/tv/popular?language=en-US&page=${page}`);
};

export const getAiringTodayTVShows = (page = 1) => {
  return apiClient.get(`/tv/airing_today?language=en-US&page=${page}`);
};

export const getTopRatedTVShows = (page = 1) => {
  return apiClient.get(`/tv/top_rated?language=en-US&page=${page}`);
};

export const getOnTheAirTVShows = (page = 1) => {
  return apiClient.get(`/tv/on_the_air?language=en-US&page=${page}`);
};

export const getMovieGenres = () => {
  return apiClient.get('/genre/movie/list?language=en');
};

export const getTrendingMovies = (page = 1) => {
  return apiClient.get(`/trending/movie/day?language=en-US&page=${page}`);
};

export const getMovieDetails = (id) => {
  return apiClient.get(`/movie/${id}?language=en-US`);
};

export const getTVDetails = (id) => {
  return apiClient.get(`/tv/${id}?language=en-US`);
};

export const getMovieCredits = (id) => {
  return apiClient.get(`/movie/${id}/credits?language=en-US`);
};

export const getTVCredits = (id) => {
  return apiClient.get(`/tv/${id}/credits?language=en-US`);
};

export const getSimilarMovies = (id, page = 1) => {
  return apiClient.get(`/movie/${id}/similar?language=en-US&page=${page}`);
};

export const getSimilarTVShows = (id, page = 1) => {
  return apiClient.get(`/tv/${id}/similar?language=en-US&page=${page}`);
};

export const getMovieKeywords = (id) => {
  return apiClient.get(`/movie/${id}/keywords?language=en-US`);
};

export const getMovieRecommendations = (id, page = 1) => {
  return apiClient.get(`/movie/${id}/recommendations?language=en-US&page=${page}`);
};

export const getMovieVideos = (id) => {
  return apiClient.get(`/movie/${id}/videos?language=en-US`);
};

export const getTVVideos = (id) => {
  return apiClient.get(`/tv/${id}/videos?language=en-US`);
};

export const getMovieImages = (id) => {
  return apiClient.get(`/movie/${id}/images?language=en-US`);
};

export const getMovieReviews = (id, page = 1) => {
  return apiClient.get(`/movie/${id}/reviews?language=en-US&page=${page}`);
};

export const getMoviesByGenre = (genreId, page = 1) => {
  return apiClient.get(`/discover/movie?with_genres=${genreId}&language=en-US&page=${page}`);
};

export const getTVShowDetails = (id) => {
  return apiClient.get(`/tv/${id}?language=en-US`);
};

export const getMoviesByYear = (year, page = 1) => {
  return apiClient.get(`/discover/movie?primary_release_year=${year}&language=en-US&page=${page}`);
};

