"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

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
    </div>
  );
} 