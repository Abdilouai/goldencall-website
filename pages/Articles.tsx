import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BookOpen, User, Calendar, ArrowRight } from 'lucide-react';

export const Articles: React.FC = () => {
    const { t } = useTranslation();

    const resources = [
        {
            id: 1,
            title: "5 Mistakes That Cost Candidates Their Cabin Crew Offers",
            category: "Cabin Crew",
            readTime: "5 min",
            excerpt: "Learn what airlines are really looking for and the common pitfalls to avoid during the assessment day.",
            date: "Oct 05, 2023",
            author: "Admin"
        },
        {
            id: 2,
            title: "The STAR Method Explained: Answer Any Interview Question",
            category: "Interview Prep",
            readTime: "6 min",
            excerpt: "Master the technique used by top candidates to structure their answers and impress recruiters.",
            date: "Oct 05, 2023",
            author: "Admin"
        },
        {
            id: 3,
            title: "10 English Phrases That Impress in Any Interview",
            category: "Aviation English",
            readTime: "4 min",
            excerpt: "Elevate your interview answers with these professional phrases that show confidence and fluency.",
            date: "Sep 28, 2023",
            author: "Admin"
        },
        {
            id: 4,
            title: "Business English Meetings: Key Vocabulary",
            category: "Business English",
            readTime: "5 min",
            excerpt: "Crucial words and phrases for managing and participating actively in business meetings.",
            date: "Nov 12, 2023",
            author: "Admin"
        },
        {
            id: 5,
            title: "Hospitality English: How to create a 5-star experience",
            category: "Hospitality",
            readTime: "7 min",
            excerpt: "Transform your customer service interactions with polished hospitality English terminology.",
            date: "Jan 03, 2024",
            author: "Admin"
        },
        {
            id: 6,
            title: "Information Technology (IT): A Guide to Tech English",
            category: "IT / Tech",
            readTime: "8 min",
            excerpt: "From software engineering terms to technical support communication strategies.",
            date: "Feb 15, 2024",
            author: "Admin"
        }
    ];

    return (
        <div className="min-h-screen bg-dark transition-colors duration-300">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                        {t('articles.title')}
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                        {t('articles.subtitle')}
                    </p>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-20 bg-dark">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {resources.map((post) => (
                            <div
                                key={post.id}
                                className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-2xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
                            >
                                {/* Visual Header Placeholder instead of Image */}
                                <div className="relative h-32 bg-gradient-to-br from-border/50 to-card flex items-center justify-center border-b border-border/50">
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {post.category}
                                        </span>
                                    </div>
                                    <BookOpen className="w-12 h-12 text-primary/30 group-hover:text-primary transition-colors" />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-2xl font-heading font-bold text-text mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-text-muted mb-6 flex-grow line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex flex-col gap-4 mt-auto">
                                        <div className="flex items-center justify-between text-xs text-text-muted font-medium border-t border-border pt-4">
                                            <div className="flex items-center gap-1.5 focus:text-text">
                                                <User className="w-3.5 h-3.5" />
                                                <span>{post.author}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{post.date}</span>
                                            </div>
                                        </div>

                                        <button
                                            className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white py-3 rounded-lg font-bold transition-all duration-300 mt-2"
                                            onClick={() => alert('Article viewing coming soon!')}
                                        >
                                            {t('articles.readMore')} <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-card border-t border-border py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-heading font-bold text-text mb-6">
                        Ready to Take Your Golden Call?
                    </h2>
                    <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
                        Reading tips is great—but personalized coaching gets real results.
                        Book your session today and let's prepare you for success.
                    </p>
                    <Link
                        to="/formations"
                        className="inline-block bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105"
                    >
                        {t('nav.start')}
                    </Link>
                </div>
            </section>
        </div>
    );
};
