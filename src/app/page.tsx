"use client";

import Typewriter from "@/utils/typewriter";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Link } from "./components/ui/button";
import { H1, H2, H3, H4, P } from "./components/ui/text";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    new Typewriter(document.getElementById("animate-tw"), {
      strings: [
        session
          ? `${session.user?.name.split(" ")[0].toLowerCase()}.my.moklet.org`
          : null,
        "your-name.my.moklet.org",
        "project-name.moklet.org",
      ],
      autoStart: true,
      loop: true,
      delay: 100,
    });
  }, [session]);

  return (
    <>
      {status === "authenticated" && (
        <H3 className="my-5">
          You&apos;ve signed in as{" "}
          <span className="text-amber-400">{session.user?.name}</span>
        </H3>
      )}

      <div className="py-12 w-full">
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
            href={status === "authenticated" ? "/dashboard" : "/auth/signin"}
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
              <H4>1. Who is eligible for the domain?</H4>
              <P>All students of SMK Telkom Malang are eligible user.</P>
            </div>
            <div>
              <H4>2. Is the domain really free?</H4>
              <P>It is, the domain is completely free for all eligible user.</P>
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
        <div className="block mb-12">
          <H2 className="mb-6">How to Claim?</H2>
          <div className="flex flex-col gap-4">
            <div>
              <H4>1. Login using SMK Telkom Malang email</H4>
              <P>
                You have to login to the app using your SMK Telkom Malang email
                that ends with &apos;smktelkom-mlg.sch.id&apos; by pressing the
                &quot;Claim now&quot; button.
              </P>
            </div>
            <div>
              <H4>2. Go to your dashboard</H4>
              <P>
                Go to your{" "}
                <a href="/dashboard" className="text-red-500 hover:underline">
                  dashboard
                </a>{" "}
                by clicking the &quot;Manage your domain&quot; button at the
                same place as the &quot;Claim now&quot; button.
              </P>
            </div>
            <div>
              <H4>3. Create a new DNS record</H4>
              <P>
                Create a new DNS record by filling in the data needed in the DNS
                record creation process: Name, Content, Description, Type,
                Proxied.
              </P>
            </div>
          </div>
        </div>
        <div className="block">
          <H4 className="mb-1">DNS Records Moklet Domain</H4>
          <Link href={"/records"}>See Records</Link>
        </div>
      </div>
    </>
  );
}
