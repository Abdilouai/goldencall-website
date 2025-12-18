import React from 'react';
import { Compass, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-brand-dark mb-8 border-b-4 border-brand-blue inline-block">About Golden Call</h1>
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
          <div className="space-y-6">
            <p className="text-xl text-brand-grey leading-relaxed">
              Based in Tunisia, Golden Call Consulting is dedicated to bridging the gap between local talent and global aviation opportunities.
            </p>
            <p className="text-gray-600">
              Founded by an English language specialist with real-world experience in airline recruitment, we provide the personalized attention you need to succeed.
            </p>
            <div className="flex gap-4 items-start">
              <Compass className="text-brand-blue mt-1" />
              <div><h3 className="font-bold">Our Mission</h3><p className="text-gray-500">To empower candidates with unshakeable confidence and professional skills.</p></div>
            </div>
            <div className="flex gap-4 items-start">
              <Target className="text-brand-blue mt-1" />
              <div><h3 className="font-bold">Our Vision</h3><p className="text-gray-500">To be Tunisia's most trusted partner for aviation career consulting.</p></div>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" className="rounded-2xl shadow-xl" alt="Founder" />
        </div>
      </div>
    </div>
  );
};

export default About;