"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Trash2, Eye } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  author_name: string;
  category: string;
  published_at: string;
}

export default function AdminPublishedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/articles`);
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/articles/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
      } else {
        alert('Failed to delete article');
      }
    } catch (err) {
      alert('Failed to delete article');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-brand-neutral-100 mb-8">Published Articles ({articles.length})</h2>
      {loading ? (
        <div className="text-brand-neutral-400">Loading articles...</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-brand-neutral-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-brand-neutral-300 mb-2">No Published Articles</h3>
          <p className="text-brand-neutral-400">No articles have been published yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-brand-neutral-800 rounded-lg p-6 border border-brand-neutral-700 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-brand-neutral-100 mb-1">{article.title}</h3>
                <div className="flex items-center gap-4 text-sm text-brand-neutral-400 mb-1">
                  <span>By {article.author_name}</span>
                  <span>Category: {article.category}</span>
                  <span>Published: {formatDate(article.published_at)}</span>
                </div>
                <Link
                  href={`/articles/${article.category.toLowerCase().replace(/ /g, '-')}/${article.slug}`}
                  className="inline-flex items-center gap-2 text-brand-primary hover:underline text-sm mt-2"
                  target="_blank"
                >
                  <Eye className="w-4 h-4" /> View Article
                </Link>
              </div>
              <button
                onClick={() => handleDelete(article.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                disabled={deletingId === article.id}
              >
                <Trash2 className="w-5 h-5" />
                {deletingId === article.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 