"use client";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import React from "react";
import NewChat from "@/components/chat/newchat";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import ChatRow from "@/components/chat/chatrow";
import ModelSelection from "@/components/chat/modelselection";
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
import { logout } from "@/actions/logout";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  // console.log(chats)

  return (
    <Sidebar {...props} variant="floating">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>New Chat</SidebarGroupLabel>
          <SidebarGroupContent>
            <NewChat />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Models</SidebarGroupLabel>
          <SidebarGroupContent>
            <ModelSelection />
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
                  <SidebarMenu>
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
        <SidebarMenu>
          {session && (
            <img
              onClick={() => logout()}
              src={session.user?.image!}
              alt="profile pic"
              className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
            />
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
