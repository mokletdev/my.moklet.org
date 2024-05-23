import { getDNSRecords } from "@/utils/DNSRecords";
import { H2 } from "../components/ui/text";
import DnsTable from "./components/DnsTable";

export default async function Dashboard() {
  const response = await getDNSRecords();
  const domains = response.result;

  return (
    <>
      <div className="w-full flex items-center justify-between my-12">
        <H2>DNS Records List</H2>
      </div>
      <DnsTable data={domains} />
    </>
  );
}
