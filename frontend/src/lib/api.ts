const API_ENDPOINTS = {
  // Contact
  sendContactEmail: '/api/send-contact-email',
  sendAdmissionEmail: '/api/send-admission-email',
  sendVisitEmail: '/api/send-visit-email',
  sendArticleSubmission: '/api/send-article-submission',
  // Admin
  pendingSubmissions: '/api/admin/submissions/pending',
  articles: '/api/admin/articles',
  featuredArticles: '/api/admin/articles/featured',
  categoryCounts: '/api/admin/categories/counts',
  // Dynamic endpoints
  articleBySlug: (slug: string) => `/api/admin/articles/${slug}`,
  articlesByCategory: (category: string) => `/api/admin/articles/category/${category}`,
  approveSubmission: (id: string) => `/api/admin/submissions/${id}/approve`,
  rejectSubmission: (id: string) => `/api/admin/submissions/${id}/reject`,
  clapArticle: (id: string) => `/api/admin/articles/${id}/clap`,
  deleteArticle: (id: string) => `/api/admin/articles/${id}`,
  serveFile: (id: string) => `/api/admin/files/${id}`,
} as const;

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
}

export const api = {
  contact: {
    sendMessage: (data: any) => 
      apiRequest(API_ENDPOINTS.sendContactEmail, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    sendAdmission: (data: any) =>
      apiRequest(API_ENDPOINTS.sendAdmissionEmail, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    sendVisit: (data: any) =>
      apiRequest(API_ENDPOINTS.sendVisitEmail, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
  articles: {
    getAll: () => apiRequest(API_ENDPOINTS.articles),
    getFeatured: () => apiRequest(API_ENDPOINTS.featuredArticles),
    getBySlug: (slug: string) => 
      apiRequest(API_ENDPOINTS.articleBySlug(slug)),
    getByCategory: (category: string) =>
      apiRequest(API_ENDPOINTS.articlesByCategory(category)),
    getCategoryCounts: () => apiRequest(API_ENDPOINTS.categoryCounts),
    submit: async (formData: FormData) => {
      const response = await fetch(API_ENDPOINTS.sendArticleSubmission, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to submit article');
      }
      return response.json();
    },
    clap: (id: string) =>
      apiRequest(API_ENDPOINTS.clapArticle(id), { method: 'POST' }),
    delete: (id: string) =>
      apiRequest(API_ENDPOINTS.deleteArticle(id), { method: 'DELETE' }),
  },
  admin: {
    getPendingSubmissions: () => 
      apiRequest(API_ENDPOINTS.pendingSubmissions),
    approveSubmission: (id: string, notes: string) =>
      apiRequest(API_ENDPOINTS.approveSubmission(id), {
        method: 'POST',
        body: JSON.stringify({ adminNotes: notes }),
      }),
    rejectSubmission: (id: string, notes: string) =>
      apiRequest(API_ENDPOINTS.rejectSubmission(id), {
        method: 'POST',
        body: JSON.stringify({ adminNotes: notes }),
      }),
  },
}; 