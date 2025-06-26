"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, FileText, Calendar, User, Eye, Download } from 'lucide-react';

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
  view_count: number;
  published_at: string;
}

export default function ArticlePage({ params }: { params: { category: string; slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticle();
  }, [params.slug]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/articles/${params.slug}`);
      if (response.ok) {
        const data = await response.json();
        setArticle(data);
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

        <article className="bg-brand-neutral-800/50 backdrop-blur-md rounded-2xl p-8 border border-brand-neutral-700">
          {/* Article Header */}
          <header className="mb-8">
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

            {article.file_name && (
              <div className="flex items-center gap-2 text-brand-primary">
                <FileText className="w-5 h-5" />
                <span className="font-medium">{article.file_name}</span>
                {article.file_url && (
                  <a
                    href={article.file_url}
                    download
                    className="flex items-center gap-1 text-sm hover:underline"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                )}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            {article.content ? (
              <div className="text-brand-neutral-300 leading-relaxed text-lg whitespace-pre-line">
                {article.content}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-brand-neutral-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-brand-neutral-300 mb-2">
                  Article Content
                </h3>
                <p className="text-brand-neutral-400 mb-4">
                  This article is available as a downloadable file.
                </p>
                {article.file_url && (
                  <a
                    href={article.file_url}
                    download
                    className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-full font-medium hover:bg-brand-secondary transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download Article
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-brand-neutral-700">
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
    </div>
  );
} 