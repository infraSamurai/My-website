"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const healthChecks = [
  { name: 'Contact Email', endpoint: '/api/send-contact-email' },
  { name: 'Admission Email', endpoint: '/api/send-admission-email' },
  { name: 'Article Submission', endpoint: '/api/send-article-submission' },
];

const endpoints = [
  { name: 'Contact Email (POST)', endpoint: '/api/send-contact-email', method: 'POST', body: { name: 'Test', email: 'test@example.com', message: 'Hello' } },
  { name: 'Admission Email (POST)', endpoint: '/api/send-admission-email', method: 'POST', body: { parentName: 'Test Parent', parentEmail: 'parent@example.com', parentPhone: '1234567890', studentName: 'Test Student', studentAge: 10, grade: 'Grade 1', message: 'Test admission' } },
  { name: 'Article Submission (POST)', endpoint: '/api/send-article-submission', method: 'POST', body: { name: 'Test Author', email: 'author@example.com', title: 'Test Article', content: 'Test content', category: 'General' } },
  { name: 'Get All Articles (GET)', endpoint: '/api/admin/articles', method: 'GET' },
  { name: 'Get Categories (GET)', endpoint: '/api/admin/articles/categories', method: 'GET' },
  { name: 'Get Submissions (GET)', endpoint: '/api/admin/submissions', method: 'GET' },
];

function HealthCheck({ endpoint, name }: { endpoint: string; name: string }) {
  const [status, setStatus] = useState<'pass' | 'fail' | 'pending'>('pending');

  useEffect(() => {
    fetch(endpoint, { method: 'OPTIONS' })
      .then((res) => {
        if (res.ok) setStatus('pass');
        else setStatus('fail');
      })
      .catch(() => {
        setStatus('fail');
      });
  }, [endpoint]);

  return (
    <div style={{ marginBottom: 12 }}>
      <strong>{name} ({endpoint}):</strong> {status === 'pending' ? (
        <span style={{ color: '#888' }}>Checking...</span>
      ) : status === 'pass' ? (
        <span style={{ color: 'green', fontWeight: 'bold' }}>PASS</span>
      ) : (
        <span style={{ color: 'red', fontWeight: 'bold' }}>FAIL</span>
      )}
    </div>
  );
}

function EndpointCheck({ endpoint, name, method, body }: { endpoint: string; name: string; method: string; body?: any }) {
  const [status, setStatus] = useState<'pass' | 'fail' | 'pending'>('pending');

  useEffect(() => {
    let options: RequestInit = { method };
    if (method === 'POST') {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(body);
    }
    fetch(endpoint, options)
      .then((res) => {
        if (res.ok) setStatus('pass');
        else setStatus('fail');
      })
      .catch(() => {
        setStatus('fail');
      });
    // eslint-disable-next-line
  }, [endpoint, method]);

  return (
    <div style={{ marginBottom: 12 }}>
      <strong>{name} ({method} {endpoint}):</strong> {status === 'pending' ? (
        <span style={{ color: '#888' }}>Checking...</span>
      ) : status === 'pass' ? (
        <span style={{ color: 'green', fontWeight: 'bold' }}>PASS</span>
      ) : (
        <span style={{ color: 'red', fontWeight: 'bold' }}>FAIL</span>
      )}
    </div>
  );
}

function EnvVarDisplay() {
  return (
    <div style={{ marginBottom: 16, background: '#e0f7fa', padding: 12, borderRadius: 4 }}>
      <strong>Frontend Env Vars:</strong>
      <div>BACKEND_URL: {process.env.BACKEND_URL || '[NOT SET]'}</div>
      <div>NODE_ENV: {process.env.NODE_ENV || '[NOT SET]'}</div>
    </div>
  );
}

export default function ApiTestPage() {
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [backendUrl, setBackendUrl] = useState<string | undefined>(undefined);
  const [apiEndpoint, setApiEndpoint] = useState<string>("");

  useEffect(() => {
    // Try to get the env variable from the build (injected at build time)
    setBackendUrl(process.env.BACKEND_URL);
    // Show the actual endpoint being used by the client
    setApiEndpoint("/api/admin/articles");
    api.articles.getAll()
      .then((data) => setResult(JSON.stringify(data, null, 2)))
      .catch((err) => setError(err.message || "Unknown error"));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <EnvVarDisplay />
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
        <div className="mb-4 p-4 bg-gray-100 rounded text-gray-800">
          <div><strong>BACKEND_URL env variable:</strong> {backendUrl ? backendUrl : <span className="text-red-600">Not set (using localhost fallback)</span>}</div>
          <div><strong>API endpoint being called:</strong> <code>{apiEndpoint}</code></div>
        </div>
        <div className="mb-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              setResult("");
              setError("");
              api.articles.getAll()
                .then((data) => setResult(JSON.stringify(data, null, 2)))
                .catch((err) => setError(err.message || "Unknown error"));
            }}
          >
            Test API
          </button>
        </div>
        {result && (
          <pre className="bg-green-100 p-4 rounded text-green-800 overflow-x-auto">{result}</pre>
        )}
        {error && (
          <pre className="bg-red-100 p-4 rounded text-red-800 overflow-x-auto">Error: {error}</pre>
        )}
        <h2>API Endpoint Checks</h2>
        {endpoints.map((ep) => (
          <EndpointCheck key={ep.endpoint + ep.method} {...ep} />
        ))}
        <h2>API Health Checks</h2>
        {healthChecks.map((hc) => (
          <HealthCheck key={hc.endpoint} {...hc} />
        ))}
      </div>
    </div>
  );
} 