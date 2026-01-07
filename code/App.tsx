
import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { UserRole } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RoleSelection from './pages/RoleSelection';
import DonorDashboard from './pages/DonorDashboard';
import SupplierDashboard from './pages/SupplierDashboard';
import PostDonation from './pages/PostDonation';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';

const AppContent: React.FC = () => {
  const { currentUser } = useApp();
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Basic Router logic
  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Auth & Role Redirection
  if (currentUser && !currentUser.role && currentPage !== 'role-selection') {
    return <RoleSelection onNavigate={navigate} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'login': return <Login onNavigate={navigate} />;
      case 'signup': return <Signup onNavigate={navigate} />;
      case 'role-selection': return <RoleSelection onNavigate={navigate} />;
      case 'donor-dashboard': return <DonorDashboard onNavigate={navigate} />;
      case 'supplier-dashboard': return <SupplierDashboard onNavigate={navigate} />;
      case 'post-donation': return <PostDonation onNavigate={navigate} />;
      case 'notifications': return <Notifications onNavigate={navigate} />;
      case 'profile': return <Profile onNavigate={navigate} />;
      case 'about': return <About onNavigate={navigate} />;
      case 'contact': return <Contact onNavigate={navigate} />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onNavigate={navigate} activePage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
