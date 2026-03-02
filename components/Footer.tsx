import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center text-primary">
                <Phone size={16} />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                golden<span className="text-primary">call</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/golden_call1/" className="text-gray-400 hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/company/goldencall/" className="text-gray-400 hover:text-primary transition-colors"><Linkedin size={20} /></a>
              <a href="https://www.facebook.com/profile.php?id=61585462373272&rdid=V8kvrzOTH9EGZKQn#" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-400 hover:text-primary text-sm transition-colors">{t('footer.services')}</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary text-sm transition-colors">{t('footer.aboutUs')}</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-primary text-sm transition-colors">{t('footer.blog')}</Link></li>
              <li><Link to="/book" className="text-gray-400 hover:text-primary text-sm transition-colors">{t('footer.bookSession')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">{t('footer.servicesTitle')}</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-400 hover:text-primary text-sm transition-colors">{t('footer.cabinCrewPrep')}</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary text-sm transition-colors">{t('footer.finalInterview')}</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary text-sm transition-colors">{t('footer.ieltsCoaching')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Mail size={18} className="mt-0.5 text-primary" />
                <span>golden_call@outlook.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Phone size={18} className="mt-0.5 text-primary" />
                <span>+216 29 373 579</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <span className="text-2xl mt-[-5px]">🇹🇳</span>
                <span>{t('footer.basedInTunisia')}<br />{t('footer.servingWorldwide')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-6">
            <span className="text-gray-600 text-xs">{t('footer.privacyPolicy')}</span>
            <span className="text-gray-600 text-xs">{t('footer.termsOfService')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
