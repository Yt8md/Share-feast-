
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Donation, Notification, UserRole, DonationStatus, Category, ItemCondition } from '../types';

interface AppContextType {
  currentUser: User | null;
  donations: Donation[];
  notifications: Notification[];
  login: (email: string) => boolean;
  signup: (userData: any) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  addDonation: (donation: Omit<Donation, 'id' | 'status' | 'createdAt' | 'donorId' | 'donorName' | 'city'>) => void;
  requestCollection: (donationId: string) => void;
  handleRequest: (donationId: string, accept: boolean) => void;
  markNotificationRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const MOCK_DONATIONS: Donation[] = [
  {
    id: '1',
    donorId: 'd1',
    donorName: 'Sarah Jenkins',
    category: Category.FOOD,
    itemName: 'Fresh Homemade Pasta',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800',
    quantity: 'Feeds 4 people',
    condition: ItemCondition.FRESH,
    city: 'San Francisco',
    status: DonationStatus.AVAILABLE,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    donorId: 'd2',
    donorName: 'Mike Ross',
    category: Category.CLOTHES,
    itemName: 'Winter Jackets (Set of 3)',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&q=80&w=800',
    condition: ItemCondition.GOOD,
    city: 'New York',
    status: DonationStatus.AVAILABLE,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    donorId: 'd1',
    donorName: 'Sarah Jenkins',
    category: Category.FURNITURE,
    itemName: 'Small Dining Table',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800',
    condition: ItemCondition.USED,
    city: 'San Francisco',
    status: DonationStatus.AVAILABLE,
    createdAt: new Date().toISOString()
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [donations, setDonations] = useState<Donation[]>(MOCK_DONATIONS);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Simulation of "real-time" notifications
  const addNotification = (userId: string, title: string, message: string, type: 'REQUEST' | 'ACCEPTANCE' | 'SYSTEM') => {
    const newNotif: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const login = (email: string) => {
    // Mock login
    const user: User = {
      id: 'u123',
      fullName: 'John Doe',
      email: email,
      mobile: '+1 234 567 890',
      city: 'San Francisco',
      state: 'CA',
      locality: 'Mission District',
      address: '123 Kindness Lane',
      role: null // User will select role after first login/signup
    };
    setCurrentUser(user);
    return true;
  };

  const signup = (userData: any) => {
    setCurrentUser({
      ...userData,
      id: 'u' + Math.random().toString(36).substr(2, 5),
      role: null
    });
  };

  const logout = () => setCurrentUser(null);

  const setRole = (role: UserRole) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, role });
    }
  };

  const addDonation = (data: any) => {
    if (!currentUser) return;
    const newDonation: Donation = {
      ...data,
      id: 'don-' + Math.random().toString(36).substr(2, 5),
      donorId: currentUser.id,
      donorName: currentUser.fullName,
      city: currentUser.city,
      status: DonationStatus.AVAILABLE,
      createdAt: new Date().toISOString()
    };
    setDonations(prev => [newDonation, ...prev]);
  };

  const requestCollection = (donationId: string) => {
    if (!currentUser) return;
    setDonations(prev => prev.map(d => {
      if (d.id === donationId) {
        // Find donor and notify them
        addNotification(
          d.donorId,
          'New Collection Request!',
          `${currentUser.fullName} wants to collect your ${d.itemName}.`,
          'REQUEST'
        );
        return { ...d, status: DonationStatus.REQUESTED, requestedBy: currentUser.id };
      }
      return d;
    }));
  };

  const handleRequest = (donationId: string, accept: boolean) => {
    setDonations(prev => prev.map(d => {
      if (d.id === donationId && d.requestedBy) {
        if (accept) {
          addNotification(
            d.requestedBy,
            'Request Accepted!',
            `Donor accepted your request for ${d.itemName}. Please collect the item soon.`,
            'ACCEPTANCE'
          );
          return { ...d, status: DonationStatus.ACCEPTED, acceptedBy: d.requestedBy };
        } else {
          return { ...d, status: DonationStatus.AVAILABLE, requestedBy: undefined };
        }
      }
      return d;
    }));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider value={{
      currentUser, donations, notifications,
      login, signup, logout, setRole,
      addDonation, requestCollection, handleRequest,
      markNotificationRead
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
