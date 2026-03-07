import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-border pt-16 pb-8" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Tagline */}
          <div className="col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-heading font-bold text-2xl text-text">
                Golden Call
              </span>
            </Link>
            <p className="text-text-muted font-sans text-sm leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 flex flex-col space-y-3">
            <Link to="/" className="text-text-muted hover:text-primary transition-colors font-sans text-sm">
              {t('nav.home')}
            </Link>
            <Link to="/formations" className="text-text-muted hover:text-primary transition-colors font-sans text-sm">
              {t('nav.formations')}
            </Link>
            <Link to="/#about" className="text-text-muted hover:text-primary transition-colors font-sans text-sm">
              {t('nav.about')}
            </Link>
            <Link to="/#contact" className="text-text-muted hover:text-primary transition-colors font-sans text-sm">
              {t('nav.contact')}
            </Link>
          </div>

          {/* Contact Info & Socials */}
          <div className="col-span-1 flex flex-col space-y-4">
            <a href="tel:+21629373579" className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors">
              <Phone size={18} />
              <span className="font-sans text-sm">+216 29 373 579</span>
            </a>
            <a href="mailto:contact@goldencall.com" className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors">
              <Mail size={18} />
              <span className="font-sans text-sm">contact@goldencall.com</span>
            </a>

            <div className="flex gap-4 pt-2">
              <a href="https://www.instagram.com/golden_call1?igsh=MWMybDZzaHl0ZGRhMA==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/share/1AbJWc4apE/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://www.linkedin.com/company/goldencall/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted font-sans text-xs">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};
