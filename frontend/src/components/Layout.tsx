import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { SeasonsOfLearning } from './Memorable/SeasonsOfLearning';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SeasonsOfLearning intensity="subtle" className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 relative z-10">
        {children}
      </main>
      <Footer />
    </SeasonsOfLearning>
  );
} 