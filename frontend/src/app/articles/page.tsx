"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Heart, Zap, Globe, Brain, Lightbulb, Mail, ArrowRight,
  Calculator, Landmark, Palette, Mic, Feather, Trophy, Dumbbell, Users
} from 'lucide-react';
import { api } from '@/lib/api';
import { AnimatedCard, ScrollReveal, AnimatedText, AnimatedButton, FloatingElements } from '@/components/animated';
import { motion, AnimatePresence } from 'framer-motion';

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
      { id: 'english-literature', title: 'English Literature', description: 'Stories, poems, and literary analysis.', icon: Globe, color: '#4A7C59' },
      { id: 'hindi-literature', title: 'Hindi Literature', description: 'कहानियाँ, कविताएँ और साहित्यिक रचनाएँ।', icon: BookOpen, color: '#9CAF88' },
      { id: 'mathematics', title: 'Mathematics', description: 'Concepts, puzzles, and the beauty of numbers.', icon: Calculator, color: '#8B7355' },
      { id: 'science-technology', title: 'Science & Technology', description: 'Latest in discovery, tech, and computer science.', icon: Zap, color: '#7BA05B' },
      { id: 'history-civics', title: 'History & Civics', description: 'Exploring history, geography, and civics.', icon: Landmark, color: '#F4A460' },
      { id: 'philosophy', title: 'Philosophy', description: "Deep thoughts on life's big questions.", icon: Brain, color: '#F8BBD9' },
    ]
  },
  {
    groupTitle: 'Creative Corner',
    categories: [
      { id: 'visual-arts', title: 'Visual Arts', description: 'Showcasing student paintings, drawings, and art.', icon: Palette, color: '#F8BBD9' },
      { id: 'performing-arts', title: 'Performing Arts', description: 'Drama, music concerts, and dance performances.', icon: Mic, color: '#F4A460' },
      { id: 'creative-writing', title: 'Creative Writing', description: 'A home for original student poetry and stories.', icon: Feather, color: '#9CAF88' },
    ]
  },
  {
    groupTitle: 'Campus Life',
    categories: [
      { id: 'sports-athletics', title: 'Sports & Athletics', description: 'Match reports, team updates, and athlete spotlights.', icon: Dumbbell, color: '#4A7C59' },
      { id: 'clubs-activities', title: 'Clubs & Activities', description: 'News and events from school clubs and societies.', icon: Users, color: '#7BA05B' },
      { id: 'student-achievements', title: 'Student Achievements', description: 'Celebrating academic and extracurricular success.', icon: Trophy, color: '#8B7355' },
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
        const categoryCounts = await api.articles.getCategoryCounts();
        
        const countsMap = new Map((categoryCounts as any[]).map((item: any) => [item.category, item.article_count]));
        
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
        const featuredArticles = await api.articles.getFeatured();
        setFeaturedArticles(featuredArticles);
      } catch (error) {
        console.error('Error fetching featured articles:', error);
      }
    };

    fetchAndMergeCategories();
    fetchFeaturedArticles();
  }, []);

  return (
    <div className="min-h-screen bg-nature-primary dark:bg-nature-primary pt-20">
      <FloatingElements theme="education" density="medium" />
      
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fadeUp">
            <AnimatedText
              text="Articles & Stories"
              className="text-5xl md:text-7xl font-bold mb-6"
              animation="morphing"
              gradient={true}
            />
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <p className="text-xl md:text-2xl text-nature-secondary dark:text-nature-secondary mb-12 max-w-3xl mx-auto">
              Explore thought-provoking articles written by our community. From literature to technology, 
              discover insights that inspire and educate.
            </p>
          </ScrollReveal>
          
          {/* CTA for Article Submission */}
          <ScrollReveal animation="fadeUp" delay={0.4}>
            <AnimatedCard background="gradient" className="max-w-4xl mx-auto p-8 md:p-12 mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Share Your Knowledge!
                </h2>
                <p className="text-xl text-white/90 mb-6">
                  Have an interesting article to share? We welcome contributions from students, teachers, and community members.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <AnimatedButton
                    variant="ghost"
                    size="lg"
                    className="bg-white text-nature-primary hover:bg-white/90"
                    onClick={() => window.location.href = "mailto:devansh.prakhar@gmail.com?subject=Article Submission for School Website"}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Submit Your Article
                  </AnimatedButton>
                  <p className="text-white/80 text-sm">
                    Email us at: devansh.prakhar@gmail.com
                  </p>
                </div>
              </motion.div>
            </AnimatedCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fadeUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Explore Categories
            </h2>
            <p className="text-xl text-nature-secondary dark:text-nature-secondary max-w-3xl mx-auto">
              Dive into various topics and discover articles that match your interests.
            </p>
          </ScrollReveal>
          
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-16"
              >
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
              </motion.div>
            ) : categoryGroups.length > 0 ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-16"
              >
                {categoryGroups.map((group, groupIndex) => (
                  <div key={group.groupTitle}>
                    <ScrollReveal animation="fadeUp" delay={groupIndex * 0.1}>
                      <motion.div
                        className="flex items-center gap-4 mb-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: groupIndex * 0.1 }}
                      >
                        <div className="w-1 h-12 bg-gradient-primary rounded-full"></div>
                        <h3 className="text-3xl font-bold text-nature-primary dark:text-nature-primary">
                          {group.groupTitle}
                        </h3>
                      </motion.div>
                    </ScrollReveal>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {group.categories.map((cat, catIndex) => {
                        const Icon = cat.icon;
                        return (
                          <ScrollReveal 
                            key={cat.id} 
                            animation="fadeUp" 
                            delay={groupIndex * 0.1 + catIndex * 0.1}
                          >
                            <Link href={`/articles/${cat.id}`}>
                              <AnimatedCard
                                background="glass"
                                hoverEffect="lift"
                                className="group h-full"
                              >
                                <div className="p-8 h-full flex flex-col">
                                  <motion.div
                                    className={`w-16 h-16 bg-gradient-to-r ${cat.color} rounded-2xl flex items-center justify-center mb-6 flex-shrink-0`}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <Icon className="w-8 h-8 text-white" />
                                  </motion.div>
                                  
                                  <div className="flex-grow">
                                    <h4 className="text-2xl font-bold text-nature-primary dark:text-nature-primary mb-3 group-hover:text-gradient transition-colors">
                                      {cat.title}
                                    </h4>
                                    
                                    <p className="text-nature-secondary dark:text-nature-secondary mb-4 leading-relaxed">
                                      {cat.description}
                                    </p>
                                  </div>
                                  
                                  <div className="flex items-center justify-between mt-auto pt-4">
                                    <span className="text-nature-secondary/70 dark:text-nature-secondary/70 text-sm font-medium">
                                      {cat.count} {cat.count === 1 ? 'article' : 'articles'}
                                    </span>
                                    <motion.div
                                      className="flex items-center gap-2 text-nature-secondary/70 dark:text-nature-secondary/70 group-hover:text-nature-accent transition-colors"
                                      whileHover={{ x: 5 }}
                                    >
                                      <span className="text-sm">Explore</span>
                                      <ArrowRight className="w-4 h-4" />
                                    </motion.div>
                                  </div>
                                </div>
                              </AnimatedCard>
                            </Link>
                          </ScrollReveal>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <ScrollReveal animation="fadeUp">
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-nature-secondary/50 dark:text-nature-secondary/50 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-nature-secondary dark:text-nature-secondary mb-2">
                    No Categories Found
                  </h3>
                  <p className="text-nature-secondary/70 dark:text-nature-secondary/70">
                    Published articles will appear here once they are available.
                  </p>
                </div>
              </ScrollReveal>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="section-padding bg-nature-card/30 dark:bg-nature-card/30">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fadeUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Featured Articles
            </h2>
            <p className="text-xl text-nature-secondary dark:text-nature-secondary max-w-3xl mx-auto">
              Discover the most popular and engaging articles from our community.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.length > 0 ? (
              featuredArticles.map((article, index) => (
                <ScrollReveal key={article.id} animation="fadeUp" delay={index * 0.1}>
                  <Link href={`/articles/${article.category.toLowerCase().replace(/\s+/g, '-')}/${article.slug}`}>
                    <AnimatedCard
                      background="glass"
                      hoverEffect="lift"
                      className="group h-full"
                    >
                      <div className="p-6 h-full flex flex-col">
                        <div className="flex-grow">
                          <motion.span
                            className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block"
                            whileHover={{ scale: 1.05 }}
                          >
                            {article.category}
                          </motion.span>
                          
                          <h3 className="text-xl font-bold text-brand-neutral-100 mb-3 line-clamp-2 group-hover:text-gradient transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-brand-neutral-400 mb-4 line-clamp-3">
                            {getExcerpt(article.content)}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-neutral-700/50">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {article.author_name.charAt(0)}
                            </div>
                            <span className="text-brand-neutral-400 text-sm">{article.author_name}</span>
                          </div>
                          <span className="text-brand-neutral-500 text-sm">
                            {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </AnimatedCard>
                  </Link>
                </ScrollReveal>
              ))
            ) : (
              [...Array(3)].map((_, i) => (
                <ScrollReveal key={i} animation="fadeUp" delay={i * 0.1}>
                  <div className="bg-brand-neutral-800/50 rounded-3xl p-6 border border-brand-neutral-700 animate-pulse">
                    <div className="h-6 bg-brand-neutral-700 rounded w-1/3 mb-4"></div>
                    <div className="h-8 bg-brand-neutral-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-brand-neutral-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-brand-neutral-700 rounded w-5/6 mb-4"></div>
                    <div className="h-4 bg-brand-neutral-700 rounded w-1/4 mt-4"></div>
                  </div>
                </ScrollReveal>
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