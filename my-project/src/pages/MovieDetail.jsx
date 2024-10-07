import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Tambahkan useNavigate untuk navigasi
import { getMovieDetails, getMovieCredits, getSimilarMovies, getMovieVideos } from '../Services/movieService'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { faFacebook, faTwitter, faWhatsapp, faTelegram, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'; // import ikon sosial media

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Tambahkan useNavigate
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([]); 
  const [hoveredStar, setHoveredStar] = useState(null); 
  const [activeTab, setActiveTab] = useState('info'); 
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await getMovieDetails(id);
        setMovie(movieResponse.data);
      } catch (error) {
        setError('Failed to fetch movie details.');
      }
    };

    const fetchMovieVideos = async () => {
        try {
          const videoResponse = await getMovieVideos(id);
          const trailer = videoResponse.data.results.find(video => video.type === 'Trailer');
          setTrailer(trailer);
        } catch (error) {
          setError('Failed to fetch movie trailers.');
        }
    };    

    const fetchMovieCredits = async () => {
      try {
        const creditsResponse = await getMovieCredits(id);
        setCast(creditsResponse.data.cast.slice(0, 5));
      } catch (error) {
        setError('Failed to fetch cast.');
      }
    };

    const fetchSimilarMovies = async () => {
        try {
          const similarResponse = await getSimilarMovies(id);
          setSimilarMovies(similarResponse.data.results);
        } catch (error) {
          setError('Failed to fetch similar movies.');
        }
      };

    fetchMovieDetails();
    fetchMovieCredits();
    fetchSimilarMovies();
    fetchMovieVideos();
  }, [id]);

  if (error) {
    console.error(error);
    return <p className="text-red-500">{error}</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  const formattedReleaseDate = new Date(movie.release_date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const genreList = movie.genres.map((genre) => genre.name).join(', ');

  const filledStars = Math.round(movie.vote_average / 2);
  const totalStars = 7;

  return (
    <div className="mt-8 p-8 bg-gray-800 rounded-lg">
      <div className="video-thumbnail relative mb-8 cursor-pointer group h-[80vh]">
        {trailer ? (
            <iframe
            className="w-full h-full rounded-sm aspect-video"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={movie.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ></iframe>
        ) : (
            <p className="text-gray-200">Trailer not available.</p>
        )}
      </div>

      {/* Detail Film */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/6">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg"
          />
        </div>

        <div className="w-full md:w-3/4 flex flex-col justify-start mt-auto">
          <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
          <div className="flex text-gray-200 text-md border-b-2 border-gray-600 mb-2">
            <p className="mr-2 text-xs">{formattedReleaseDate}</p>
            <p className="mr-2 text-xs">{movie.runtime} Min</p>
            <p className="text-xs ">{genreList}</p>
          </div>
          <div className="flex items-center">
            <span className="bg-gray-300 p-2 text-2xl font-bold rounded-md text-gray-800 mr-2">
              {movie.vote_average.toFixed(1)}
            </span>
            {Array.from({ length: totalStars }, (_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className={`ml-1 cursor-pointer ${
                  index < (hoveredStar !== null ? hoveredStar : filledStars)
                    ? 'text-yellow-500'
                    : 'text-gray-400'
                }`}
                onMouseEnter={() => setHoveredStar(index + 1)}
                onMouseLeave={() => setHoveredStar(null)}
              />
            ))}
            <p className="ml-4 bg-gray-700 px-2 py-1 font-semibold text-xs rounded-md text-gray-200">
              Your rating: 0
            </p>
          </div>
          <div className="mt-2 border-t-2 border-gray-600">
            <p className="text-gray-200 text-md">{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigasi */}
      <div className="mt-12">
        <div className=' border-b-2 border-gray-600 border-t-2'>
            <div className="flex gap-4 py-3">
            <button
                className={`px-4 py-1 font-semibold rounded-lg ${activeTab === 'info' ? 'bg-red-600 text-white' : 'bg-gray-600 text-gray-300'}`}
                onClick={() => setActiveTab('info')}
            >
                Info
            </button>
            <button
                className={`px-4 py-1 font-semibold rounded-lg ${activeTab === 'cast' ? 'bg-red-600 text-white' : 'bg-gray-600 text-gray-300'}`}
                onClick={() => setActiveTab('cast')}
            >
                Cast
            </button>
            </div>
        </div>

        <div className='border-b-2 border-gray-600 mt-4'>
            <div className="mb-10">
            {activeTab === 'info' && (
                <div className="text-gray-200">
                  <div className="mt-8 border-l-4 border-red-600">
                    <h2 className="text-xl font-semibold ml-2 text-gray-200">Info</h2>
                  </div>
                  <div className="mt-20 flex flex-col items-center justify-center">
                      <h3 className="text-2xl font-semibold">What's your reaction?</h3>
                      <div className="flex gap-2 mt-6">
                          <span className="text-4xl">😊</span>
                          <span className="text-4xl">😍</span>
                          <span className="text-4xl">😭</span>
                          <span className="text-4xl">😠</span>
                          <span className="text-4xl">😎</span>
                          <span className="text-4xl">😮</span>
                          <span className="text-4xl">😴</span>
                      </div>
                  </div>

                  <div className="mt-6 flex flex-col items-center justify-center">
                    <div className="flex gap-2 mt-2">
                        <span className='border-2 px-3 py-1 cursor-pointer rounded-sm border-white'><FontAwesomeIcon icon={faFacebook} /> Facebook </span>
                        <span className='border-2 px-3 py-1 cursor-pointer rounded-sm border-white'><FontAwesomeIcon icon={faTwitter} /> Twitter </span>
                        <span className='border-2 px-3 py-1 cursor-pointer rounded-sm border-white'><FontAwesomeIcon icon={faWhatsapp} /> </span>
                        <span className='border-2 px-3 py-1 cursor-pointer rounded-sm border-white'><FontAwesomeIcon icon={faTelegram} /> </span>
                        <span className='border-2 px-3 py-1 cursor-pointer rounded-sm border-white'><FontAwesomeIcon icon={faFacebookMessenger} /> </span>
                    </div>
                  </div>
                </div>
              )}
            {activeTab === 'cast' && (
              <div className="text-gray-200 mt-6">
                <div className="mt-8 border-l-4 border-red-600">
                  <h2 className="text-xl font-semibold ml-2 text-gray-200">Cast</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
                  {cast.map((actor) => (
                    <div key={actor.id} className="flex flex-col">
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full h-auto object-cover rounded-lg mb-2"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-500 flex items-center justify-center rounded-lg mb-2">
                          <span className="text-gray-300">No Image</span>
                        </div>
                      )}
                      <h3 className="text-lg font-semibold">{actor.name}</h3>
                      <p className="text-sm text-gray-400">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="mt-8 border-l-4 border-red-600">
          <h2 className="text-xl font-semibold ml-2 text-gray-200">TV Show Terkait</h2>
        </div>
        <Swiper
            spaceBetween={14} // Jarak antar slide
            slidesPerView={8} // Menampilkan 6 gambar pada ukuran layar besar
            grabCursor={true}
            breakpoints={{
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
            1280: {
                slidesPerView: 6,
            },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-8"
        >
            {similarMovies.map((similarMovie) => (
            <SwiperSlide
                key={similarMovie.id}
                onClick={() => navigate(`/movie/${similarMovie.id}`)}
                className="movie-item relative rounded-xl overflow-hidden cursor-pointer"
            >
                <div className='flex justify-center items-center'>
                  <img
                  src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                  alt={similarMovie.title}
                  className="object-cover h-[260px] w-full rounded-xl"
                  />
                  <div className="absolute inset-0 flex justify-center items-center h-[260px] rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70">
                    <div className="border-4 border-white rounded-full h-12 w-12 flex justify-center items-center">
                      <FontAwesomeIcon icon={faPlay} className="text-white text-lg" />
                    </div>
                    <div className="absolute bottom-0 right-0 text-white text-sm font-semibold bg-gray-100 rounded-br-xl bg-opacity-20 px-2 py-[2px] flex items-center space-x-1">
                      <FontAwesomeIcon icon={faStar} className="text-xs text-yellow-500" />
                      <span>{similarMovie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-white hover:text-red-600 mt-2">{similarMovie.name}</h3> {/* Perbaiki di sini */}
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieDetail;
