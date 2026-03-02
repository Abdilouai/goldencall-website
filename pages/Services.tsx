import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Briefcase, BookOpen, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';
import { useTranslation } from 'react-i18next';

export const Services: React.FC = () => {
  const { t } = useTranslation();

  useSEO(
    "Coaching Services | Cabin Crew, Interview Prep & IELTS",
    "Professional coaching for cabin crew assessments, HR interviews, and IELTS speaking. Personalized 1-on-1 sessions with proven results."
  );

  return (
    <div className="pt-12 pb-24">
      <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-dark mb-6">{t('services.pageTitle')}</h1>
          <p className="text-xl text-gray-600">{t('services.pageSubtitle')}</p>
        </div>

        {/* Service 1 */}
        <div id="cabin-crew" className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <div className="w-full md:w-1/2">
            <div className="bg-blue-50 rounded-3xl p-8 aspect-video flex items-center justify-center">
              <Plane size={80} className="text-primary opacity-80" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="inline-flex items-center gap-2 text-primary font-semibold mb-3">
              <Plane size={20} />
              <span>{t('services.cabinCrewPreparation')}</span>
            </div>
            <h2 className="font-heading font-bold text-3xl mb-4 text-dark">{t('services.assessmentDayMastery')}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('services.cabinCrewDesc')}
            </p>
            <ul className="space-y-3 mb-8">
              {[t('services.cabinCrewFeature1'), t('services.cabinCrewFeature2'), t('services.cabinCrewFeature3'), t('services.cabinCrewFeature4')].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={20} className="text-success mt-0.5 shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/book?service=cabin-crew">
              <Button>{t('services.bookAssessmentPrep')}</Button>
            </Link>
          </div>
        </div>

        {/* Service 2 */}
        <div id="interview-prep" className="flex flex-col md:flex-row-reverse items-center gap-12 mb-24">
          <div className="w-full md:w-1/2">
            <div className="bg-gray-100 rounded-3xl p-8 aspect-video flex items-center justify-center">
              <Briefcase size={80} className="text-gray-500 opacity-80" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="inline-flex items-center gap-2 text-primary font-semibold mb-3">
              <Briefcase size={20} />
              <span>{t('services.interviewCoaching')}</span>
            </div>
            <h2 className="font-heading font-bold text-3xl mb-4 text-dark">{t('services.finalInterviewPrep')}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('services.interviewDesc')}
            </p>
            <ul className="space-y-3 mb-8">
              {[t('services.interviewFeature1'), t('services.interviewFeature2'), t('services.interviewFeature3'), t('services.interviewFeature4')].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={20} className="text-success mt-0.5 shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/book?service=interview-prep">
              <Button>{t('services.bookInterviewPrep')}</Button>
            </Link>
          </div>
        </div>

        {/* Service 3 */}
        <div id="esl-teaching" className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="bg-blue-50 rounded-3xl p-8 aspect-video flex items-center justify-center">
              <BookOpen size={80} className="text-primary opacity-80" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="inline-flex items-center gap-2 text-primary font-semibold mb-3">
              <BookOpen size={20} />
              <span>{t('services.eslIelts')}</span>
            </div>
            <h2 className="font-heading font-bold text-3xl mb-4 text-dark">{t('services.englishConfidence')}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('services.eslDesc')}
            </p>
            <ul className="space-y-3 mb-8">
              {[t('services.eslFeature1'), t('services.eslFeature2'), t('services.eslFeature3'), t('services.eslFeature4')].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={20} className="text-success mt-0.5 shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/book?service=esl-teaching">
              <Button>{t('services.bookEslCoaching')}</Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};