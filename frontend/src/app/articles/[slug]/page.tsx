import WavelengthBackground from "@/components/Home/WavelengthBackground";
import StarfieldBackground from "@/components/StarfieldBackground";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  subject: string;
  tags: string[];
  cover_image_url: string | null;
  created_at: string;
  author_name: string | null;
}

async function getArticle(slug: string): Promise<Article | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${apiUrl}/api/articles/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      // If not found, res.ok will be false
      if (res.status === 404) return null;
      throw new Error('Failed to fetch article');
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error);
    return null;
  }
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-brand-neutral-950 text-brand-neutral-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404 - Article Not Found</h1>
          <p className="mt-4">Sorry, the article you are looking for does not exist.</p>
          <a href="/articles" className="mt-6 inline-block text-brand-secondary hover:underline">
            &larr; Back to all articles
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-brand-neutral-950 text-brand-neutral-50">
      <StarfieldBackground />
      <WavelengthBackground />
      
      <main className="container mx-auto px-4 py-24 relative z-10">
        <article className="max-w-4xl mx-auto bg-brand-neutral-900/30 backdrop-blur-lg p-8 rounded-2xl">
          <header className="mb-8 text-center">
            <p className="text-brand-primary mb-2 font-semibold">{article.subject}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-neutral-50 mb-4">{article.title}</h1>
            <div className="text-sm text-brand-neutral-400">
              <span>Published on {new Date(article.created_at).toLocaleDateString()}</span>
              <span className="mx-2">&bull;</span>
              <span>By {article.author_name || 'Anonymous'}</span>
            </div>
          </header>

          {article.cover_image_url && (
            <img 
              src={article.cover_image_url} 
              alt={article.title} 
              className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8"
            />
          )}

          {/* Using dangerouslySetInnerHTML assuming content is sanitized or from a trusted source */}
          {/* For a real app, use a Markdown renderer like 'react-markdown' for safety */}
          <div 
            className="prose prose-invert lg:prose-xl max-w-none text-brand-neutral-200"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <footer className="mt-12">
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-sm rounded-full bg-brand-neutral-800 text-brand-neutral-300">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-8">
              <a href="/articles" className="text-brand-secondary hover:underline">
                &larr; Back to all articles
              </a>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
} 