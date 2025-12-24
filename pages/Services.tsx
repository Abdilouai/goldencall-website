import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Briefcase, BookOpen, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';

export const Services: React.FC = () => {
  useSEO(
    "Coaching Services | Cabin Crew, Interview Prep & IELTS",
    "Professional coaching for cabin crew assessments, HR interviews, and IELTS speaking. Personalized 1-on-1 sessions with proven results."
  );

  return (
    <div className="pt-12 pb-24">
      <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-dark mb-6">Professional Coaching Services</h1>
          <p className="text-xl text-gray-600">Choose the service that matches your goals. Every session is personalized, practical, and designed to build real confidence.</p>
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
              <span>Cabin Crew Preparation</span>
            </div>
            <h2 className="font-heading font-bold text-3xl mb-4 text-dark">Assessment Day Mastery</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Assessment days are intense and competitive. I've been there. I help you understand exactly what airlines look for in group exercises and final panels. We cover body language, etiquette, and the psychology of recruiters.
            </p>
            <ul className="space-y-3 mb-8">
              {['Assessment day structure walkthrough', 'Group exercise strategies', 'Grooming & body language feedback', 'Common Q&A preparation'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={20} className="text-success mt-0.5 shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/book?service=cabin-crew">
              <Button>Book Assessment Prep</Button>
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
              <span>Interview Coaching</span>
            </div>
            <h2 className="font-heading font-bold text-3xl mb-4 text-dark">Final Interview Prep</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Whether it's an HR interview or aviation-specific role, I'll help you prepare answers that showcase your strengths. We focus on the STAR method to structure your experiences effectively.
            </p>
            <ul className="space-y-3 mb-8">
              {['STAR method mastery', 'Mock interview simulations', 'Handling difficult questions', 'Salary negotiation basics'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={20} className="text-success mt-0.5 shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/book?service=interview-prep">
              <Button>Book Interview Prep</Button>
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
              <span>ESL & IELTS</span>
            </div>
            <h2 className="font-heading font-bold text-3xl mb-4 text-dark">English Confidence Coaching</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Speaking English confidently is a skill you can learn. I create a judgment-free space where you can practice, improve your accent, and gain real fluency for your IELTS exam or job interviews.
            </p>
            <ul className="space-y-3 mb-8">
              {['IELTS Speaking strategies', 'Pronunciation & accent clarity', 'Professional vocabulary building', 'Overcoming speaking anxiety'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={20} className="text-success mt-0.5 shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/book?service=esl-teaching">
              <Button>Book ESL Coaching</Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};