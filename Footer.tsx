
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Mail, Phone, Instagram, Facebook } from 'lucide-react';

// Custom TikTok Icon as it's not available in the standard lucide-react package
const TikTokIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const Footer: React.FC = () => {
  const socialLinks = {
    instagram: 'https://www.instagram.com/golden_call1?igsh=MWMybDZzaHl0ZGRhMA==',
    tiktok: 'https://www.tiktok.com/@golden_call1?_r=1&_t=ZM-92KoR1pGRhI',
    facebook: 'https://www.facebook.com/profile.php?id=61585462373272&rdid=wJqB8Gr9CzOrfqJA#'
  };

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Logo className="h-10 mb-6 brightness-0 invert" />
            <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
              Golden Call Consulting empowers Tunisian candidates to achieve their dreams of joining world-class airlines and top companies.
            </p>
            <div className="flex space-x-4">
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-white/10 rounded-full hover:bg-brand-blue transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href={socialLinks.tiktok} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-white/10 rounded-full hover:bg-brand-blue transition-all hover:scale-110"
                aria-label="TikTok"
              >
                <TikTokIcon size={18} />
              </a>
              <a 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-white/10 rounded-full hover:bg-brand-blue transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-brand-blue inline-block">Quick Links</h4>
            <ul className="space-y-4 mt-4">
              <li><Link to="/" className="text-gray-400 hover:text-brand-blue transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-brand-blue transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-brand-blue transition-colors">Services</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-brand-blue transition-colors">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-brand-blue inline-block">Contact</h4>
            <ul className="space-y-4 text-gray-400 mt-4">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-blue" />
                <a href="mailto:hello@goldencall.tn" className="hover:text-white transition-colors">hello@goldencall.tn</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-blue" />
                <span>Based in Tunis</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Golden Call Consulting. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
