import type { Metadata } from "next";
import { Share_Tech } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./components/NextAuthProvider";
import Header from "./components/parts/header";

const shareTech = Share_Tech({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Moklet Domains",
  description:
    "Moklet Domains is an initiative by SMK Telkom Malang to provide every student with a unique .my.moklet.org domain. This helps students create a professional online presence, showcase their projects, and enhance their digital skills",
  authors: { name: "MokletDev", url: "https://dev.moklet.org" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={shareTech.className + " px-5 md:px-48 bg-zinc-900"}>
        <NextAuthProvider basePath="/auth" refetchOnWindowFocus>
          <main className="block w-full max-w-[1992px] mx-auto py-24">
            <Header />
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
