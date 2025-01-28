import { useState, useEffect } from 'react';

interface User {
  id: string;
  role: 'user' | 'organizer';
  name: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      try {
        // In production, this would be a real API call
        const mockUser: User = {
          id: '1',
          role: 'organizer',
          name: 'John Doe'
        };
        
        setUser(mockUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, loading };
};