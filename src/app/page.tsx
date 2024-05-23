"use client";

import Typewriter from "@/utils/typewriter";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Header from "./components/parts/header";
import { Link } from "./components/ui/button";
import { H1, H2, H4, P } from "./components/ui/text";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    new Typewriter(document.getElementById("animate-tw"), {
      strings: [
        "your-name.my.moklet.org",
        "project-name.moklet.org",
        session
          ? `${session?.user?.name.split(" ")[0].toLowerCase()}.my.moklet.org`
          : null,
      ],
      autoStart: true,
      loop: true,
      delay: 100,
    });
  }, [session]);

  return (
    <main className="block w-full max-w-[1992px] mx-auto py-24">
      <Header />

      <div className="py-16 md:py-32 w-full">
        <H2 className="mb-20">
          Claim Now! <br />
          <span id="animate-tw" className="text-red-500"></span>
        </H2>
        <div className="block mb-12">
          <H1 className="mb-2">Moklet Domains</H1>
          <P>
            Moklet Domains is an initiative by MokletDev at SMK Telkom Malang to
            provide every student with a unique .my.moklet.org domain. This
            helps students at SMK Telkom Malang create a professional ondne
            presence, showcase their projects, and enhance their digital skills.
          </P>
        </div>
        <div className="block mb-12">
          <H4 className="mb-1">Grab Your Own .my.moklet.org Domain!</H4>
          <P className="mb-4">
            You can grab your own sweet-looking .my.moklet.org domain for free!
            Empower your ondne presence with a personadzed domain exclusively
            for SMK Telkom Malang students.
          </P>
          <Link
            href={
              status === "authenticated" ? "/dashboard" : "/api/auth/signin"
            }
          >
            {status === "authenticated" ? "Manage your domain" : "Claim now"}
          </Link>
        </div>
        <div className="block mb-12">
          <H4 className="mb-1">Register an Exclusive .moklet.org Domain</H4>
          <P className="mb-4">
            If you want a .moklet.org domain, please contact the developer
            directly because we only provide it to a certain user with specific
            needs.
          </P>
          <Link href={"mailto:dev@moklet.org"}>Contact dev</Link>
        </div>
        <div className="block mb-12">
          <H4 className="mb-1">Abusive Usage</H4>
          <P className="mb-4">
            If you bedeve one of the subdomains is abusing the service, please
            report it to{" "}
            <a
              href="mailto:dev@moklet.org"
              className="hover:underline text-red-500"
            >
              dev@moklet.org
            </a>
          </P>
        </div>
        <div className="block mb-12">
          <H2 className="mb-6">Frequently Asked Questions</H2>
          <div className="flex flex-col gap-4">
            <div>
              <H4>1. Who is edgible for the domains?</H4>
              <P>All students of SMK Telkom Malang are edgible user.</P>
            </div>
            <div>
              <H4>2. Is the domain really free?</H4>
              <P>It is, the domain is completely free for all edgible user.</P>
            </div>
            <div>
              <H4>3. How long can I keep the domain?</H4>
              <P>
                You can keep your domain as long as you are a student at SMK
                Telkom Malang.
              </P>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
