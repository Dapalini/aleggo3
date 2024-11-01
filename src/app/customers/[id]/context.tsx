import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initialCustomerValues, ICustomer } from '@/types/customerTypes';


interface CustomerContextType {
  customerData: ICustomer;
  setCustomerData: (data: ICustomer) => void;
  loading: boolean;
  error: string | null;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};

interface CustomerProviderProps {
  id: string | string[];
  children: ReactNode;
}

export const CustomerProvider = ({ id, children }: CustomerProviderProps) => {

  const [customerData, setCustomerData] = useState<ICustomer>(initialCustomerValues);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (id === "new") {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/customers/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch customer data');
        }
        const customer = await response.json();
        setCustomerData(customer);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setError('Failed to fetch customer data');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [id]);

  return (
    <CustomerContext.Provider value={{ customerData, setCustomerData, loading, error }}>
      {children}
    </CustomerContext.Provider>
  );
};
