import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Check, Plane, Target, Briefcase } from 'lucide-react';
import { TestimonialCard, StatCounter } from '../components/UIComponents';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <SEO
        title="Home"
        description="Expert cabin crew English training, interview coaching, and IELTS speaking lessons. Personalized 1-on-1 sessions for candidates worldwide. Book today with Golden Call Consulting."
        keywords="cabin crew english training, assessment day preparation, aviation interview coaching, IELTS speaking coach, golden call consulting"
        canonicalPath="/"
      />
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary via-dark to-dark blur-3xl rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-block bg-card border border-border rounded-full px-4 py-1.5 mb-6">
              <span className="font-sans font-bold text-[10px] tracking-widest text-primary">
                {t('home.badge')}
              </span>
            </div>

            <h1 className="font-heading font-bold text-5xl md:text-7xl leading-[1.1] text-text mb-6">
              {t('home.h1')}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-primary">{t('home.h1Highlight')}</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 -z-10 rounded-sm"></span>
              </span>
            </h1>

            <p className="font-sans text-lg text-text-muted leading-relaxed mb-10 max-w-xl">
              {t('home.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/formations" className="bg-primary hover:bg-primary-dark text-dark font-sans font-bold text-center px-8 py-4 rounded-xl transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 flex items-center justify-center gap-2 text-lg">
                🎁 Book a Free Session
              </Link>
              <a href="#formations" className="bg-card hover:bg-border border border-border text-text font-sans font-semibold text-center px-8 py-4 rounded-xl transition-all flex items-center justify-center">
                {t('home.ctaSecondary')}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 font-sans text-sm text-text-muted">
              <div className="flex items-center gap-2"><Check size={16} className="text-primary" /> {t('home.trustStudents')}</div>
              <div className="flex items-center gap-2"><Check size={16} className="text-primary" /> {t('home.trustResults')}</div>
              <div className="flex items-center gap-2"><Check size={16} className="text-primary" /> {t('home.trustOnline')}</div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            {/* Replace /images/hero-image.webp with actual path if available, or keep placeholder stylings */}
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-border relative">
              <img src="/images/hero-bg.webp" alt="Golden Call Coaching" className="w-full h-full object-cover opacity-80" onError={(e) => {
                // Fallback if image doesn't exist
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1287&auto=format&fit=crop';
              }} />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
            </div>

            {/* Floating review badge */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce shadow-black">
              <span className="font-sans font-bold text-sm text-text">{t('home.reviewBadge')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What We Offer */}
      <section id="formations" className="py-24 bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-text mb-4">{t('home.offersTitle')}</h2>
            <p className="font-sans text-lg text-text-muted">{t('home.offersSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Program 1 */}
            <div className="bg-card border border-primary/30 rounded-2xl p-8 relative hover:-translate-y-2 transition-transform">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-dark font-sans font-bold text-[10px] tracking-wider uppercase px-4 py-1 rounded-full">
                {t('home.programCcPopular')}
              </div>
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20">
                <Plane size={24} className="text-primary" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-text mb-4">{t('home.programCcTitle')}</h3>
              <p className="font-sans text-text-muted leading-relaxed mb-8">{t('home.programCcDesc')}</p>
              <Link to="/formations" state={{ tab: 'cabin-crew' }} className="flex items-center gap-2 font-sans font-bold text-sm text-primary hover:text-primary-dark transition-colors mt-auto">
                {t('home.seeOffers')}
              </Link>
            </div>

            {/* Program 2 */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:-translate-y-2 transition-transform">
              <div className="w-14 h-14 bg-dark rounded-xl flex items-center justify-center mb-6 border border-border">
                <Target size={24} className="text-text-muted" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-text mb-4">{t('home.programIeltsTitle')}</h3>
              <p className="font-sans text-text-muted leading-relaxed mb-8">{t('home.programIeltsDesc')}</p>
              <Link to="/formations" state={{ tab: 'ielts' }} className="flex items-center gap-2 font-sans font-bold text-sm text-primary hover:text-primary-dark transition-colors mt-auto">
                {t('home.seeOffers')}
              </Link>
            </div>

            {/* Program 3 */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:-translate-y-2 transition-transform">
              <div className="w-14 h-14 bg-dark rounded-xl flex items-center justify-center mb-6 border border-border">
                <Briefcase size={24} className="text-text-muted" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-text mb-4">{t('home.programProTitle')}</h3>
              <p className="font-sans text-text-muted leading-relaxed mb-8">{t('home.programProDesc')}</p>
              <Link to="/formations" state={{ tab: 'interview' }} className="flex items-center gap-2 font-sans font-bold text-sm text-primary hover:text-primary-dark transition-colors mt-auto">
                {t('home.seeOffers')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section id="about" className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-y border-border py-12">
            <StatCounter target={200} prefix="+" label="Étudiants formés" />
            <StatCounter target={95} suffix="%" label="Taux de réussite" />
            <StatCounter target={4} prefix="+" label="Ans d'expérience" />
            <StatCounter target={100} suffix="%" label="En ligne" />
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-text mb-4">{t('home.howItWorksTitle')}</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-border z-0"></div>

            {[
              { num: '01', title: t('home.step1Title'), desc: t('home.step1Desc') },
              { num: '02', title: t('home.step2Title'), desc: t('home.step2Desc') },
              { num: '03', title: t('home.step3Title'), desc: t('home.step3Desc') },
            ].map((step, i) => (
              <div key={i} className="flex-1 text-center relative z-10">
                <div className="w-14 h-14 mx-auto bg-dark border-2 border-primary rounded-full flex items-center justify-center font-heading font-bold text-primary text-xl mb-6 shadow-lg shadow-primary/20">
                  {step.num}
                </div>
                <h3 className="font-heading font-bold text-xl text-text mb-3">{step.title}</h3>
                <p className="font-sans text-text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-24 bg-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-4xl text-text mb-12">{t('home.testimonialsTitle')}</h2>

          <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide">
            <div className="snap-center shrink-0 w-4 md:w-0"></div>
            <TestimonialCard
              name="Sonia B."
              role="Cabin Crew Prep"
              quote="Golden Call m'a aidée à comprendre ce que les compagnies aériennes recherchent vraiment. J'ai été prise chez Emirates du premier coup."
            />
            <TestimonialCard
              name="Youssef T."
              role="IELTS Coaching"
              quote="Une approche claire et ciblée. J'ai bloqué sur l'oral pendant des mois, mais avec ce coaching j'ai obtenu mon 7.5 facilement."
            />
            <TestimonialCard
              name="Amira K."
              role="Entretien Professionnel"
              quote="La simulation d'entretien a fait une différence énorme. Le feedback était direct et m'a permis de reprendre confiance en moi."
            />
            <TestimonialCard
              name="Nessrine M."
              role="Cabin Crew Prep"
              quote="Merci pour la préparation au group assessment. Tout s'est passé exactement comme on l'avait simulé!"
            />
            <div className="snap-center shrink-0 w-4 md:w-0"></div>
          </div>
        </div>
      </section>

      {/* 6. CTA Block */}
      <section className="relative py-24 bg-primary overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/20 blur-3xl rounded-full"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-dark mb-6">
            {t('home.teaserTitle')}
          </h2>
          <p className="font-sans text-xl text-dark/80 mb-10 max-w-2xl mx-auto">
            {t('home.teaserSubtitle')}
          </p>
          <Link to="/formations" className="inline-block bg-dark text-text hover:bg-black font-sans font-bold text-lg px-10 py-5 rounded-2xl transition-all shadow-xl hover:-translate-y-1">
            Book your Free Session
          </Link>
        </div>
      </section>
    </div>
  );
};