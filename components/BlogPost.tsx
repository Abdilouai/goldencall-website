import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BlogPostProps {
  title: string;
  category: string;
  readTime: string;
  author: string;
  content: React.ReactNode;
  imageUrl?: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({
  title,
  category,
  readTime,
  author,
  content,
  imageUrl
}) => {
  const { t } = useTranslation();

  return (
    <article className="min-h-screen bg-dark transition-colors duration-300 pt-12 pb-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <Link
          to="/articles"
          className="inline-flex items-center text-text-muted hover:text-primary mb-8 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('articles.back')}
        </Link>
        <br />

        <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
          {category}
        </span>

        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight text-white">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-text-muted border-b border-border pb-8">
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            <span>{author}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            <span>{readTime} read</span>
          </div>
        </div>
      </div>

      {/* Featured Image - only show if there's an image */}
      {imageUrl && (
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl border border-border/50"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4">
        {/* We use prose classes adapted for dark mode using existing Tailwind variables where possible, or manual overrides */}
        <div className="prose prose-lg max-w-none text-text prose-headings:text-text prose-a:text-primary hover:prose-a:text-primary-dark prose-strong:text-text prose-blockquote:border-l-primary prose-blockquote:text-text-muted prose-li:marker:text-primary">
          {content}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-card border border-border rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <h3 className="text-2xl font-heading font-bold mb-4 text-text">
            Ready to Take Your Golden Call?
          </h3>
          <p className="text-text-muted mb-8 max-w-lg mx-auto text-lg">
            Let's work together to prepare you for success. Book your personalized coaching session today.
          </p>
          <Link
            to="/formations"
            className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg shadow-primary/20"
          >
            {t('nav.start')}
          </Link>
        </div>
      </div>
    </article>
  );
};
