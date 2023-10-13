import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from './components/navbar';
import './global.css'

export const metadata = {
  title: 'Carallel'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <div>
            <Navbar />
            <main>{children}</main>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
