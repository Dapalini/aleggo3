import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initialUserValues, IUser } from '@/types/userTypes';

interface UserContextType {
  userData: IUser;
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  id: string | string[];
  children: ReactNode;
}

export const UserProvider = ({ id, children }: UserProviderProps) => {
  const [userData, setUserData] = useState<IUser>(initialUserValues);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (id === "new") {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
        }
        const user = await response.json();
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    if (id && id !== "new") {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [id]);

  console.log("This is the user data", userData);

  return (
    <UserContext.Provider value={{ userData, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

