import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, User } from 'lucide-react';

export const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "5 Mistakes That Cost Candidates Their Cabin Crew Offers",
      category: "Cabin Crew",
      readTime: "5 min",
      excerpt: "Learn what airlines are really looking for and the common pitfalls to avoid during the assessment day.",
      date: "Oct 05, 2023",
      author: "Admin",
      imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
      slug: "/blog/cabin-crew-mistakes"
    },
    {
      id: 2,
      title: "The STAR Method Explained: Answer Any Interview Question",
      category: "Interview Prep",
      readTime: "6 min",
      excerpt: "Master the technique used by top candidates to structure their answers and impress recruiters.",
      date: "Oct 05, 2023",
      author: "Admin",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      slug: "/blog/star-method"
    },
    {
      id: 3,
      title: "10 English Phrases That Impress in Any Interview",
      category: "ESL / English",
      readTime: "4 min",
      excerpt: "Elevate your interview answers with these professional phrases that show confidence and fluency.",
      date: "Sep 28, 2023",
      author: "Admin",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
      slug: "/blog/english-phrases"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Latest Insights
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Expert advice on aviation careers, interview techniques, and English mastery.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={post.slug}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <div className="mt-4 text-primary font-semibold group-hover:underline">
                    Read More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Turn Knowledge Into Action?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Reading tips is great—but personalized coaching gets real results. 
            Book your session today and let's prepare you for success.
          </p>
          <Link
            to="/book"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
          >
            Book Your Coaching Session
          </Link>
        </div>
      </section>
    </div>
  );
};
