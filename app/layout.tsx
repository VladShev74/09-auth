import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: '--font-roboto',
  display: 'swap',
  weight: ['400', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Note Hub",
  description: "Created by VladShev74",
  metadataBase: new URL('https://notehub.app'),
  openGraph: {
    title: 'NoteHub',
    description: 'NoteHub App',
    url: '/',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub'
      },
    ],
    type: 'website',
  }
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
        suppressHydrationWarning
      >
        <TanStackProvider>
          <div className="layout-wrapper">
            <Header />
            <main className="main-content">
              {children}
            </main>
            <Footer />
          </div>
          {modal}
        </TanStackProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
