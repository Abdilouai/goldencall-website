import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

interface BlogPostProps {
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  content: React.ReactNode;
  imageUrl?: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({
  title,
  category,
  readTime,
  date,
  author,
  content,
  imageUrl
}) => {
  return (
    <article className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-white hover:text-gray-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>
          
          <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            {category}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-100">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span>{author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{readTime} read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {imageUrl && (
        <div className="max-w-5xl mx-auto px-4 -mt-12">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-96 object-cover rounded-lg shadow-2xl"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          {content}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-heading font-bold mb-4">
            Ready to Take Your Golden Call?
          </h3>
          <p className="text-gray-100 mb-6">
            Let's work together to prepare you for success. Book your personalized coaching session today.
          </p>
          <Link 
            to="/book"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Book Your Session Now
          </Link>
        </div>
      </div>
    </article>
  );
};
