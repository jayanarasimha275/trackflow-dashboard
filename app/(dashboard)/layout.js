import DashboardLayout from "@/components/layout/DashboardLayout";
import AuthGuard from "@/components/auth/AuthGuard";

import { LinksProvider } from "@/context/LinksContext";
import { DashboardProvider } from "@/context/DashboardContext";
import { CampaignProvider } from "@/context/CampaignContext";

export default function DashboardGroupLayout({ children }) {
  return (
    <AuthGuard>
      <LinksProvider>
        <DashboardProvider>
          <CampaignProvider>
            <DashboardLayout>{children}</DashboardLayout>
          </CampaignProvider>
        </DashboardProvider>
      </LinksProvider>
    </AuthGuard>
  );
}
