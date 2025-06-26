"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, CheckCircle, XCircle, Home } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/submissions', label: 'Pending Submissions', icon: FileText },
    { href: '/admin/articles', label: 'Published Articles', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-brand-neutral-900">
      {/* Admin Header */}
      <header className="bg-brand-neutral-800 border-b border-brand-neutral-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-neutral-100">
              Admin Dashboard
            </h1>
            <Link 
              href="/" 
              className="text-brand-neutral-400 hover:text-brand-primary transition-colors"
            >
              ← Back to Website
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-brand-neutral-800 border-r border-brand-neutral-700 min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-brand-primary text-white'
                          : 'text-brand-neutral-300 hover:bg-brand-neutral-700 hover:text-brand-neutral-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 