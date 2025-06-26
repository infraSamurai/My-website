"use client";
import { useState, useEffect } from 'react';
import { FileText, CheckCircle, XCircle, Eye } from 'lucide-react';

interface DashboardStats {
  pendingSubmissions: number;
  publishedArticles: number;
  totalViews: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    pendingSubmissions: 0,
    publishedArticles: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [submissionsRes, articlesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/submissions/pending`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/articles`)
        ]);

        const submissions = await submissionsRes.json();
        const articles = await articlesRes.json();

        const totalViews = articles.reduce((sum: number, article: any) => sum + (article.view_count || 0), 0);

        setStats({
          pendingSubmissions: submissions.length,
          publishedArticles: articles.length,
          totalViews
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-brand-neutral-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-brand-neutral-100 mb-8">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Pending Submissions */}
        <div className="bg-brand-neutral-800 rounded-lg p-6 border border-brand-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-brand-neutral-400 text-sm">Pending Submissions</p>
              <p className="text-3xl font-bold text-brand-neutral-100">
                {stats.pendingSubmissions}
              </p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Published Articles */}
        <div className="bg-brand-neutral-800 rounded-lg p-6 border border-brand-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-brand-neutral-400 text-sm">Published Articles</p>
              <p className="text-3xl font-bold text-brand-neutral-100">
                {stats.publishedArticles}
              </p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-brand-neutral-800 rounded-lg p-6 border border-brand-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-brand-neutral-400 text-sm">Total Views</p>
              <p className="text-3xl font-bold text-brand-neutral-100">
                {stats.totalViews.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Eye className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-brand-neutral-800 rounded-lg p-6 border border-brand-neutral-700">
        <h3 className="text-xl font-semibold text-brand-neutral-100 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/submissions"
            className="flex items-center gap-3 p-4 bg-brand-neutral-700 rounded-lg hover:bg-brand-neutral-600 transition-colors"
          >
            <FileText className="w-5 h-5 text-yellow-500" />
            <span className="text-brand-neutral-100">Review Pending Submissions</span>
          </a>
          <a
            href="/admin/articles"
            className="flex items-center gap-3 p-4 bg-brand-neutral-700 rounded-lg hover:bg-brand-neutral-600 transition-colors"
          >
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-brand-neutral-100">View Published Articles</span>
          </a>
        </div>
      </div>
    </div>
  );
} 