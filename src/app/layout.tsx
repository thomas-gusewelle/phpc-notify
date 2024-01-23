'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { WebSocketProvider } from "@/providers/webSocket";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <WebSocketProvider>
        <body className={inter.className}>
          <div className={"min-h-screen py-6 px-3"}>{children}</div>
        </body>
      </WebSocketProvider>
    </html>
  );
}
