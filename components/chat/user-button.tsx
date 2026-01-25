"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { Session } from "next-auth";
import { DeleteIcon, LogOutIcon } from "lucide-react";
import { logout } from "@/actions/logout";
import { deleteAccount } from "@/actions/delete";
import toast from "react-hot-toast";
// import { useCurrentUser } from "@/hooks/use-current-user";
// import { LogoutButton } from "@/components/auth/logout-button";
// import { ExitIcon } from "@radix-ui/react-icons";

interface Props {
  session: Session;
}

export const UserButton = ({ session }: Props) => {
  const onDelete = async () => {
    await deleteAccount(session?.user?.id!).then((res) => {
      if (res.error) {
        toast.error(res.error);
      }
      toast.success(res.success || "Account deleted successfully!");
    });
    setTimeout(() => {
      logout();
    }, 2000);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-red-700" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28" align="center">
        <DropdownMenuItem onClick={() => logout()}>
          <LogOutIcon className="h-4 w-4 ml-2" />
          Logout
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete()}>
          <DeleteIcon className="h-4 w-4 ml-2" />
          Delete Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
