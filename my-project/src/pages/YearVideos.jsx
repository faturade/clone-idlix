import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMoviesByYear } from '../Services/movieService'; // Pastikan fungsi getMoviesByYear ada
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';

const YearVideos = () => {
  const { year } = useParams();
  const navigate = useNavigate();  // Ambil parameter tahun dari URL
  const [videos, setVideos] = useState([]); // Mendefinisikan state videos untuk menampung data video

  useEffect(() => {
    // Ambil video berdasarkan tahun saat halaman dibuka
    fetchVideosByYear(year); // Panggil fungsi untuk mengambil data video berdasarkan tahun
  }, [year]);

  const fetchVideosByYear = async (year) => {
    try {
      const response = await getMoviesByYear(year); // Panggil API getMoviesByYear dari movieService
      setVideos(response.data.results); // Simpan data video dalam state videos
    } catch (error) {
      console.error('Error fetching videos:', error); // Tampilkan error jika terjadi masalah
    }
  };

  return (
    <div className="mt-20 px-10">
      <div className='border-l-4 border-red-500'>
        <h2 className="text-xl font-bold mb-4 text-white ml-2">Videos Sesuai Tahun</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mt-8">
        {videos.length ? (
          videos.map((video) => (
            <div key={video.id} onClick={() => navigate(`/movie/${video.id}`)} className="video-card relative rounded-xl overflow-hidden cursor-pointer">
              <img src={`https://image.tmdb.org/t/p/w500${video.poster_path}`} alt={video.title} className='object-cover h-[291px] w-full rounded-xl'/>
              <div className="absolute inset-0 flex justify-center items-center h-[291px] rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70">
                <div className="border-4 border-white rounded-full h-12 w-12 flex justify-center items-center transform transition-transform duration-300 hover:scale-110">
                  <FontAwesomeIcon icon={faPlay} className="text-white ml-1 text-xl" />
                </div>
                <div className="absolute bottom-0 right-0 text-white text-sm font-semibold bg-gray-100 rounded-br-xl bg-opacity-20 px-2 py-[2px] flex items-center space-x-1">
                  <FontAwesomeIcon icon={faStar} className="text-xs text-yellow-500" />
                  <span>{video.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <div>
                <h3 className='className="text-md font-semibold text-white hover:text-red-600"'>{video.title}</h3>
                <p className="text-gray-400 text-sm">{video.release_date}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No videos found for {year}</p>
        )}
      </div>
    </div>
  );
};

export default YearVideos;
