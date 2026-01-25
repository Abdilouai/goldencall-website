import React from 'react';
import { BlogPost } from '../../components/BlogPost';

export const CabinCrewMistakes: React.FC = () => {
  const content = (
    <>
      <p className="lead text-xl text-gray-600 mb-8">
        Assessment days are your chance to shine, but common mistakes can cost you the opportunity. 
        Learn what airlines really look for and how to avoid these critical errors.
      </p>

      <h2 className="text-3xl font-heading font-bold mt-12 mb-6">1. Arriving Unprepared</h2>
      <p>
        Many candidates underestimate the importance of research. Airlines want to see that you've 
        taken the time to understand their brand, values, and routes. Before your assessment day:
      </p>
      <ul>
        <li>Research the airline's history and recent news</li>
        <li>Study their fleet and destinations</li>
        <li>Understand their uniform and service standards</li>
        <li>Know their competitors and what makes them unique</li>
      </ul>

      <h2 className="text-3xl font-heading font-bold mt-12 mb-6">2. Poor Grooming Standards</h2>
      <p>
        First impressions matter enormously in aviation. Your appearance speaks before you do. 
        Airlines have strict grooming standards, and failing to meet them shows a lack of professionalism.
      </p>
      <p><strong>Key grooming requirements:</strong></p>
      <ul>
        <li>Professional business attire (suit for men, blazer/skirt for women)</li>
        <li>Neat, tied-back hair (for women)</li>
        <li>Minimal, natural makeup</li>
        <li>Clean, manicured nails</li>
        <li>No visible tattoos or excessive jewelry</li>
      </ul>

      <h2 className="text-3xl font-heading font-bold mt-12 mb-6">3. Not Being a Team Player</h2>
      <p>
        Group exercises are designed to assess your teamwork skills. Airlines need crew members who 
        can collaborate effectively at 30,000 feet. Common mistakes include:
      </p>
      <ul>
        <li>Dominating the conversation</li>
        <li>Not contributing at all</li>
        <li>Ignoring others' ideas</li>
        <li>Creating conflict instead of resolving it</li>
      </ul>
      <p>
        <strong>Pro tip:</strong> Balance is key. Listen actively, contribute constructively, and 
        help facilitate others to speak.
      </p>

      <h2 className="text-3xl font-heading font-bold mt-12 mb-6">4. Weak Body Language</h2>
      <p>
        Your body language communicates confidence—or lack thereof. Recruiters notice:
      </p>
      <ul>
        <li>Eye contact (or avoiding it)</li>
        <li>Posture and how you sit</li>
        <li>Hand gestures and fidgeting</li>
        <li>Facial expressions and genuine smiles</li>
      </ul>
      <p>
        Practice maintaining open, confident body language. Stand tall, smile genuinely, and 
        make appropriate eye contact with everyone in the room.
      </p>

      <h2 className="text-3xl font-heading font-bold mt-12 mb-6">5. Generic Answers to Questions</h2>
      <p>
        "I want to travel" and "I love meeting people" are answers recruiters hear hundreds of times. 
        They're looking for authentic, specific responses that show your genuine passion.
      </p>
      <p><strong>Instead of generic answers, try:</strong></p>
      <ul>
        <li>Sharing a specific story that illustrates your passion for service</li>
        <li>Explaining how your unique background makes you ideal for the role</li>
        <li>Demonstrating knowledge of the airline's specific values</li>
        <li>Using the STAR method to structure your responses</li>
      </ul>

      <h2 className="text-3xl font-heading font-bold mt-12 mb-6">Final Thoughts</h2>
      <p>
        Avoiding these mistakes isn't about being perfect—it's about being prepared, professional, 
        and authentic. Assessment days are competitive, but with the right preparation, you can 
        stand out for all the right reasons.
      </p>
      <p>
        Remember: Airlines aren't just hiring flight attendants; they're building their brand 
        ambassadors. Show them why you're the right choice.
      </p>

      <div className="bg-light border-l-4 border-primary p-6 my-8">
        <h3 className="font-heading font-bold text-xl mb-2">Need Personalized Guidance?</h3>
        <p className="text-gray-700">
          Our one-on-one coaching sessions cover all aspects of assessment day preparation, 
          from grooming standards to interview techniques. Book your session today and walk 
          into your assessment day with confidence.
        </p>
      </div>
    </>
  );

  return (
    <BlogPost
      title="5 Mistakes That Cost Candidates Their Cabin Crew Offers"
      category="Cabin Crew"
      readTime="5 min"
      date="Oct 05, 2023"
      author="Admin"
      content={content}
      imageUrl="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=600&fit=crop"
    />
  );
};