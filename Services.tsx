import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Briefcase, GraduationCap } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark">Our Coaching Services</h1>
          <p className="text-gray-500 mt-4">Specialized preparation for your career milestones.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <Plane className="text-brand-blue mb-4" size={48} />
            <h3 className="text-xl font-bold mb-2">Cabin Crew Prep</h3>
            <p className="text-gray-500 mb-6 leading-relaxed">Master the Assessment Day group activities, roleplays, and grooming standards.</p>
            <Link to="/booking" className="text-brand-blue font-bold hover:underline">Book Assessment Prep →</Link>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <Briefcase className="text-brand-blue mb-4" size={48} />
            <h3 className="text-xl font-bold mb-2">Final Interviews</h3>
            <p className="text-gray-500 mb-6 leading-relaxed">Intensive HR and Aviation specific interview strategies and mock sessions.</p>
            <Link to="/booking" className="text-brand-blue font-bold hover:underline">Book Interview Coaching →</Link>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <GraduationCap className="text-brand-blue mb-4" size={48} />
            <h3 className="text-xl font-bold mb-2">IELTS Preparation</h3>
            <p className="text-gray-500 mb-6 leading-relaxed">Language training tailored for the band score requirements of world airlines.</p>
            <Link to="/booking" className="text-brand-blue font-bold hover:underline">Book IELTS Prep →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;