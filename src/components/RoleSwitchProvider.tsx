import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  currentCompanyId?: string;
}

interface Company {
  id: string;
  name: string;
  logo: string;
  role: 'admin' | 'member';
}

type UserType = 'candidate' | 'employer' | 'admin';

interface RoleSwitchContextType {
  user: User;
  companies: Company[];
  currentRole: UserType;
  isAuthenticated: boolean;
  navigationHistory: string[];
  login: (userData: User, role: UserType) => void;
  logout: () => void;
  switchRole: (role: UserType) => void;
  switchCompany: (companyId: string) => void;
  addCompany: (company: Company) => void;
  addToHistory: (page: string) => void;
  goBack: () => string | null;
}

const RoleSwitchContext = createContext<RoleSwitchContextType | undefined>(undefined);

const defaultUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
  currentCompanyId: 'techflow-inc'
};

const defaultCompanies: Company[] = [
  {
    id: 'techflow-inc',
    name: 'TechFlow Inc.',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop',
    role: 'admin'
  },
  {
    id: 'innovate-labs',
    name: 'Innovate Labs',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
    role: 'member'
  }
];

interface RoleSwitchProviderProps {
  children: ReactNode;
}

export function RoleSwitchProvider({ children }: RoleSwitchProviderProps) {
  const [user, setUser] = useState<User>(defaultUser);
  const [companies, setCompanies] = useState<Company[]>(defaultCompanies);
  const [currentRole, setCurrentRole] = useState<UserType>('candidate');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);

  const addToHistory = useCallback((page: string) => {
    setNavigationHistory(prev => {
      // Prevent adding the same page twice in a row
      if (prev.length > 0 && prev[prev.length - 1] === page) {
        return prev;
      }
      const newHistory = [...prev, page];
      // Keep only last 10 pages for performance
      return newHistory.slice(-10);
    });
  }, []);

  const goBack = useCallback((): string | null => {
    let result: string | null = null;
    setNavigationHistory(prev => {
      if (prev.length > 1) {
        const newHistory = [...prev];
        newHistory.pop(); // Remove current page
        result = newHistory[newHistory.length - 1] || null;
        return newHistory;
      }
      return prev;
    });
    return result;
  }, []);

  const login = useCallback((userData: User, role: UserType) => {
    setUser(userData);
    setCurrentRole(role);
    setIsAuthenticated(true);
    setNavigationHistory([]); // Reset history on login
    
    // If logging in as employer and has companies, set current company
    if (role === 'employer' && companies.length > 0) {
      setUser(prev => ({ ...prev, currentCompanyId: companies[0].id }));
    }
  }, [companies]);

  const logout = useCallback(() => {
    setUser(defaultUser);
    setCurrentRole('candidate');
    setIsAuthenticated(false);
    setNavigationHistory([]);
  }, []);

  const switchRole = useCallback((role: UserType) => {
    setCurrentRole(role);
    
    // When switching to employer role, ensure we have a current company
    if (role === 'employer' && companies.length > 0) {
      setUser(prev => ({ ...prev, currentCompanyId: companies[0].id }));
    }
    
    // Trigger navigation change by dispatching a custom event
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('roleSwitch', { 
        detail: { 
          newRole: role,
          // Always redirect to employerHome for employer role (never employerDashboard)
          targetPage: role === 'employer' ? 'employerHome' : 
                     role === 'candidate' ? 'dashboard' : 
                     'enhancedAdminPanel'
        } 
      }));
    }, 0);
  }, [companies]);

  const switchCompany = useCallback((companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (company) {
      setUser(prev => ({ ...prev, currentCompanyId: companyId }));
      
      // Always navigate to employerHome when switching companies
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('companySwitch', { 
          detail: { 
            companyId,
            targetPage: 'employerHome'  // Fixed: always employerHome, never employerDashboard
          } 
        }));
      }, 0);
    }
  }, [companies]);

  const addCompany = useCallback((company: Company) => {
    setCompanies(prev => [...prev, company]);
    setUser(prev => ({ ...prev, currentCompanyId: company.id }));
  }, []);

  return (
    <RoleSwitchContext.Provider value={{
      user,
      companies,
      currentRole,
      isAuthenticated,
      navigationHistory,
      login,
      logout,
      switchRole,
      switchCompany,
      addCompany,
      addToHistory,
      goBack
    }}>
      {children}
    </RoleSwitchContext.Provider>
  );
}

export function useRoleSwitch() {
  const context = useContext(RoleSwitchContext);
  if (context === undefined) {
    throw new Error('useRoleSwitch must be used within a RoleSwitchProvider');
  }
  return context;
}