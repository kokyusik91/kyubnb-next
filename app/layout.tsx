import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import NavBar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import Modal from './components/modals/Modal';
import RegisterModal from './components/modals/RegisterModal';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <RegisterModal />
          {/* <Modal actionLabel='Submit' title='hello world' isOpen={true} /> */}
          <NavBar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
