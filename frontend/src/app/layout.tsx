import './globals.css';
import '../styles/japanese-fonts.css';
import '../styles/wabi-sabi-colors.css';
import type { Metadata } from 'next';
import Layout from '../components/Layout';
import { Inter, Noto_Sans_JP, M_PLUS_1 } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-jp',
  display: 'swap',
});

const mPlus1 = M_PLUS_1({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-m-plus',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Akshararambh Public School',
  description: 'Nurturing Young Minds for a Brighter Future',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansJP.variable} ${mPlus1.variable}`}>
      <body>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
} 