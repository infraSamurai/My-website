"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, UploadCloud, FileText, Calendar, User, Eye } from 'lucide-react';

const categoryData = {
  'hindi-literature': {
    title: 'Hindi Literature',
    description: 'कहानियाँ, कविताएँ और साहित्यिक रचनाएँ',
    color: 'from-orange-500 to-red-500'
  },
  'english-literature': {
    title: 'English Literature',
    description: 'Stories, poems and literary works',
    color: 'from-blue-500 to-purple-500'
  },
  'technology': {
    title: 'Technology',
    description: 'Latest tech trends and innovations',
    color: 'from-green-500 to-blue-500'
  },
  'science': {
    title: 'Science',
    description: 'Scientific discoveries and research',
    color: 'from-yellow-500 to-orange-500'
  },
  'psychology': {
    title: 'Psychology',
    description: 'Mental health and human behavior',
    color: 'from-pink-500 to-purple-500'
  },
  'philosophy': {
    title: 'Philosophy',
    description: 'Deep thoughts and life wisdom',
    color: 'from-red-500 to-pink-500'
  }
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/articles/category/${category.title}`);
      const data = await response.json();
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-article-submission`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', title: '', content: '', file: null });
      } else {
        setStatus('error');
      }
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
                      {article.content}
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
      <section className="py-8 relative z-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-brand-neutral-800/50 backdrop-blur-md rounded-2xl p-8 border border-brand-neutral-700">
            <h2 className="text-2xl font-bold text-brand-neutral-100 mb-4">Submit Your Article</h2>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-neutral-900/50 border-2 border-brand-neutral-700 rounded-xl focus:outline-none focus:border-brand-primary transition-colors text-brand-neutral-100 placeholder-brand-neutral-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-neutral-900/50 border-2 border-brand-neutral-700 rounded-xl focus:outline-none focus:border-brand-primary transition-colors text-brand-neutral-100 placeholder-brand-neutral-400"
              />
              <input
                type="text"
                name="title"
                placeholder="Article Title"
                required
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-neutral-900/50 border-2 border-brand-neutral-700 rounded-xl focus:outline-none focus:border-brand-primary transition-colors text-brand-neutral-100 placeholder-brand-neutral-400"
              />
              <textarea
                name="content"
                placeholder="Article Content (or a short summary if uploading a file)"
                rows={6}
                required={!form.file}
                value={form.content}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-neutral-900/50 border-2 border-brand-neutral-700 rounded-xl focus:outline-none focus:border-brand-primary transition-colors resize-none text-brand-neutral-100 placeholder-brand-neutral-400"
              ></textarea>
              <label className="flex items-center gap-3 cursor-pointer">
                <UploadCloud className="w-5 h-5 text-brand-primary" />
                <span className="text-brand-neutral-300">Attach a file (optional)</span>
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {form.file && <span className="text-brand-primary ml-2">{form.file.name}</span>}
              </label>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:bg-brand-neutral-600 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Submitting...' : 'Submit Article'}
              </button>
              {status === 'success' && <p className="text-green-400 text-center">Thank you! Your article has been submitted.</p>}
              {status === 'error' && <p className="text-red-400 text-center">Something went wrong. Please try again.</p>}
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