import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '🎂 Happy Birthday!',
  description: 'A special birthday surprise just for you!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-cream text-dark-ink overflow-x-hidden paper-texture">
        {children}
      </body>
    </html>
  );
}
