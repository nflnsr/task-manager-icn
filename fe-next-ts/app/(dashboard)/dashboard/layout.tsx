import type { Metadata } from "next";
import "@/app/globals.css";
import { PrivateRouteProvider } from "@/provider/private-route-provider";

export const metadata: Metadata = {
  title: "Task Manager ICN",
  description: "Task Manager ICN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrivateRouteProvider>
        <main className="flex min-h-screen w-full max-w-full">
          <div className="w-full max-w-full">
            {children}
          </div>
        </main>
    </PrivateRouteProvider>
  );
}
