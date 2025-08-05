import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ReactQueryProvider from "./query-provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager Pro",
  description: "Professional task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistMono.className} antialiased bg-[#171717] text-white min-h-screen`}
      >
        <ReactQueryProvider>
          {children}
          <Toaster
            position="bottom-right"
            richColors
            visibleToasts={5}
            closeButton={true}
            theme="dark"
          />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
