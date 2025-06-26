"use client";
import { useState, useEffect } from 'react';
import { FileText, Download, X, Loader2 } from 'lucide-react';

interface FileViewerProps {
  fileUrl: string;
  fileName: string;
  mimeType: string;
  onClose?: () => void;
}

export default function FileViewer({ fileUrl, fileName, mimeType, onClose }: FileViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
  }, [fileUrl]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError('Failed to load file');
  };

  const isPDF = mimeType === 'application/pdf';
  const isDOCX = mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  if (error) {
    return (
      <div className="bg-brand-neutral-800/50 backdrop-blur-md rounded-2xl p-8 border border-brand-neutral-700">
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-brand-neutral-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-brand-neutral-300 mb-2">
            Unable to Display File
          </h3>
          <p className="text-brand-neutral-400 mb-4">
            {error}
          </p>
          <a
            href={fileUrl}
            download
            className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-full font-medium hover:bg-brand-secondary transition-colors"
          >
            <Download className="w-5 h-5" />
            Download {fileName}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-neutral-800/50 backdrop-blur-md rounded-2xl border border-brand-neutral-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-brand-neutral-700">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-brand-primary" />
          <span className="text-brand-neutral-300 font-medium">{fileName}</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={fileUrl}
            download
            className="flex items-center gap-2 text-brand-neutral-400 hover:text-brand-primary transition-colors p-2 rounded-lg hover:bg-brand-neutral-700"
            title="Download file"
          >
            <Download className="w-4 h-4" />
          </a>
          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-brand-neutral-400 hover:text-brand-neutral-200 transition-colors p-2 rounded-lg hover:bg-brand-neutral-700"
              title="Close viewer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* File Content */}
      <div className="relative min-h-[600px] bg-white">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-neutral-900/50 z-10">
            <div className="flex items-center gap-3 text-brand-neutral-300">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading file...</span>
            </div>
          </div>
        )}

        {isPDF && (
          <iframe
            src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full min-h-[600px]"
            onLoad={handleLoad}
            onError={handleError}
            title={fileName}
          />
        )}

        {isDOCX && (
          <div className="p-8 text-center">
            <FileText className="w-16 h-16 text-brand-neutral-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brand-neutral-300 mb-2">
              DOCX File Preview
            </h3>
            <p className="text-brand-neutral-400 mb-4">
              DOCX files cannot be previewed directly in the browser.
            </p>
            <a
              href={fileUrl}
              download
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-full font-medium hover:bg-brand-secondary transition-colors"
            >
              <Download className="w-5 h-5" />
              Download {fileName}
            </a>
          </div>
        )}

        {!isPDF && !isDOCX && (
          <div className="p-8 text-center">
            <FileText className="w-16 h-16 text-brand-neutral-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brand-neutral-300 mb-2">
              File Preview Not Available
            </h3>
            <p className="text-brand-neutral-400 mb-4">
              This file type cannot be previewed directly in the browser.
            </p>
            <a
              href={fileUrl}
              download
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-full font-medium hover:bg-brand-secondary transition-colors"
            >
              <Download className="w-5 h-5" />
              Download {fileName}
            </a>
          </div>
        )}
      </div>
    </div>
  );
} 