import ClientProvider from "@/providers/toast-provider";
import AppSidebar from "@/components/chat/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div>
          {/* Sidebar */}

          {/* ClientProvider - Notification */}
          <ClientProvider />

          <div className="bg-[#343541] flex-1">{children}</div>

          <Toaster />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ChatLayout;
