import React from 'react';
import { BlogPost } from '../../components/BlogPost';

export const StarMethod: React.FC = () => {
  const content = (
    <>
      <p className="lead text-xl text-gray-600 mb-8">
        The STAR method is the secret weapon of successful interviewees. Master this technique 
        and you'll never struggle with behavioral questions again.
      </p>

      <h2 className="text-3xl font-heading font-bold mt-12 mb-6">What is the STAR Method?</h2>
      <p>
        STAR stands for <strong>Situation, Task, Action, Result</strong>. It's a structured way 
        to answer behavioral interview questions that helps you tell compelling, complete stories 
        about your experiences.
      </p>
      <p>
        Recruiters use behavioral questions to predict future performance based on past behavior. 
        The STAR method ensures your answers are focused, relevant, and impressive.
      </p>

      <h2 className="text-3xl font-heading font-bold mt-12 mb-6">Breaking Down STAR</h2>
      
      <h3 className="text-2xl font-heading font-semibold mt-8 mb-4">S - Situation</h3>
      <p>
        Set the context. Describe the situation you were in or the challenge you faced. 
        Be specific but concise—this shouldn't take more than 20% of your answer.
      </p>
      <p><strong>Example:</strong></p>
      <blockquote className="border-l-4 border-primary pl-4 italic text-gray-700 my-4">
        "During my time as a customer service representative at a busy retail store, 
        we received a complaint from an angry customer who had received a damaged product."
      </blockquote>

      <h3 className="text-2xl font-heading font-semibold mt-8 mb-4">T - Task</h3>
      <p>
        Explain what your responsibility was in that situation. What goal were you working toward? 
        What was expected of you?
      </p>
      <p><strong>Example:</strong></p>
      <blockquote className="border-l-4 border-primary pl-4 italic text-gray-700 my-4">
        "As the shift supervisor, it was my responsibility to resolve the complaint, 
        ensure the customer left satisfied, and prevent similar issues in the future."
      </blockquote>

      <h3 className="text-2xl font-heading font-semibold mt-8 mb-4">A - Action</h3>
      <p>
        This is the most important part—describe the specific actions YOU took. Use "I" statements 
        and focus on your individual contribution. Be detailed here.
      </p>
      <p><strong>Example:</strong></p>
      <blockquote className="border-l-4 border-primary pl-4 italic text-gray-700 my-4">
        "I first listened to the customer's concerns without interrupting, showing empathy 
        for their frustration. I apologized sincerely and immediately offered a full refund 
        plus a replacement product. I also gave them a discount voucher for their next purchase. 
        Then, I contacted our warehouse team to understand how the damage occurred and implemented 
        a new quality check process."
      </blockquote>

      <h3 className="text-2xl font-heading font-semibold mt-8 mb-4">R - Result</h3>
      <p>
        Share the outcomes of your actions. Quantify results when possible. What did you accomplish? 
        What did you learn?
      </p>
      <p><strong>Example:</strong></p>
      <blockquote className="border-l-4 border-primary pl-4 italic text-gray-700 my-4">
        "The customer left happy and even wrote a positive review mentioning my service. 
        Our new quality check process reduced damaged products by 40% over the next three months. 
        This experience taught me the importance of turning complaints into opportunities."
      </blockquote>

      <h2 className="text-3xl font-heading font-bold mt-12 mb-6">Common STAR Mistakes to Avoid</h2>
      <ul>
        <li><strong>Being too vague:</strong> Use specific examples, not hypotheticals</li>
        <li><strong>Focusing on "we" instead of "I":</strong> Highlight YOUR actions</li>
        <li><strong>Skipping the result:</strong> Always close with the outcome</li>
        <li><strong>Rambling:</strong> Keep each section concise and relevant</li>
        <li><strong>Using the same example repeatedly:</strong> Prepare 5-7 different STAR stories</li>
      </ul>

      <h2 className="text-3xl font-heading font-bold mt-12 mb-6">Practice Questions Using STAR</h2>
      <p>Practice answering these common behavioral questions using the STAR method:</p>
      <ol>
        <li>Tell me about a time you dealt with a difficult customer</li>
        <li>Describe a situation where you had to work under pressure</li>
        <li>Give me an example of when you demonstrated leadership</li>
        <li>Tell me about a time you made a mistake and how you handled it</li>
        <li>Describe a situation where you went above and beyond for someone</li>
      </ol>

      <h2 className="text-3xl font-heading font-bold mt-12 mb-6">Final Tips</h2>
      <ul>
        <li>Prepare 5-7 STAR stories that showcase different skills</li>
        <li>Practice out loud—it makes a huge difference</li>
        <li>Use recent examples (within last 2-3 years)</li>
        <li>Keep answers between 1-2 minutes</li>
        <li>Be honest—authenticity shows</li>
      </ul>

      <div className="bg-light border-l-4 border-primary p-6 my-8">
        <h3 className="font-heading font-bold text-xl mb-2">Master Your Interview Skills</h3>
        <p className="text-gray-700">
          In our interview coaching sessions, we'll practice the STAR method with real aviation 
          interview questions. You'll receive personalized feedback and learn how to structure 
          compelling answers that impress recruiters.
        </p>
      </div>
    </>
  );

  return (
    <BlogPost
      title="The STAR Method Explained: Answer Any Interview Question"
      category="Interview Prep"
      readTime="6 min"
      date="Oct 05, 2023"
      author="Admin"
      content={content}
      imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop"
    />
  );
};
