import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import StarfieldBackground from './StarfieldBackground';
// import TreeScene from './Home/TreeScene';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <StarfieldBackground />
      <Header />
      <main className="flex-1 pt-20" style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
} 