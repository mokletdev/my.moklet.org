import type { Metadata } from "next";
import { Share_Tech } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./components/NextAuthProvider";
import Header from "./components/parts/header";
import { Toaster } from "react-hot-toast";

const shareTech = Share_Tech({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Moklet Domains",
  description:
    "Moklet Domains is an initiative by MokletDEv to provide every student with a unique *-my.moklet.org domain. This helps students create a professional online presence, showcase their projects, and enhance their digital skills",
  authors: [
    { name: "Kusindra Aji Rabbany", url: "https://benspace.xyz/" },
    { name: "Ahsan Awadullah Azizan", url: "https://ahsanzizan.xyz" },
  ],
  applicationName: "Moklet Domains",
  creator: "MokletDev Team",
  publisher: "MokletDev",
  keywords: ["domain", "free", "moklet", "malang", "smk"],
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
            <Toaster />
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
