'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import styles from './Navbar.module.css'; // Import the CSS module

function Navbar() {
  const { user } = useUser();

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/" className={styles.mr}>Home</Link>
        <Link href="/resources" className={styles.mr}>Resources</Link>
        <Link href="/history">History</Link>
      </div>
      <div className={styles.right}>
        {user ? (
          <>
            <span className={styles.mr}>Welcome, {user.name}</span>
            <Link href="/api/auth/logout">Logout</Link>
          </>
        ) : (
          <Link href="/api/auth/login">Signup/Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
