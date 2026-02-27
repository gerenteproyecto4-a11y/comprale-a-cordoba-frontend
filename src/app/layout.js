import '../styles/globals.css';
import '../index.css';
import Script from 'next/script';
import ClientProviders from '../providers/ClientProviders';

export const metadata = {
  metadataBase: new URL('https://www.compraleacordoba.com'),
  title: 'Cómprale a Córdoba',
  description: 'Conectando compradores con negocios locales del departamento de Córdoba, Colombia.',
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Cómprale a Córdoba',
    description: 'Conectando compradores con negocios locales del departamento de Córdoba, Colombia.',
    images: [
      {
        url: '/og-image.png',
        alt: 'Cómprale a Córdoba',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cómprale a Córdoba',
    description: 'Conectando compradores con negocios locales del departamento de Córdoba, Colombia.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-KYB83GH0CP" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KYB83GH0CP');
          `}
        </Script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-KYB83GH0CP" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KYB83GH0CP');
          `}
        </Script>

        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}