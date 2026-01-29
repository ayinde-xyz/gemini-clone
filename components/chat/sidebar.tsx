import React from "react";
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
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/drizzle";
import { chat } from "@/drizzle/schema";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { getChats } from "@/actions/newchat";

const AppSidebar = async ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) {
    return notFound();
  }

  const createNewChat = async () => {
    "use server";

    if (!session) {
      redirect("/auth/signup");
    }
    const [created] = await db
      .insert(chat)
      .values({
        userId: session.user.id || "",
        title: "New Chat",
        createdAt: new Date(),
      })
      .returning({ id: chat.id });

    console.log(created);

    if (!created?.id) return;
    redirect(`/chat/${created.id}`);
  };

  // const chats = await getChats(session);
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });
  // if (!session) return notFound();
  console.log("SIDEBAR SESSION:", session);

  // const chats = await db
  //   .select()
  //   .from(chat)
  //   .where(eq(chat.userId, session.user?.id || ""));

  // console.log(chats);
  // const chats = await getDocs(
  //   query(
  //     collection(db, "users", session.user?.id!, "chats"),
  //     orderBy("createdAt", "asc"),
  //   ),
  // );

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
                {/* {chats?.map((chat) => (
                  <SidebarMenu key={chat.id}>
                    <SidebarMenuButton asChild>
                      <ChatRow key={chat.id} id={chat.id} />
                    </SidebarMenuButton>
                  </SidebarMenu>
                ))} */}
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
