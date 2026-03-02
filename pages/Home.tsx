import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Users, CheckCircle, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';
import { useTranslation } from 'react-i18next';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  useSEO(
    "Golden Call Consulting | Cabin Crew & IELTS Coaching Tunisia",
    "Expert cabin crew assessment day preparation, interview coaching, and IELTS speaking lessons. Based in Tunisia, serving candidates worldwide. Book your 1-on-1 session today."
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white pt-24 pb-32 overflow-hidden">
        {/* Abstract background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 rounded-l-full blur-3xl transform translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-sm border border-white/10">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
              <span className="text-sm font-medium tracking-wide">{t('home.badge')}</span>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-6xl leading-tight mb-6">
              {t('home.heroTitle1')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">{t('home.heroHighlight')}</span>{t('home.heroTitle2')}<br />
              {t('home.heroTitle3')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light leading-relaxed max-w-2xl mx-auto">
              {t('home.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book">
                <Button className="w-full sm:w-auto text-lg px-8 py-4">{t('home.bookSession')}</Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white/10 hover:text-white">
                  {t('home.exploreServices')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <div className="bg-white py-12 border-b border-gray-100 shadow-sm relative -mt-10 mx-4 md:mx-auto max-w-6xl rounded-xl z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-blue-50 text-primary rounded-full">
              <CheckCircle size={24} />
            </div>
            <h3 className="font-semibold text-dark">{t('home.realExperience')}</h3>
            <p className="text-gray-500 text-sm">{t('home.realExperienceDesc')}</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-blue-50 text-primary rounded-full">
              <Users size={24} />
            </div>
            <h3 className="font-semibold text-dark">{t('home.personalized')}</h3>
            <p className="text-gray-500 text-sm">{t('home.personalizedDesc')}</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-blue-50 text-primary rounded-full">
              <GraduationCap size={24} />
            </div>
            <h3 className="font-semibold text-dark">{t('home.englishExpert')}</h3>
            <p className="text-gray-500 text-sm">{t('home.englishExpertDesc')}</p>
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">{t('home.howCanWeHelp')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('home.howCanWeHelpDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t('home.cabinCrewAssessment'),
                desc: t('home.cabinCrewAssessmentDesc'),
                icon: <Plane className="w-8 h-8 text-primary" />,
                link: '/services'
              },
              {
                title: t('home.finalInterviewPrep'),
                desc: t('home.finalInterviewPrepDesc'),
                icon: <Users className="w-8 h-8 text-primary" />,
                link: '/services'
              },
              {
                title: t('home.ieltsEsl'),
                desc: t('home.ieltsEslDesc'),
                icon: <GraduationCap className="w-8 h-8 text-primary" />,
                link: '/services'
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-start">
                <div className="bg-blue-50 p-4 rounded-xl mb-6">
                  {service.icon}
                </div>
                <h3 className="font-heading font-bold text-xl mb-3 text-dark">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{service.desc}</p>
                <Link to={service.link} className="text-primary font-semibold flex items-center gap-2 group">
                  {t('home.learnMore')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">{t('home.successStories')}</h2>
            <p className="text-gray-600">{t('home.successStoriesDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: t('home.testimonial1Name'),
                role: t('home.testimonial1Role'),
                quote: t('home.testimonial1Quote')
              },
              {
                name: t('home.testimonial2Name'),
                role: t('home.testimonial2Role'),
                quote: t('home.testimonial2Quote')
              },
              {
                name: t('home.testimonial3Name'),
                role: t('home.testimonial3Role'),
                quote: t('home.testimonial3Quote')
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-light p-8 rounded-2xl relative">
                <div className="text-gold text-6xl font-serif absolute top-4 left-6 opacity-20">"</div>
                <p className="text-gray-700 italic mb-6 relative z-10 pt-4">"{testimonial.quote}"</p>
                <div>
                  <h4 className="font-bold text-dark">{testimonial.name}</h4>
                  <span className="text-sm text-primary font-medium">{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">{t('home.ctaTitle')}</h2>
          <p className="text-xl text-gray-300 mb-10">{t('home.ctaSubtitle')}</p>
          <Link to="/book">
            <Button className="text-lg px-10 py-4 shadow-lg shadow-blue-900/50">{t('home.bookNow')}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};