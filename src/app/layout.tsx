import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL('https://apexwebsync.vercel.app'),
  title: 'ApexWebSync | Web Development & SEO Ranking Agency India | Build Develop and Grow',
  description:
    'ApexWebSync is an Indian high-performance web development and SEO ranking agency. We engineer sub-second Next.js web applications, digital menus, booking portals, and aggressive Google ranking strategies.',
  keywords: [
    'ApexWebSync',
    'Web Development Agency India',
    'SEO Ranking Agency India',
    'Next.js Developers Bengaluru Mumbai',
    'Technical SEO Services India',
    'Digital Menu WhatsApp Ordering',
    'Appointment Booking Web Design',
    'Core Web Vitals Optimization',
    'Build Develop and Grow',
  ],
  authors: [{ name: 'ApexWebSync', url: 'https://apexwebsync.vercel.app' }],
  creator: 'ApexWebSync',
  openGraph: {
    title: 'ApexWebSync | Web Development & SEO Ranking Agency India',
    description:
      'We engineer websites that dominate search results and convert visitors. Slogan: Build Develop and Grow. Contact: apexwebsync@gmail.com',
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
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexWebSync | Web Development & SEO Ranking Agency',
    description:
      'High-performance Next.js web engineering and Google search ranking domination in India and worldwide.',
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
    email: 'apexwebsync@gmail.com',
    telephone: '+919876543210',
    description:
      'Elite web development and SEO ranking agency delivering sub-second web experiences and top Google rankings.',
    priceRange: '₹3,499 - ₹89,999',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'Karnataka',
      addressLocality: 'Bengaluru',
    },
    areaServed: ['IN', 'US', 'GB', 'AE', 'Worldwide'],
    knowsAbout: [
      'Next.js Web Development',
      'Search Engine Optimization',
      'Core Web Vitals',
      'Full-Stack Architecture',
      'E-Commerce & Digital Menus',
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
      <body className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 antialiased selection:bg-cyan-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
