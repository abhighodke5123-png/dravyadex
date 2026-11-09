import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ComparisonProvider } from '@/components/comparison/ComparisonContext';
import { ComparisonTray } from '@/components/comparison/ComparisonTray';

export const metadata: Metadata = {
  title: 'DRAVYADEX — Digital Ayurvedic Dravyaguna Knowledge Platform',
  description:
    'A living knowledge system for Ayurvedic medicinal plants, classical pharmacology (Dravyaguna Vigyana), verified botanical taxonomy, and peer-reviewed biomedical research.',
  keywords: [
    'Ayurveda',
    'Dravyaguna',
    'Medicinal Plants',
    'Botanical Taxonomy',
    'Rasa Panchaka',
    'Dosha Karma',
    'BAMS',
    'Herbal Pharmacognosy',
    'Ethnobotany',
  ],
  authors: [{ name: 'DravyaDex Research Consortium' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07090C] text-[#F4F5F1] min-h-screen flex flex-col antialiased selection:bg-[#6BAA83]/30">
        <ComparisonProvider>
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <ComparisonTray />
          <Footer />
        </ComparisonProvider>
      </body>
    </html>
  );
}
