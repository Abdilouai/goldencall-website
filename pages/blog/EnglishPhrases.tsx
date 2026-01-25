import React from 'react';
import { BlogPost } from '../../components/BlogPost';

export const EnglishPhrases: React.FC = () => {
  const content = (
    <>
      <p className="lead text-xl text-gray-600 mb-8">
        The words you choose in an interview matter. These 10 professional English phrases 
        will help you communicate confidence, competence, and professionalism.
      </p>

      <h2 className="text-3xl font-heading font-bold mt-12 mb-6">Why Professional Phrases Matter</h2>
      <p>
        In aviation interviews, your language reflects your communication skills—one of the most 
        critical competencies for cabin crew and aviation professionals. Using professional, 
        articulate phrases shows:
      </p>
      <ul>
        <li>Strong communication skills</li>
        <li>Confidence and preparation</li>
        <li>Cultural awareness and professionalism</li>
        <li>Ability to represent the airline brand</li>
      </ul>

      <h2 className="text-3xl font-heading font-bold mt-12 mb-6">10 Essential Interview Phrases</h2>

      <div className="space-y-8">
        <div className="bg-light p-6 rounded-lg">
          <h3 className="text-xl font-heading font-bold mb-3">
            1. "I'm particularly drawn to this opportunity because..."
          </h3>
          <p className="mb-2"><strong>Use when:</strong> Explaining why you want the role</p>
          <p className="mb-2"><strong>Example:</strong></p>
          <p className="text-gray-700 italic">
            "I'm particularly drawn to this opportunity because Emirates' commitment to 
            exceptional service aligns perfectly with my customer service background and 
            passion for creating memorable experiences."
          </p>
          <p className="mt-3"><strong>Why it works:</strong> Shows genuine interest and research</p>
        </div>

        <div className="bg-light p-6 rounded-lg">
          <h3 className="text-xl font-heading font-bold mb-3">
            2. "In my previous role, I demonstrated..."
          </h3>
          <p className="mb-2"><strong>Use when:</strong> Highlighting your skills with evidence</p>
          <p className="mb-2"><strong>Example:</strong></p>
          <p className="text-gray-700 italic">
            "In my previous role as a hotel receptionist, I demonstrated strong problem-solving 
            skills by successfully handling guest complaints and maintaining a 98% satisfaction rating."
          </p>
          <p className="mt-3"><strong>Why it works:</strong> Concrete evidence of skills</p>
        </div>

        <div className="bg-light p-6 rounded-lg">
          <h3 className="text-xl font-heading font-bold mb-3">
            3. "That's an excellent question. Let me give you a specific example..."
          </h3>
          <p className="mb-2"><strong>Use when:</strong> Buying time to think while staying professional</p>
          <p className="mb-2"><strong>Example:</strong></p>
          <p className="text-gray-700 italic">
            "That's an excellent question. Let me give you a specific example of how I handled 
            a similar situation during my internship..."
          </p>
          <p className="mt-3"><strong>Why it works:</strong> Compliments interviewer while giving you thinking time</p>
        </div>

        <div className="bg-light p-6 rounded-lg">
          <h3 className="text-xl font-heading font-bold mb-3">
            4. "I take pride in my ability to..."
          </h3>
          <p className="mb-2"><strong>Use when:</strong> Discussing your strengths confidently</p>
          <p className="mb-2"><strong>Example:</strong></p>
          <p className="text-gray-700 italic">
            "I take pride in my ability to remain calm under pressure and find solutions 
            quickly, which I believe is essential in the fast-paced aviation environment."
          </p>
          <p className="mt-3"><strong>Why it works:</strong> Confidence without arrogance</p>
        </div>

        <div className="bg-light p-6 rounded-lg">
          <h3 className="text-xl font-heading font-bold mb-3">
            5. "I'm committed to continuous improvement..."
          </h3>
          <p className="mb-2"><strong>Use when:</strong> Showing growth mindset</p>
          <p className="mb-2"><strong>Example:</strong></p>
          <p className="text-gray-700 italic">
            "I'm committed to continuous improvement, which is why I recently completed 
            advanced first aid training and enrolled in a hospitality management course."
          </p>
          <p className="mt-3"><strong>Why it works:</strong> Shows initiative and dedication</p>
        </div>

        <div className="bg-light p-6 rounded-lg">
          <h3 className="text-xl font-heading font-bold mb-3">
            6. "What I learned from that experience is..."
          </h3>
          <p className="mb-2"><strong>Use when:</strong> Ending STAR method stories</p>
          <p className="mb-2"><strong>Example:</strong></p>
          <p className="text-gray-700 italic">
            "What I learned from that experience is the importance of active listening and 
            understanding customer needs before offering solutions."
          </p>
          <p className="mt-3"><strong>Why it works:</strong> Shows reflection and growth</p>
        </div>

        <div className="bg-light p-6 rounded-lg">
          <h3 className="text-xl font-heading font-bold mb-3">
            7. "I approach challenges by..."
          </h3>
          <p className="mb-2"><strong>Use when:</strong> Discussing problem-solving</p>
          <p className="mb-2"><strong>Example:</strong></p>
          <p className="text-gray-700 italic">
            "I approach challenges by first gathering all relevant information, consulting 
            with team members when appropriate, and then implementing a solution while 
            keeping the customer's best interest in mind."
          </p>
          <p className="mt-3"><strong>Why it works:</strong> Shows systematic thinking</p>
        </div>

        <div className="bg-light p-6 rounded-lg">
          <h3 className="text-xl font-heading font-bold mb-3">
            8. "I believe my strengths align well with this role because..."
          </h3>
          <p className="mb-2"><strong>Use when:</strong> Connecting your skills to job requirements</p>
          <p className="mb-2"><strong>Example:</strong></p>
          <p className="text-gray-700 italic">
            "I believe my strengths align well with this role because my multilingual abilities, 
            customer service experience, and adaptability are exactly what cabin crew positions demand."
          </p>
          <p className="mt-3"><strong>Why it works:</strong> Shows you understand the role</p>
        </div>

        <div className="bg-light p-6 rounded-lg">
          <h3 className="text-xl font-heading font-bold mb-3">
            9. "Could you please elaborate on..."
          </h3>
          <p className="mb-2"><strong>Use when:</strong> Asking clarifying questions</p>
          <p className="mb-2"><strong>Example:</strong></p>
          <p className="text-gray-700 italic">
            "Could you please elaborate on the training process for new crew members? 
            I'd love to understand more about how the airline prepares its team."
          </p>
          <p className="mt-3"><strong>Why it works:</strong> Shows interest and engagement</p>
        </div>

        <div className="bg-light p-6 rounded-lg">
          <h3 className="text-xl font-heading font-bold mb-3">
            10. "I'm excited about the opportunity to contribute to..."
          </h3>
          <p className="mb-2"><strong>Use when:</strong> Closing your interview</p>
          <p className="mb-2"><strong>Example:</strong></p>
          <p className="text-gray-700 italic">
            "I'm excited about the opportunity to contribute to Qatar Airways' reputation 
            for world-class service and represent the airline on international routes."
          </p>
          <p className="mt-3"><strong>Why it works:</strong> Ends on enthusiastic, forward-looking note</p>
        </div>
      </div>

      <h2 className="text-3xl font-heading font-bold mt-12 mb-6">Bonus Tips for Professional Communication</h2>
      <ul>
        <li><strong>Avoid filler words:</strong> "um," "like," "you know"</li>
        <li><strong>Use active voice:</strong> "I managed" not "I was responsible for managing"</li>
        <li><strong>Be specific:</strong> Replace vague words with concrete examples</li>
        <li><strong>Practice pronunciation:</strong> Especially important for non-native speakers</li>
        <li><strong>Mirror professionalism:</strong> Match interviewer's tone and energy</li>
      </ul>

      <h2 className="text-3xl font-heading font-bold mt-12 mb-6">Practice Makes Perfect</h2>
      <p>
        Reading these phrases is just the first step. True fluency comes from practice. 
        Record yourself answering common interview questions using these phrases. Listen 
        back and refine your delivery until it sounds natural and confident.
      </p>

      <div className="bg-light border-l-4 border-primary p-6 my-8">
        <h3 className="font-heading font-bold text-xl mb-2">Build Interview Confidence</h3>
        <p className="text-gray-700">
          Our ESL and interview coaching sessions focus on helping you communicate 
          professionally and confidently. We'll practice these phrases in realistic 
          interview scenarios so you feel prepared for the real thing.
        </p>
      </div>
    </>
  );

  return (
    <BlogPost
      title="10 English Phrases That Impress in Any Interview"
      category="ESL / English"
      readTime="4 min"
      date="Sep 28, 2023"
      author="Admin"
      content={content}
      imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop"
    />
  );
};
