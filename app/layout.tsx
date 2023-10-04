import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import { Modal } from './components/modal/Modal';
import { RegisterModal } from './components/modal/RegisterModal';
import { LoginModal } from './components/modal/LoginModal';
import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modal/RentModal';
import SearchModal from './components/modal/SearchModal';

const font = Nunito({ 
  subsets: ['latin'], 
});
export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <SearchModal />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
