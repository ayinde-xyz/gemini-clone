import AppSidebar from "@/components/chat/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
};

export default ChatLayout;
