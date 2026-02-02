"use client";
import NewChat from "@/components/chat/newchat";
import ChatRow from "@/components/chat/chatrow";
import {
  SidebarMenu,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Chat } from "@/drizzle/schema";
import { redirect } from "next/navigation";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const createNewChat = async () => {
    const newChatId = await axios.get("/api/chat/createNewChat");
    redirect(`/chat/${newChatId.data.id}`);
  };

  const {
    data: chats,
    error,
    isLoading,
  } = useSWR<Chat[]>("/api/chat/fetchChats", fetcher);

  return (
    <Sidebar {...props} variant="floating">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>New Chat</SidebarGroupLabel>
          <SidebarGroupContent>
            <NewChat create={createNewChat} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex-1">
              <div className="flex flex-col space-y-2 my-2">
                {/* {loading && (
                  <div className="animate-pulse text-center text-white">
                    <p>Loading Chats...</p>
                  </div>
                )} */}
                {chats?.map((chat) => (
                  <SidebarMenu key={chat.id}>
                    <SidebarMenuButton asChild>
                      <ChatRow chat={chat} />
                    </SidebarMenuButton>
                  </SidebarMenu>
                ))}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter>
        <SidebarMenu className="items-center justify-center">
          {session && <SignOut />}
        </SidebarMenu>
      </SidebarFooter> */}
    </Sidebar>
  );
};

export default AppSidebar;
