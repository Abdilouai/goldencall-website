import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Mail, Phone, Instagram } from 'lucide-react';

const FacebookIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
  >
    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.24 10.44 22v-7.02H7.9v-2.9h2.54V9.79c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.86h2.78l-.44 2.9h-2.34V22C18.34 21.24 22 17.09 22 12.07z" />
  </svg>
);

const TiktokIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
  >
    {/* Simplified TikTok-like mark for display purposes */}
    <path d="M17.5 3h-2.2v7.1a3.3 3.3 0 1 1-3.3-3.3 3.2 3.2 0 0 1 .3.02V3A7.3 7.3 0 1 0 18 10.3V7h-1.5V3z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Logo className="h-10 mb-6 brightness-0 invert" />
            <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
              Golden Call Consulting empowers Tunisian candidates to achieve their dreams of joining world-class airlines and top companies
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/golden_call1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-white/10 rounded-full hover:bg-brand-blue transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>

              <a
                href="https://www.tiktok.com/@golden_call1?_r=1&_t=ZM-92KoR1pGRhI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-white/10 rounded-full hover:bg-brand-blue transition-colors"
                aria-label="TikTok"
              >
                <TiktokIcon size={18} />
                <span className="sr-only">TikTok</span>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61585462373272&rdid=wJqB8Gr9CzOrfqJA#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-white/10 rounded-full hover:bg-brand-blue transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-brand-blue inline-block">Quick Links</h4>
            <ul className="space-y-4 mt-4">
              <li><Link to="/" className="text-gray-400 hover:text-brand-blue">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-brand-blue">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-brand-blue">Services</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-brand-blue">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-brand-blue inline-block">Contact</h4>
            <ul className="space-y-4 text-gray-400 mt-4">
              <li className="flex items-center gap-3">
                <Mail size={18} />
                <a href="mailto:golden_call@outlook.com" className="hover:text-brand-blue">golden_call@outlook.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} />
                <span>Based in Tunis</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Golden Call Consulting.
        </div>
      </div>
    </footer>
  );
};
