import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Loading.module.css';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page
    router.replace('/login');
  }, []);

  // Show loading spinner while redirecting
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
} 