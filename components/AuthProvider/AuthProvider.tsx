'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, logout, getMe } from '@/lib/api/clientApi';
import Loader from '@/components/Loader/Loader';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  const isPrivate = pathname.startsWith('/notes') || pathname.startsWith('/profile');
  const isPrivateRef = useRef(isPrivate);

  useEffect(() => {
    checkSession()
      .then(async (isLoggedIn) => {
        if (isLoggedIn) {
          const user = await getMe();
          setUser(user);
        } else if (isPrivateRef.current) {
          logout().finally(() => {
            clearIsAuthenticated();
            router.push('/sign-in');
          });
        }
      })
      .catch(() => {
        if (isPrivateRef.current) {
          clearIsAuthenticated();
          router.push('/sign-in');
        }
      })
      .finally(() => setIsChecking(false));
  }, [clearIsAuthenticated, router, setUser]);

  if (isChecking) return <Loader />;

  if (!isAuthenticated && isPrivate) return null;

  return <>{children}</>;
}
