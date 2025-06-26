"use client";
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, FileText, Calendar, User, Tag, Eye } from 'lucide-react';

interface Submission {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_email: string;
  category: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  created_at: string;
  status: string;
}

export default function PendingSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [viewingSubmission, setViewingSubmission] = useState<Submission | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [notes, setNotes] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/submissions/pending`);
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!selectedSubmission || !action) return;

    setProcessing(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/submissions/${selectedSubmission.id}/${action}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminNotes: notes })
        }
      );

      if (response.ok) {
        setShowModal(false);
        setSelectedSubmission(null);
        setAction(null);
        setNotes('');
        fetchSubmissions(); // Refresh the list
      } else {
        alert('Failed to process submission');
      }
    } catch (error) {
      console.error('Error processing submission:', error);
      alert('Failed to process submission');
    } finally {
      setProcessing(false);
      setViewingSubmission(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-brand-neutral-400">Loading submissions...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-brand-neutral-100 mb-8">
        Pending Submissions ({submissions.length})
      </h2>

      {submissions.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-brand-neutral-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-brand-neutral-300 mb-2">
            No Pending Submissions
          </h3>
          <p className="text-brand-neutral-400">
            All article submissions have been reviewed.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-brand-neutral-800 rounded-lg p-6 border border-brand-neutral-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-brand-neutral-100 mb-2">
                    {submission.title}
                  </h3>
                  <div className="flex items-center gap-6 text-sm text-brand-neutral-400 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {submission.author_name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {submission.category}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(submission.created_at)}
                    </div>
                  </div>
                  {submission.file_name && (
                    <div className="flex items-center gap-2 text-sm text-brand-neutral-400">
                      <FileText className="w-4 h-4" />
                      {submission.file_name} ({formatFileSize(submission.file_size)})
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedSubmission(submission);
                      setViewingSubmission(submission);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Modal */}
      {showModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-brand-neutral-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-brand-neutral-100 mb-4">
              {action === 'approve' ? 'Approve' : 'Reject'} Article
            </h3>
            <p className="text-brand-neutral-300 mb-4">
              "{selectedSubmission.title}" by {selectedSubmission.author_name}
            </p>
            <textarea
              placeholder={`Add notes for ${action === 'approve' ? 'approval' : 'rejection'} (optional)`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 bg-brand-neutral-700 border border-brand-neutral-600 rounded-lg text-brand-neutral-100 placeholder-brand-neutral-400 resize-none"
              rows={3}
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedSubmission(null);
                  setAction(null);
                  setNotes('');
                }}
                className="flex-1 px-4 py-2 bg-brand-neutral-700 text-brand-neutral-300 rounded-lg hover:bg-brand-neutral-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                disabled={processing}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  action === 'approve'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {processing ? 'Processing...' : action === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Submission Modal */}
      {viewingSubmission && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-brand-neutral-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex-shrink-0 flex justify-between items-start">
              <h3 className="text-2xl font-semibold text-brand-neutral-100 mb-4">
                Review Submission
              </h3>
              <button onClick={() => setViewingSubmission(null)} className="text-brand-neutral-400 hover:text-white">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto pr-4 -mr-4 mb-4">
              <h4 className="text-xl font-bold text-brand-neutral-100 mb-2">{viewingSubmission.title}</h4>
              <div className="flex items-center gap-6 text-sm text-brand-neutral-400 mb-4">
                <div className="flex items-center gap-1"><User className="w-4 h-4" /> {viewingSubmission.author_name}</div>
                <div className="flex items-center gap-1"><Tag className="w-4 h-4" /> {viewingSubmission.category}</div>
                <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {formatDate(viewingSubmission.created_at)}</div>
              </div>
              {viewingSubmission.file_name && (
                <div className="flex items-center gap-2 text-sm text-brand-neutral-400 mb-4">
                  <FileText className="w-4 h-4" />
                  {viewingSubmission.file_name} ({formatFileSize(viewingSubmission.file_size)})
                </div>
              )}
              <div
                className="prose prose-invert max-w-none bg-brand-neutral-900/50 p-4 rounded-lg"
                dangerouslySetInnerHTML={{ __html: viewingSubmission.content }}
              />
            </div>

            <div className="flex-shrink-0 flex gap-3 mt-auto pt-4 border-t border-brand-neutral-700">
              <button
                onClick={() => setViewingSubmission(null)}
                className="flex-1 px-4 py-2 bg-brand-neutral-700 text-brand-neutral-300 rounded-lg hover:bg-brand-neutral-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setAction('reject');
                  setShowModal(true);
                  setViewingSubmission(null);
                }}
                className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
              <button
                onClick={() => {
                  setAction('approve');
                  setShowModal(true);
                  setViewingSubmission(null);
                }}
                className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4" /> Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 