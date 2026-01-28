import AppSidebar from "@/components/chat/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div>
          {children}
          <Toaster />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ChatLayout;
