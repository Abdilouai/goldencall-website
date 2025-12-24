import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export const Blog: React.FC = () => {
  useSEO(
    "Interview Tips & Career Resources | Golden Call Blog",
    "Free interview tips, cabin crew advice, and IELTS resources from an experienced coach. Learn how to ace your next assessment."
  );

  const posts = [
    {
      id: 1,
      title: "5 Mistakes That Cost Candidates Their Cabin Crew Offers",
      category: "Cabin Crew",
      readTime: "5 min",
      date: "Oct 12, 2023",
      excerpt: "Learn what airlines are really looking for and the common pitfalls to avoid during the assessment day.",
      image: "https://picsum.photos/800/600?random=1"
    },
    {
      id: 2,
      title: "The STAR Method Explained: Answer Any Interview Question",
      category: "Interview Prep",
      readTime: "6 min",
      date: "Oct 05, 2023",
      excerpt: "Master the technique used by top candidates to structure their answers and impress recruiters.",
      image: "https://picsum.photos/800/600?random=2"
    },
    {
      id: 3,
      title: "10 English Phrases That Impress in Any Interview",
      category: "ESL / English",
      readTime: "4 min",
      date: "Sep 28, 2023",
      excerpt: "Elevate your interview answers with these professional phrases that show confidence and fluency.",
      image: "https://picsum.photos/800/600?random=3"
    }
  ];

  return (
    <div className="py-20 bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-heading font-bold text-4xl text-dark mb-4">Latest Insights</h1>
          <p className="text-gray-600">Expert advice on aviation careers, interview techniques, and English mastery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="bg-blue-50 text-primary px-2 py-1 rounded font-medium">{post.category}</span>
                  <div className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</div>
                </div>
                <h2 className="font-heading font-bold text-xl text-dark mb-3 hover:text-primary transition-colors cursor-pointer">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User size={12} />
                    <span>Admin</span>
                  </div>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar size={12} /> {post.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};