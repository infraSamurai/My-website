"use client";
import { useState } from 'react';

export default function ApiTestPage() {
  const [results, setResults] = useState<any[]>([]);
  
  const testEndpoint = async (name: string, url: string) => {
    const start = Date.now();
    try {
      const response = await fetch(url);
      const time = Date.now() - start;
      const data = await response.text();
      
      setResults(prev => [...prev, {
        name,
        url,
        status: response.status,
        statusText: response.statusText,
        time,
        success: response.ok,
        data: data.substring(0, 100) + '...'
      }]);
    } catch (error: any) {
      setResults(prev => [...prev, {
        name,
        url,
        status: 'ERROR',
        statusText: error.message,
        time: Date.now() - start,
        success: false,
        data: 'Failed to connect'
      }]);
    }
  };
  
  const runTests = async () => {
    setResults([]);
    const tests = [
      { name: 'Relative Path', url: '/api' },
      { name: 'Window Origin', url: typeof window !== 'undefined' ? `${window.location.origin}/api` : 'SSR' }
    ];
    for (const test of tests) {
      if (test.url !== 'SSR') {
        await testEndpoint(test.name, test.url);
      } else {
        setResults(prev => [...prev, {
          name: test.name,
          url: test.url,
          status: 'N/A',
          statusText: 'Not available during SSR',
          time: 0,
          success: false,
          data: 'window.location is not available during SSR'
        }]);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-brand-neutral-900 pt-20 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">API Connection Test</h1>
        
        <div className="bg-brand-neutral-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Environment Info</h2>
          <div className="space-y-2 text-brand-neutral-300">
            <p>NODE_ENV: <code className="bg-brand-neutral-700 px-2 py-1 rounded">{process.env.NODE_ENV}</code></p>
            <p>Window Origin: <code className="bg-brand-neutral-700 px-2 py-1 rounded">{typeof window !== 'undefined' ? window.location.origin : 'SSR'}</code></p>
          </div>
        </div>
        
        <button
          onClick={runTests}
          className="bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-secondary transition-colors mb-8"
        >
          Run API Tests
        </button>
        
        {results.length > 0 && (
          <div className="space-y-4">
            {results.map((result, i) => (
              <div key={i} className={`bg-brand-neutral-800 rounded-lg p-6 border-2 ${result.success ? 'border-green-500' : 'border-red-500'}`}>
                <h3 className="text-lg font-semibold text-white mb-2">{result.name}</h3>
                <div className="space-y-1 text-sm text-brand-neutral-300">
                  <p>URL: <code className="bg-brand-neutral-700 px-2 py-1 rounded text-xs">{result.url}</code></p>
                  <p>Status: <span className={result.success ? 'text-green-400' : 'text-red-400'}>{result.status} {result.statusText}</span></p>
                  <p>Response Time: {result.time}ms</p>
                  <p>Data Preview: <code className="bg-brand-neutral-700 px-2 py-1 rounded text-xs block mt-1">{result.data}</code></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 