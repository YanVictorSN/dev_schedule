import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agenda Dev',
  description: 'Uma agenda de última geração.',
};

// app/layout.tsx
import { Providers } from './providers';
import NavBar from './(components)/NavBarlLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head></head>
      <body>
        <NavBar></NavBar>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
