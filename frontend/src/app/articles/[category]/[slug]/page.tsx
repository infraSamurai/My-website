"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, FileText, Calendar, User, Eye, Download, Heart, MessageCircle, Share2 } from 'lucide-react';
import ContactSection from '@/components/Home/ContactSection';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  author_name: string;
  author_email: string;
  category: string;
  file_name: string;
  file_url: string;
  mime_type: string;
  view_count: number;
  claps: number;
  published_at: string;
  pdf_file_name?: string;
  pdf_mime_type?: string;
}

export default function ArticlePage({ params }: { params: { category: string; slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claps, setClaps] = useState(0);
  const [hasClapped, setHasClapped] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, [params.slug]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/articles/${params.slug}`);
      if (response.ok) {
        const data = await response.json();
        setArticle(data);
        setClaps(data.claps || 0);
      } else {
        setError('Article not found');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      setError('Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleClap = async () => {
    if (!hasClapped && article) {
      setHasClapped(true);
      setClaps(prev => prev + 1);
      
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/articles/${article.id}/clap`, {
          method: 'POST',
        });
      } catch (error) {
        console.error('Error clapping article:', error);
        // Optional: handle error, maybe revert optimistic update
        setClaps(prev => prev - 1);
        setHasClapped(false);
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-neutral-900 pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-brand-neutral-400">Loading article...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-brand-neutral-900 pt-20">
        <div className="container mx-auto px-4">
          <Link 
            href={`/articles/${params.category}`}
            className="inline-flex items-center gap-2 text-brand-neutral-400 hover:text-brand-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to {params.category.replace('-', ' ')}
          </Link>
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-brand-neutral-100 mb-4">Article Not Found</h1>
            <p className="text-brand-neutral-400 mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Link 
              href={`/articles/${params.category}`}
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-full font-medium hover:bg-brand-secondary transition-colors"
            >
              ← Back to Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-neutral-900 pt-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          href={`/articles/${params.category}`}
          className="inline-flex items-center gap-2 text-brand-neutral-400 hover:text-brand-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to {article.category}
        </Link>

        <article className="bg-brand-neutral-800/50 backdrop-blur-md rounded-2xl border border-brand-neutral-700 overflow-hidden">
          {/* Article Header */}
          <header className="p-8 border-b border-brand-neutral-700">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-neutral-100 mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-brand-neutral-400 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{article.author_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(article.published_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>{article.view_count} views</span>
              </div>
            </div>

            {/* Reaction Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleClap}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    hasClapped 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                      : 'bg-brand-neutral-700 text-brand-neutral-300 hover:bg-brand-neutral-600 border border-brand-neutral-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${hasClapped ? 'fill-current' : ''}`} />
                  <span>{claps}</span>
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-neutral-700 text-brand-neutral-300 hover:bg-brand-neutral-600 border border-brand-neutral-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>Comment</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-neutral-700 text-brand-neutral-300 hover:bg-brand-neutral-600 border border-brand-neutral-600 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>

              {article.file_name && (
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-primary" />
                  <span className="text-sm text-brand-neutral-400">{article.file_name}</span>
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/api/admin/files/${article.id}`}
                    download
                    className="flex items-center gap-1 text-sm hover:underline bg-brand-neutral-700 text-brand-neutral-300 px-2 py-1 rounded hover:bg-brand-neutral-600 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </a>
                </div>
              )}
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none p-8">
            {/* Render the HTML content from the editor */}
            {article.content && (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            )}
            {/* Show attachment download button if file exists */}
            {article.file_name && (
              <div className="mt-8 flex flex-col items-center">
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/api/admin/files/${article.id}`}
                  download
                  className="inline-flex items-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-secondary transition-colors"
                >
                  <Download className="w-6 h-6" />
                  Download Attachment ({article.file_name})
                </a>
              </div>
            )}
          </div>

          {/* Article Footer */}
          <footer className="p-8 border-t border-brand-neutral-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-brand-neutral-400">
                <p>Written by <span className="text-brand-neutral-300 font-medium">{article.author_name}</span></p>
                <p>Published in <span className="text-brand-neutral-300 font-medium">{article.category}</span></p>
              </div>
              
              <div className="flex gap-4">
                <a
                  href={`mailto:${article.author_email}?subject=Re: ${article.title}`}
                  className="flex items-center gap-2 text-brand-neutral-400 hover:text-brand-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact Author
                </a>
                <a
                  href={`mailto:devansh.prakhar@gmail.com?subject=Article Submission`}
                  className="flex items-center gap-2 text-brand-neutral-400 hover:text-brand-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Submit Your Article
                </a>
              </div>
            </div>
          </footer>
        </article>
      </div>
      <ContactSection />
    </div>
  );
}