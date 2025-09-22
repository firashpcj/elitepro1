import React, { useState } from 'react';
import { QuoteCreator } from './pages/QuoteCreator';
import { ProfileManager } from './pages/ProfileManager';
import { Page } from './types';
import { BuildingOffice2Icon, DocumentTextIcon, SparklesIcon } from './components/icons/Icons';
import { LoginPage } from './pages/LoginPage';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState<Page>(Page.QUOTE_CREATOR);

  const navItemClasses = (page: Page) =>
    `flex items-center px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-all duration-200 ${
      activePage === page
        ? 'bg-primary text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
    }`;

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setActivePage(Page.QUOTE_CREATOR); 
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-800">
                Elite<span className="text-primary">pro</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="flex items-center space-x-2 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setActivePage(Page.QUOTE_CREATOR)}
                  className={navItemClasses(Page.QUOTE_CREATOR)}
                >
                  <DocumentTextIcon className="h-5 w-5 mr-2" />
                  Quote Creator
                </button>
                <button
                  onClick={() => setActivePage(Page.PROFILE_MANAGER)}
                  className={navItemClasses(Page.PROFILE_MANAGER)}
                >
                  <BuildingOffice2Icon className="h-5 w-5 mr-2" />
                  Profile Manager
                </button>
              </nav>
              <Button variant="secondary" onClick={handleLogout}>
                  Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {activePage === Page.QUOTE_CREATOR && <QuoteCreator />}
        {activePage === Page.PROFILE_MANAGER && <ProfileManager />}
      </main>
      <footer className="text-center py-4 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Elitepro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;