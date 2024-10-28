import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '6841',
  description: 'Education Website on CTF Cryptography',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}