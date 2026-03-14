import type { Metadata } from "next";
import "@/app/globals.css";
import { ProtectedRouteProvider } from "@/provider/protected-route-provider";

export const metadata: Metadata = {
  title: "Task Manager ICN",
  description: "Task Manager ICN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRouteProvider>{children}</ProtectedRouteProvider>;
}
