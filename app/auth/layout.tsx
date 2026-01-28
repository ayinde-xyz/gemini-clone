import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";

import { Megrim } from "next/font/google";
import Logo from "@/public/icon.svg";

const megrim = Megrim({
  weight: "400",
  subsets: ["latin"],
});

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-muted p-2 flex flex-col items-center justify-center">
      <Toaster />
      <div className="max-w-sm space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h1
            className={`${megrim.className} md:text-5xl text-3xl  text-center`}>
            Neuralis AI
          </h1>
          <Image alt={"Neuralis Logo"} height={30} width={30} src={Logo} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
