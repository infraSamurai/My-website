"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Heart, Zap, Globe, Brain, Lightbulb, Mail, ArrowRight,
  Calculator, Landmark, Palette, Mic, Feather, Trophy, Dumbbell, Users
} from 'lucide-react';

interface CategoryStyle {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

interface CategoryGroup {
  groupTitle: string;
  categories: CategoryStyle[];
}

const mainlineCategoryGroups: CategoryGroup[] = [
  {
    groupTitle: 'Academic Subjects',
    categories: [
      { id: 'english-literature', title: 'English Literature', description: 'Stories, poems, and literary analysis.', icon: Globe, color: 'from-blue-500 to-purple-500' },
      { id: 'hindi-literature', title: 'Hindi Literature', description: 'कहानियाँ, कविताएँ और साहित्यिक रचनाएँ।', icon: BookOpen, color: 'from-orange-500 to-red-500' },
      { id: 'mathematics', title: 'Mathematics', description: 'Concepts, puzzles, and the beauty of numbers.', icon: Calculator, color: 'from-cyan-500 to-blue-500' },
      { id: 'science-technology', title: 'Science & Technology', description: 'Latest in discovery, tech, and computer science.', icon: Zap, color: 'from-green-500 to-teal-500' },
      { id: 'history-civics', title: 'History & Civics', description: 'Exploring history, geography, and civics.', icon: Landmark, color: 'from-amber-500 to-orange-500' },
      { id: 'philosophy', title: 'Philosophy', description: "Deep thoughts on life's big questions.", icon: Brain, color: 'from-indigo-500 to-purple-500' },
    ]
  },
  {
    groupTitle: 'Creative Corner',
    categories: [
      { id: 'visual-arts', title: 'Visual Arts', description: 'Showcasing student paintings, drawings, and art.', icon: Palette, color: 'from-pink-500 to-rose-500' },
      { id: 'performing-arts', title: 'Performing Arts', description: 'Drama, music concerts, and dance performances.', icon: Mic, color: 'from-red-500 to-pink-500' },
      { id: 'creative-writing', title: 'Creative Writing', description: 'A home for original student poetry and stories.', icon: Feather, color: 'from-teal-500 to-cyan-500' },
    ]
  },
  {
    groupTitle: 'Campus Life',
    categories: [
      { id: 'sports-athletics', title: 'Sports & Athletics', description: 'Match reports, team updates, and athlete spotlights.', icon: Dumbbell, color: 'from-lime-500 to-green-500' },
      { id: 'clubs-activities', title: 'Clubs & Activities', description: 'News and events from school clubs and societies.', icon: Users, color: 'from-fuchsia-500 to-purple-500' },
      { id: 'student-achievements', title: 'Student Achievements', description: 'Celebrating academic and extracurricular success.', icon: Trophy, color: 'from-yellow-500 to-amber-500' },
    ]
  }
];

interface CategoryCount {
  category: string;
  article_count: number;
}

interface DisplayCategory extends CategoryStyle {
  count: number;
}

interface DisplayCategoryGroup {
  groupTitle: string;
  categories: DisplayCategory[];
}

interface FeaturedArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  author_name: string;
  published_at: string;
  content: string;
}

