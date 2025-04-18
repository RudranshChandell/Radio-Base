// hooks/useAuth.ts
import { useEffect, useState } from 'react';

export default function useAuth() {
  const [auth, setAuth] = useState({ loading: true, authenticated: false, user: null });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/authenticated`, {
      credentials: 'include', // 🔥 important: sends the session cookie
    })
      .then(res => res.json())
      .then(data => {
        setAuth({
          loading: false,
          authenticated: data.authenticated,
          user: data.user,
        });
      })
      .catch(() => {
        setAuth({ loading: false, authenticated: false, user: null });
      });
  }, []);

  return auth;
}
