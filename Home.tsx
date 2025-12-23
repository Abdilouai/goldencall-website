import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Award, Plane, Star } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <section className="bg-white pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-light rounded-full text-brand-blue font-semibold text-sm">
                <Plane size={16} /> <span>Your Gateway to the Skies</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-brand-dark leading-tight">
                Your <span className="text-brand-blue">Golden Call</span> to Career Success
              </h1>
              <p className="text-xl text-brand-grey max-w-lg leading-relaxed">
                Expert 1-on-1 coaching for Cabin Crew Assessments, Job Interviews, and ESL Teaching.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/booking" className="px-8 py-4 bg-brand-blue text-white rounded-lg font-bold text-lg hover:bg-brand-blue/90 transition-all text-center">
                  Book a Session
                </Link>
                <Link to="/services" className="px-8 py-4 bg-white border-2 border-brand-blue text-brand-blue rounded-lg font-bold text-lg hover:bg-brand-light transition-all text-center">
                  Explore Services
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img src="plane-4245416.jpg" className="rounded-2xl shadow-2xl" alt="Cabin Crew" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-brand-dark mb-12">What We Help You Achieve</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <CheckCircle2 className="text-brand-blue mb-4 mx-auto" size={32} />
              <h3 className="text-xl font-bold mb-2">Confidence</h3>
              <p className="text-gray-500">Master professional self-presentation for any assessment day.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <Award className="text-brand-blue mb-4 mx-auto" size={32} />
              <h3 className="text-xl font-bold mb-2">Expertise</h3>
              <p className="text-gray-500">Learn exactly what top recruiters are looking for in candidates.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <Star className="text-brand-blue mb-4 mx-auto" size={32} />
              <h3 className="text-xl font-bold mb-2">Fluency</h3>
              <p className="text-gray-500">Refine your English to meet the highest international standards.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
