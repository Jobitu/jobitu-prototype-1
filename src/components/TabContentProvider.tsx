import React from 'react';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface TabContentContextType {
  activeSubTab: string;
  setActiveSubTab: (tab: string) => void;
  getDefaultTab: (tabs: string[]) => string;
}

const TabContentContext = createContext<TabContentContextType | undefined>(undefined);

interface TabContentProviderProps {
  children: ReactNode;
  currentPage: string;
}

export function TabContentProvider({ children, currentPage }: TabContentProviderProps) {
  // Set default tab based on the current page
  const getInitialTab = (page: string) => {
    switch (page) {
      case 'inbox':
        return 'inbox';
      case 'employerInbox':
        return 'messages';
      case 'jobSearch':
        return 'overview';
      default:
        return 'overview';
    }
  };

  const [activeSubTab, setActiveSubTab] = useState<string>(getInitialTab(currentPage));

  const getDefaultTab = (tabs: string[]) => {
    return tabs.includes('overview') ? 'overview' : tabs[0] || 'overview';
  };

  // Update active tab when page changes
  useEffect(() => {
    setActiveSubTab(getInitialTab(currentPage));
  }, [currentPage]);

  return (
    <TabContentContext.Provider value={{
      activeSubTab,
      setActiveSubTab,
      getDefaultTab
    }}>
      {children}
    </TabContentContext.Provider>
  );
}

export function useTabContent() {
  const context = useContext(TabContentContext);
  if (context === undefined) {
    throw new Error('useTabContent must be used within a TabContentProvider');
  }
  return context;
}