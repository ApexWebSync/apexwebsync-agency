import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://apexwebsync.vercel.app'),
  title: 'ApexWebSync | Web Development & SEO Ranking Agency | Build Develop and Grow',
  description:
    'ApexWebSync is a high-performance web development and SEO ranking agency. We engineer sub-second Next.js web applications and execute aggressive technical SEO to push your brand to Google Page 1.',
  keywords: [
    'ApexWebSync',
    'Web Development Agency',
    'SEO Ranking Agency',
    'Technical SEO Services',
    'Next.js Web Applications',
    'Core Web Vitals Optimization',
    'Headless E-Commerce',
    'Build Develop and Grow',
  ],
  authors: [{ name: 'ApexWebSync' }],
  creator: 'ApexWebSync',
  openGraph: {
    title: 'ApexWebSync | Web Development & SEO Ranking Agency',
    description:
      'We engineer websites that dominate search results and convert visitors. Slogan: Build Develop and Grow.',
    url: 'https://apexwebsync.vercel.app',
    siteName: 'ApexWebSync',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 1200,
        alt: 'ApexWebSync Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexWebSync | Web Development & SEO Ranking Agency',
    description:
      'High-performance Next.js web engineering and Google search ranking domination.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'ApexWebSync',
    image: 'https://apexwebsync.vercel.app/logo.png',
    url: 'https://apexwebsync.vercel.app',
    slogan: 'Build Develop and Grow',
    description:
      'Elite web development and SEO ranking agency delivering sub-second web experiences and top Google rankings.',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    knowsAbout: [
      'Web Development',
      'Search Engine Optimization',
      'Core Web Vitals',
      'Next.js',
      'Full-Stack Architecture',
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#070a12] text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
