import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.formations'), path: '/formations' },
    { name: t('nav.about'), path: '/#about' },
    { name: t('nav.contact'), path: '/#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-dark/80 backdrop-blur-md py-3 shadow-lg shadow-black/20 border-b border-border'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-heading font-bold text-2xl text-text tracking-tight group-hover:text-primary transition-colors">
              Golden Call
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-sans text-sm font-medium text-text-muted hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4 border-l border-border pl-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text transition-colors"
              >
                <Globe size={16} />
                <span className="uppercase">{i18n.language === 'fr' ? 'FR | EN' : 'EN | FR'}</span>
              </button>

              <Link
                to="/formations"
                className="bg-primary hover:bg-primary-dark text-dark font-sans font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 transform hover:scale-105"
              >
                {t('nav.start')}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-text-muted hover:text-text p-2"
            >
              <Globe size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text hover:text-primary p-2"
              aria-label={t('common.openMenu')}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-dark/95 backdrop-blur-xl z-40 transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ top: '60px' }}
      >
        <div className="flex flex-col p-6 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="font-heading text-2xl text-text hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-border">
            <Link
              to="/formations"
              className="block w-full text-center bg-primary text-dark font-sans font-semibold text-lg px-6 py-4 rounded-full"
            >
              {t('nav.start')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};