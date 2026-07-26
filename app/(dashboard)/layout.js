import DashboardLayout from "@/components/layout/DashboardLayout";
import AuthGuard from "@/components/auth/AuthGuard";
import { LinksProvider } from "@/context/LinksContext";
import { DashboardProvider } from "@/context/DashboardContext";

export default function DashboardGroupLayout({ children }) {
  return (
    <AuthGuard>
      <LinksProvider>
        <DashboardProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </DashboardProvider>
      </LinksProvider>
    </AuthGuard>
  );
}
