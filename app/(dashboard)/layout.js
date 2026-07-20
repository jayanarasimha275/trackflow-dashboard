import DashboardLayout from "@/components/layout/DashboardLayout";
import AuthGuard from "@/components/auth/AuthGuard";
import { LinksProvider } from "@/context/LinksContext";

export default function DashboardGroupLayout({ children }) {
  return (
    <AuthGuard>
      <LinksProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </LinksProvider>
    </AuthGuard>
  );
}
