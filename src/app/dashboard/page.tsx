import { nextGetServerSession } from "@/lib/next-auth";
import { getDNSRecordsByOwner } from "@/utils/DNSRecords";
import { redirect } from "next/navigation";
import { Link } from "../components/ui/button";
import { H2 } from "../components/ui/text";
import DnsTable from "./components/DnsTable";

export default async function Dashboard() {
  const session = await nextGetServerSession();
  if (!session?.user?.email) return redirect("/auth/signin");

  const response = await getDNSRecordsByOwner(session.user.email.split("@")[0]);
  const domains = response.result;

  return (
    <>
      <div className="w-full flex items-center justify-between my-12">
        <H2>Hey there, {session.user.name.split(" ")[0]}</H2>
        <Link href={"/auth/signout"}>Sign Out</Link>
      </div>
      <DnsTable data={domains} />
    </>
  );
}
