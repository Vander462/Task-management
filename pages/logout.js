import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      router.replace('/login'); // prefer `replace` to avoid back navigation to protected routes
    }
  }, [router]);

  return <p>Logging out...</p>;
}
