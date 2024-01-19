import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DesktopSidebar from "@/components/layouts/DesktopSidebar";
import MobileSidebar from "@/components/layouts/MobileSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exclusive Dream",
  description: "Exclusive Dream Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DesktopSidebar />
        <MobileSidebar />
        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
