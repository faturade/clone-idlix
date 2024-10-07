import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 border-t border-gray-700">
      <div className="container mx-auto px-4 border-b border-gray-700">
        <div className="flex flex-col md:flex-row justify-between mb-8 space-y-8 md:space-y-0 ml-16">
          {/* Tentang Kami */}
          <div className="md:w-1/3 ml">
            <h3 className="text-7xl text-red-600 font-bold mb-4">ISGOOD</h3>
            <p className="text-sm leading-relaxed ml-2">
              ISGOOD adalah platform streaming film, series, anime, drakor subtitle Indonesia nomor 1 di Indonesia. Kami menyediakan kualitas terbaik secara gratis, didukung oleh server yang mumpuni. Tidak seperti platform streaming lainnya, ISGOOD menyediakan layanan nonton film berkualitas tanpa biaya. Hal ini karena tidak semua wilayah di Indonesia memiliki bioskop untuk menonton film-film terbaru.
            </p>
          </div>
          
          {/* Tautan Penting */}
          <div className="md:w-1/6">
            <h4 className="text-2xl font-bold mb-4 text-red-600">Tautan Penting</h4>
            <ul className="space-y-2 ml-1">
              <li><a href="/about" className="hover:text-red-400">Tentang Kami</a></li>
              <li><a href="/contact" className="hover:text-red-400">Kontak</a></li>
              <li><a href="/privacy" className="hover:text-red-400">Kebijakan Privasi</a></li>
              <li><a href="/terms" className="hover:text-red-400">Syarat dan Ketentuan</a></li>
            </ul>
          </div>

          {/* Kategori */}
          <div className="md:w-1/6">
            <h4 className="text-2xl font-bold mb-4 text-red-600">Kategori</h4>
            <ul className="space-y-2 ml-1">
              <li><a href="/category/action" className="hover:text-red-400">Action</a></li>
              <li><a href="/category/drama" className="hover:text-red-400">Drama</a></li>
              <li><a href="/category/comedy" className="hover:text-red-400">Comedy</a></li>
              <li><a href="/category/horror" className="hover:text-red-400">Horror</a></li>
              <li><a href="/category/romance" className="hover:text-red-400">Romance</a></li>
            </ul>
          </div>

          {/* Ikuti Kami */}
          <div className="md:w-1/6">
            <h4 className="text-2xl font-bold mb-4 text-red-600">Ikuti Kami</h4>
            <div className="space-y-2 ml-1">
              <div className="flex items-center space-x-2">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebook} className="text-xl hover:text-blue-600" />
                </a>
                <span className="text-sm">Facebook</span>
              </div>
              <div className="flex items-center space-x-2">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} className="text-xl hover:text-pink-600" />
                </a>
                <span className="text-sm">Instagram</span>
              </div>
              <div className="flex items-center space-x-2">
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} className="text-xl hover:text-blue-400" />
                </a>
                <span className="text-sm">Twitter</span>
              </div>
              <div className="flex items-center space-x-2">
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faYoutube} className="text-xl hover:text-red-600" />
                </a>
                <span className="text-sm">YouTube</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="mt-6 text-center">
        <p className="text-sm">© {new Date().getFullYear()} ISGOOD. Copyright IDLIX.</p>
      </div>
    </footer>
  );
};

export default Footer;
