"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, UploadCloud, FileText, Calendar, User, Eye } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';
import { api } from '@/lib/api';

const categoryData = {
  'english-literature': { title: 'English Literature', description: 'Stories, poems, and literary analysis.', color: 'from-blue-500 to-purple-500' },
  'hindi-literature': { title: 'Hindi Literature', description: 'कहानियाँ, कविताएँ और साहित्यिक रचनाएँ।', color: 'from-orange-500 to-red-500' },
  'mathematics': { title: 'Mathematics', description: 'Concepts, puzzles, and the beauty of numbers.', color: 'from-cyan-500 to-blue-500' },
  'science-technology': { title: 'Science & Technology', description: 'Latest in discovery, tech, and computer science.', color: 'from-green-500 to-teal-500' },
  'history-civics': { title: 'History & Civics', description: 'Exploring history, geography, and civics.', color: 'from-amber-500 to-orange-500' },
  'philosophy': { title: 'Philosophy', description: "Deep thoughts on life's big questions.", color: 'from-indigo-500 to-purple-500' },
  'visual-arts': { title: 'Visual Arts', description: 'Showcasing student paintings, drawings, and art.', color: 'from-pink-500 to-rose-500' },
  'performing-arts': { title: 'Performing Arts', description: 'Drama, music concerts, and dance performances.', color: 'from-red-500 to-pink-500' },
  'creative-writing': { title: 'Creative Writing', description: 'A home for original student poetry and stories.', color: 'from-teal-500 to-cyan-500' },
  'sports-athletics': { title: 'Sports & Athletics', description: 'Match reports, team updates, and athlete spotlights.', color: 'from-lime-500 to-green-500' },
  'clubs-activities': { title: 'Clubs & Activities', description: 'News and events from school clubs and societies.', color: 'from-fuchsia-500 to-purple-500' },
  'student-achievements': { title: 'Student Achievements', description: 'Celebrating academic and extracurricular success.', color: 'from-yellow-500 to-amber-500' },
};

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  author_name: string;
  category: string;
  file_name: string;
  view_count: number;
  published_at: string;
}

// Utility to strip HTML tags and get a summary
function getExcerpt(html: string, wordLimit = 40) {
  if (!html) return '';
  const text = html.replace(/<[^>]+>/g, ' ');
  const words = text.replace(/\s+/g, ' ').trim().split(' ');
  if (words.length <= wordLimit) return words.join(' ');
  return words.slice(0, wordLimit).join(' ') + '...';
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    title: '',
    content: '',
    file: null as File | null,
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const category = categoryData[params.category as keyof typeof categoryData];

  useEffect(() => {
    fetchArticles();
  }, [params.category]);

  const fetchArticles = async () => {
    try {
      const data = await api.articles.getByCategory(category.title);
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('category', category.title);
    if (form.file) formData.append('file', form.file);

    try {
      await api.articles.submit(formData);
      setStatus('success');
      setForm({ name: '', email: '', title: '', content: '', file: null });
    } catch {
      setStatus('error');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-brand-neutral-900 pt-20">
        <div className="container mx-auto px-4 text-center py-20">
          <h1 className="text-4xl font-bold text-brand-neutral-100 mb-4">Category Not Found</h1>
          <Link href="/articles" className="text-brand-primary hover:underline">
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-neutral-900 pt-20">
      <section className="py-12 relative z-20">
        <div className="container mx-auto px-4">
          <Link 
            href="/articles" 
            className="inline-flex items-center gap-2 text-brand-neutral-400 hover:text-brand-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Articles
          </Link>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-brand-neutral-50">
              <span className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.title}
              </span>
            </h1>
            <p className="text-xl text-brand-neutral-300 mb-8 max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Published Articles */}
      {!loading && articles.length > 0 && (
        <section className="py-8 relative z-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-brand-neutral-100 mb-8">Published Articles</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${params.category}/${article.slug}`}
                  className="bg-brand-neutral-800/50 backdrop-blur-md rounded-xl p-6 border border-brand-neutral-700 hover:border-brand-primary transition-all duration-300 hover:scale-[1.02]"
                >
                  <h3 className="text-xl font-semibold text-brand-neutral-100 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  {article.content && (
                    <p className="text-brand-neutral-300 mb-4 line-clamp-3">
                      {getExcerpt(article.content)}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-brand-neutral-400">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {article.author_name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.published_at)}
                    </div>
                  </div>
                  {article.file_name && (
                    <div className="flex items-center gap-2 text-sm text-brand-neutral-400 mt-2">
                      <FileText className="w-4 h-4" />
                      {article.file_name}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-brand-neutral-400 mt-2">
                    <Eye className="w-4 h-4" />
                    {article.view_count} views
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Article Submission Form */}
      <section className="py-16 relative z-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-brand-neutral-800/50 backdrop-blur-md rounded-3xl p-12 border border-brand-neutral-700">
            <h2 className="text-3xl font-bold text-brand-neutral-100 mb-8 text-center">Submit Your Article</h2>
            <p className="text-brand-neutral-400 text-center mb-8 max-w-2xl mx-auto">
              Share your knowledge and insights with our community. Use the rich text editor below to create beautifully formatted articles with headings, lists, code blocks, and more.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-brand-neutral-900/50 border-2 border-brand-neutral-700 rounded-xl focus:outline-none focus:border-brand-primary transition-colors text-brand-neutral-100 placeholder-brand-neutral-400 text-lg"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-brand-neutral-900/50 border-2 border-brand-neutral-700 rounded-xl focus:outline-none focus:border-brand-primary transition-colors text-brand-neutral-100 placeholder-brand-neutral-400 text-lg"
                />
              </div>
              <input
                type="text"
                name="title"
                placeholder="Article Title"
                required
                value={form.title}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-brand-neutral-900/50 border-2 border-brand-neutral-700 rounded-xl focus:outline-none focus:border-brand-primary transition-colors text-brand-neutral-100 placeholder-brand-neutral-400 text-lg"
              />
              <RichTextEditor
                value={form.content}
                onChange={(value) => setForm(prev => ({ ...prev, content: value }))}
                placeholder="Write your article content here... Use the toolbar above for formatting options like headings, bold, italic, lists, code blocks, and more!"
                className="w-full"
              />
              <div className="bg-brand-neutral-900/30 rounded-xl p-6 border border-brand-neutral-600">
                <label className="flex items-center gap-3 cursor-pointer">
                  <UploadCloud className="w-6 h-6 text-brand-primary" />
                  <span className="text-brand-neutral-300 text-lg">Attach a file (optional)</span>
                  <input
                    type="file"
                    name="file"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {form.file && <span className="text-brand-primary ml-2 text-lg">{form.file.name}</span>}
                </label>
                <p className="text-brand-neutral-400 text-sm mt-2 ml-9">
                  Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG
                </p>
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:bg-brand-neutral-600 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Submitting...' : 'Submit Article'}
              </button>
              {status === 'success' && <p className="text-green-400 text-center text-lg">Thank you! Your article has been submitted.</p>}
              {status === 'error' && <p className="text-red-400 text-center text-lg">Something went wrong. Please try again.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <section className="py-20 relative z-20">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-brand-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-12 h-12 text-brand-neutral-500" />
              </div>
              <h3 className="text-2xl font-semibold text-brand-neutral-300 mb-4">
                No Articles Yet
              </h3>
              <p className="text-brand-neutral-400 mb-8 max-w-md mx-auto">
                Be the first to contribute an article to this category! Share your knowledge and insights with our community.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
} 