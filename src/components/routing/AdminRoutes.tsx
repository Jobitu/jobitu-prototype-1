import { EnhancedAdminPanel } from "../EnhancedAdminPanel";
import { AdminPanel } from "../AdminPanel";
import { PageType } from "../../types/app";

interface AdminRoutesProps {
  currentPage: PageType;
  onBackToLanding: () => void;
}

export function AdminRoutes({ currentPage, onBackToLanding }: AdminRoutesProps) {
  switch (currentPage) {
    case 'enhancedAdminPanel':
      return (
        <EnhancedAdminPanel
          onBack={onBackToLanding}
        />
      );

    case 'adminPanel':
      return (
        <AdminPanel 
          onBack={onBackToLanding}
        />
      );

    default:
      return null;
  }
}