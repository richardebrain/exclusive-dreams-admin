import { Inter } from "next/font/google";
import "../globals.css";
import DesktopSidebar from "@/components/layouts/DesktopSidebar";
import MobileSidebar from "@/components/layouts/MobileSidebar";
import ProviderWrapper from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

const seo = {
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
      <head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <ProviderWrapper>
          <DesktopSidebar />
          <MobileSidebar />
          <main className="py-10 lg:pl-72">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </ProviderWrapper>
      </body>
    </html>
  );
}
