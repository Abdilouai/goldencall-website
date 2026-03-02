import React from 'react';
import { Award, Globe, Heart, MessageCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';
import { useTranslation } from 'react-i18next';

export const About: React.FC = () => {
  const { t } = useTranslation();

  useSEO(
    "About Us | Expert Interview Coaches with Real Experience",
    "Meet your coaches: English graduates with real cabin crew assessment experience. Personalized coaching that builds confidence and skills."
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl mb-4 text-dark">{t('about.heroTitle')}</h1>
          <p className="text-xl text-gray-600">{t('about.heroSubtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="font-heading font-bold text-3xl mb-6 text-dark">{t('about.knowTitle')}</h2>
            <div className="prose prose-lg text-gray-600 space-y-6">
              <p>{t('about.knowP1')}</p>
              <p>{t('about.knowP2')}</p>
              <p>{t('about.knowP3')}</p>
              <p>{t('about.knowP4')}</p>
            </div>

            <div className="mt-10 pt-10 border-t border-gray-100">
              <h3 className="font-heading font-bold text-xl mb-4 text-dark">{t('about.ourMission')}</h3>
              <p className="text-gray-600">{t('about.missionDesc')}</p>
            </div>

            <div className="mt-8">
              <a href="/book">
                <Button>{t('about.workWithUs')}</Button>
              </a>
            </div>
          </div>

          {/* Image/Stats */}
          <div className="w-full lg:w-1/2">
            <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>

              <h3 className="font-heading font-bold text-2xl mb-8 relative z-10">{t('about.whyChoose')}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Award className="mb-3 text-gold" size={32} />
                  <h4 className="font-bold mb-1">{t('about.bachelors')}</h4>
                  <p className="text-sm text-blue-100">{t('about.bachelorsDesc')}</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Globe className="mb-3 text-gold" size={32} />
                  <h4 className="font-bold mb-1">{t('about.globalExperience')}</h4>
                  <p className="text-sm text-blue-100">{t('about.globalExperienceDesc')}</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <MessageCircle className="mb-3 text-gold" size={32} />
                  <h4 className="font-bold mb-1">{t('about.interviewExperts')}</h4>
                  <p className="text-sm text-blue-100">{t('about.interviewExpertsDesc')}</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Heart className="mb-3 text-gold" size={32} />
                  <h4 className="font-bold mb-1">{t('about.passionateCoaches')}</h4>
                  <p className="text-sm text-blue-100">{t('about.passionateCoachesDesc')}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