export default function ArticlesPage() {
  const [categoryGroups, setCategoryGroups] = useState<DisplayCategoryGroup[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<FeaturedArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndMergeCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories/counts`);
        const countsData: CategoryCount[] = await response.json();
        
        const countsMap = new Map(countsData.map(item => [item.category, item.article_count]));
        
        const mergedGroups = mainlineCategoryGroups.map(group => ({
          ...group,
          categories: group.categories.map(cat => ({
            ...cat,
            count: countsMap.get(cat.title) || 0
          }))
        }));

        setCategoryGroups(mergedGroups);
      } catch (error) {
        console.error('Error fetching categories:', error);
        const errorGroups = mainlineCategoryGroups.map(group => ({
          ...group,
          categories: group.categories.map(cat => ({ ...cat, count: 0 }))
        }));
        setCategoryGroups(errorGroups);
      } finally {
        setLoading(false);
      }
    };

    const fetchFeaturedArticles = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/articles/featured`);
        const data = await response.json();
        setFeaturedArticles(data);
      } catch (error) {
        console.error('Error fetching featured articles:', error);
      }
    };

    fetchAndMergeCategories();
    fetchFeaturedArticles();
  }, []);

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
          
          {loading ? (
             <div className="space-y-16">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="h-9 bg-brand-neutral-700 rounded w-1/3 mb-8 animate-pulse"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, j) => (
                       <div key={j} className="bg-brand-neutral-800/50 rounded-3xl p-8 border border-brand-neutral-700 animate-pulse">
                        <div className="w-16 h-16 bg-brand-neutral-700 rounded-2xl mb-6"></div>
                        <div className="h-8 bg-brand-neutral-700 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-brand-neutral-700 rounded w-full mb-2"></div>
                        <div className="h-4 bg-brand-neutral-700 rounded w-5/6 mb-4"></div>
                        <div className="h-4 bg-brand-neutral-700 rounded w-1/4 mt-4"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : categoryGroups.length > 0 ? (
            <div className="space-y-16">
              {categoryGroups.map((group) => (
                <div key={group.groupTitle}>
                  <h3 className="text-3xl font-bold text-brand-neutral-100 mb-8 border-l-4 border-brand-primary pl-4">
                    {group.groupTitle}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {group.categories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link 
                          key={cat.id}
                          href={`/articles/${cat.id}`}
                          className="group"
                        >
                          <div className="bg-brand-neutral-800/50 backdrop-blur-md rounded-3xl p-8 border border-brand-neutral-700 hover:border-brand-primary transition-all duration-300 hover:scale-105 h-full flex flex-col">
                            <div className={`w-16 h-16 bg-gradient-to-r ${cat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform flex-shrink-0`}>
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            
                            <div className="flex-grow">
                              <h3 className="text-2xl font-bold text-brand-neutral-100 mb-3 group-hover:text-brand-primary transition-colors">
                                {cat.title}
                              </h3>
                              
                              <p className="text-brand-neutral-400 mb-4 leading-relaxed">
                                {cat.description}
                              </p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-auto pt-4">
                              <span className="text-brand-neutral-500 text-sm">
                                {cat.count} {cat.count === 1 ? 'article' : 'articles'}
                              </span>
                              <ArrowRight className="w-5 h-5 text-brand-neutral-500 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center py-12">
               <h3 className="text-xl font-semibold text-brand-neutral-300 mb-2">
                 No Categories Found
               </h3>
               <p className="text-brand-neutral-400">
                 Published articles will appear here once they are available.
               </p>
             </div>
          )}
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
            {featuredArticles.length > 0 ? (
              featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.category.toLowerCase().replace(/\s+/g, '-')}/${article.slug}`}
                  className="bg-brand-neutral-800/50 backdrop-blur-md rounded-3xl p-6 border border-brand-neutral-700 hover:border-brand-primary transition-all duration-300 flex flex-col"
                >
                  <div className="flex-grow">
                    <span className="bg-brand-primary/20 text-brand-primary px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-bold text-brand-neutral-100 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-brand-neutral-400 mb-4 line-clamp-3">
                      {getExcerpt(article.content)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-neutral-700/50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-brand-neutral-700 rounded-full flex items-center justify-center text-brand-neutral-500 text-sm">
                        {article.author_name.charAt(0)}
                      </div>
                      <span className="text-brand-neutral-400 text-sm">{article.author_name}</span>
                    </div>
                    <span className="text-brand-neutral-500 text-sm">
                      {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              // Optional: Add a loading or empty state for featured articles
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-brand-neutral-800/50 rounded-3xl p-6 border border-brand-neutral-700 animate-pulse">
                  <div className="h-6 bg-brand-neutral-700 rounded w-1/3 mb-4"></div>
                  <div className="h-8 bg-brand-neutral-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-brand-neutral-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-brand-neutral-700 rounded w-5/6 mb-4"></div>
                  <div className="h-4 bg-brand-neutral-700 rounded w-1/4 mt-4"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// Utility to strip HTML tags and get a summary
function getExcerpt(html: string, wordLimit = 20) {
  if (!html) return '';
  const text = html.replace(/<[^>]+>/g, ' ');
  const words = text.replace(/\s+/g, ' ').trim().split(' ');
  if (words.length <= wordLimit) return words.join(' ');
  return words.slice(0, wordLimit).join(' ') + '...';
} 