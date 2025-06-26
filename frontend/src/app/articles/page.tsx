"use client";
import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Heart, Zap, Globe, Brain, Lightbulb, Mail, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'hindi-literature',
    title: 'Hindi Literature',
    description: 'कहानियाँ, कविताएँ और साहित्यिक रचनाएँ',
    icon: BookOpen,
    color: 'from-orange-500 to-red-500',
    count: 12
  },
  {
    id: 'english-literature',
    title: 'English Literature',
    description: 'Stories, poems and literary works',
    icon: Globe,
    color: 'from-blue-500 to-purple-500',
    count: 8
  },
  {
    id: 'technology',
    title: 'Technology',
    description: 'Latest tech trends and innovations',
    icon: Zap,
    color: 'from-green-500 to-blue-500',
    count: 15
  },
  {
    id: 'science',
    title: 'Science',
    description: 'Scientific discoveries and research',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-500',
    count: 10
  },
  {
    id: 'psychology',
    title: 'Psychology',
    description: 'Mental health and human behavior',
    icon: Brain,
    color: 'from-pink-500 to-purple-500',
    count: 6
  },
  {
    id: 'philosophy',
    title: 'Philosophy',
    description: 'Deep thoughts and life wisdom',
    icon: Heart,
    color: 'from-red-500 to-pink-500',
    count: 4
  }
];

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-brand-neutral-900 pt-20">
      {/* Hero Section */}
      <section className="py-20 relative z-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-brand-neutral-50">
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Articles & Stories
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-brand-neutral-300 mb-12 max-w-3xl mx-auto">
            Explore thought-provoking articles written by our community. From literature to technology, 
            discover insights that inspire and educate.
          </p>
          
          {/* CTA for Article Submission */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl p-8 md:p-12 mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Share Your Knowledge!
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Have an interesting article to share? We welcome contributions from students, teachers, and community members.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:devansh.prakhar@gmail.com?subject=Article Submission for School Website"
                className="bg-white text-brand-primary px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Submit Your Article
              </a>
              <p className="text-white/80 text-sm">
                Email us at: devansh.prakhar@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 relative z-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-brand-neutral-50">
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Explore Categories
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.id}
                href={`/articles/${category.id}`}
                className="group"
              >
                <div className="bg-brand-neutral-800/50 backdrop-blur-md rounded-3xl p-8 border border-brand-neutral-700 hover:border-brand-primary transition-all duration-300 hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-brand-neutral-100 mb-3 group-hover:text-brand-primary transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="text-brand-neutral-400 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-brand-neutral-500 text-sm">
                      {category.count} articles
                    </span>
                    <ArrowRight className="w-5 h-5 text-brand-neutral-500 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20 relative z-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-brand-neutral-50">
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Featured Articles
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder Featured Articles */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-brand-neutral-800/50 backdrop-blur-md rounded-3xl p-6 border border-brand-neutral-700">
                <div className="w-full h-48 bg-brand-neutral-700 rounded-2xl mb-6 flex items-center justify-center text-brand-neutral-500">
                  Article Image {i}
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-brand-primary/20 text-brand-primary px-3 py-1 rounded-full text-sm font-medium">
                    {categories[i % categories.length].title}
                  </span>
                  <span className="text-brand-neutral-500 text-sm">
                    5 min read
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-brand-neutral-100 mb-3">
                  Coming Soon: Amazing Article Title {i}
                </h3>
                
                <p className="text-brand-neutral-400 mb-4 line-clamp-3">
                  This is a placeholder for an amazing article that will be published soon. 
                  Stay tuned for insightful content from our community!
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-neutral-700 rounded-full flex items-center justify-center text-brand-neutral-500 text-sm">
                      A
                    </div>
                    <span className="text-brand-neutral-400 text-sm">Author Name</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-brand-neutral-500 hover:text-brand-primary transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">24</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 