import DashboardLayout from "@/components/layout/DashboardLayout";
import { LinksProvider } from "@/context/LinksContext";

export default function DashboardGroupLayout({ children }) {
  return (
    <LinksProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </LinksProvider>
  );
}