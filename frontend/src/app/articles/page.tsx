import WavelengthBackground from "@/components/Home/WavelengthBackground";
import StarfieldBackground from "@/components/StarfieldBackground";

// Define the type for an article
interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  subject: string;
  tags: string[];
  cover_image_url: string | null;
  created_at: string;
  author_name: string | null;
}

async function getArticles(): Promise<Article[]> {
  // This URL needs to work in both server-side rendering (during build) and client-side
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${apiUrl}/api/articles`, { next: { revalidate: 60 } }); // Revalidate every 60 seconds
    if (!res.ok) {
      throw new Error('Failed to fetch articles');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return []; // Return empty array on error
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  const subjects = ['All', 'Psychology', 'Philosophy', 'English Literature', 'Hindi Literature', 'Science', 'Technology'];

  return (
    <div className="relative min-h-screen bg-brand-neutral-950 text-brand-neutral-50">
      <StarfieldBackground />
      <WavelengthBackground />
      
      <main className="container mx-auto px-4 py-24 relative z-10">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mb-4">
            Explore Our Articles
          </h1>
          <p className="text-lg text-brand-neutral-300 max-w-2xl mx-auto">
            A collection of thoughts, ideas, and discussions from our students and faculty across various subjects.
          </p>
        </header>

        {/* Filters */}
        <div className="mb-12 flex justify-center items-center gap-4 flex-wrap">
          {subjects.map(subject => (
            <button key={subject} className="px-4 py-2 rounded-full text-sm font-medium bg-brand-neutral-800/50 hover:bg-brand-primary/20 border border-brand-neutral-700 transition-colors">
              {subject}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles && articles.length > 0 ? (
            articles.map((article: Article) => (
              <div key={article.id} className="bg-brand-neutral-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-brand-neutral-800 shadow-lg transition-transform hover:scale-105 duration-300">
                {/* <img src={article.cover_image_url || '/placeholder.jpg'} alt={article.title} className="w-full h-48 object-cover" /> */}
                <div className="p-6">
                  <p className="text-sm text-brand-primary mb-2">{article.subject}</p>
                  <h3 className="text-xl font-bold mb-3 text-brand-neutral-100">{article.title}</h3>
                  <p className="text-brand-neutral-400 text-sm mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-brand-neutral-500">
                    <span>By {article.author_name || 'Anonymous'}</span>
                    <span>{new Date(article.created_at).toLocaleDateString()}</span>
                  </div>
                  <a href={`/articles/${article.slug}`} className="mt-4 inline-block text-brand-secondary hover:underline">Read More &rarr;</a>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-brand-neutral-400">No articles found. Check back later!</p>
          )}
        </div>
      </main>
    </div>
  );
} 