
import ProviderWrapper from "@/components/Provider";
import DesktopSidebar from "@/components/layouts/DesktopSidebar";
import MobileSidebar from "@/components/layouts/MobileSidebar";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

const seo = {
  title: "Exclusive Dream",
  description: "Exclusive Dream Admin Panel",
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <ProviderWrapper>
          <main className="py-10 ">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </ProviderWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
