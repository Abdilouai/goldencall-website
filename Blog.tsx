import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';

const Blog: React.FC = () => {
  const posts = [
    { title: "Assessment Day: 5 Common Mistakes", category: "Tips", time: "5 min read" },
    { title: "Mastering the STAR Interview Method", category: "Interview", time: "7 min read" },
    { title: "IELTS Speaking: Fluency vs Accuracy", category: "IELTS", time: "4 min read" }
  ];
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Resources & Expert Tips</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="border p-8 rounded-2xl hover:shadow-lg transition-all group cursor-pointer">
              <div className="text-brand-blue font-bold text-sm mb-4">{post.category}</div>
              <h3 className="text-xl font-bold mb-6 group-hover:text-brand-blue transition-colors">{post.title}</h3>
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <span className="flex items-center gap-1"><Clock size={16} /> {post.time}</span>
                <ChevronRight size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;