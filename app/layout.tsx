import type { Metadata } from "next";
import { Comfortaa, Roboto } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const comfortaa = Comfortaa({ subsets: ["latin"] });
const robota = Roboto({ style: "normal", weight: "400" });

export const metadata: Metadata = {
  title: "Geimini Chatbot App",
  description: "Built using Next.js and Firebase Genkit",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html suppressHydrationWarning lang="en">
        <body className={`${robota.className} antialiased`}>
          {children}
          {/* <Toaster /> */}
        </body>
      </html>
    </SessionProvider>
  );
}

// ↑ @types/node 20.17.14 → 22.13.1
// ↑ @types/react 19.0.7 → 19.0.8
// ↑ eslint 9.18.0 → 9.20.0
// ↑ eslint-config-next 15.1.5 → 15.1.6
// ↑ genkit-cli 0.9.12 → 1.0.4
// ↑ tailwindcss 3.4.17 → 4.0.4
// ↑ @genkit-ai/googleai 0.9.12 → 1.0.4
// ↑ @radix-ui/react-avatar 1.1.2 → 1.1.3
// ↑ @radix-ui/react-dialog 1.1.5 → 1.1.6
// ↑ @radix-ui/react-dropdown-menu 2.1.5 → 2.1.6
// ↑ @radix-ui/react-label 2.1.1 → 2.1.2
// ↑ @radix-ui/react-radio-group 1.2.2 → 1.2.3
// ↑ @radix-ui/react-select 2.1.4 → 2.1.6
// ↑ @radix-ui/react-separator 1.1.1 → 1.1.2
// ↑ @radix-ui/react-slot 1.1.1 → 1.1.2
// ↑ @radix-ui/react-toast 1.2.4 → 1.2.6
// ↑ @radix-ui/react-tooltip 1.1.6 → 1.1.8
// ↑ firebase 11.2.0 → 11.3.0
// ↑ genkit 0.9.12 → 1.0.4
// ↑ lucide-react 0.473.0 → 0.475.0
// ↑ next 15.1.5 → 15.1.6
// ↑ next-auth 5.0.0-beta.25 → 4.24.11
// ↑ openai 4.79.1 → 4.83.0
// ↑ swr 2.3.0 → 2.3.2
// ↑ tailwind-merge 2.6.0 → 3.0.1

// aa
//
// bbbb
