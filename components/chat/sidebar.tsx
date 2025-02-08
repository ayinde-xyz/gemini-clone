"use client";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import React from "react";
import NewChat from "@/components/chat/newchat";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
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
import { UserButton } from "./user-button";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { data: session } = useSession();
  const [chats, loading] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.id!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <Sidebar {...props} variant="floating">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>New Chat</SidebarGroupLabel>
          <SidebarGroupContent>
            <NewChat />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex-1">
              <div className="flex flex-col space-y-2 my-2">
                {loading && (
                  <div className="animate-pulse text-center text-white">
                    <p>Loading Chats...</p>
                  </div>
                )}
                {chats?.docs.map((chat) => (
                  <SidebarMenu key={chat.id}>
                    <SidebarMenuButton asChild>
                      <ChatRow key={chat.id} id={chat.id} />
                    </SidebarMenuButton>
                  </SidebarMenu>
                ))}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="items-center justify-center">
          {session && <UserButton session={session} />}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
