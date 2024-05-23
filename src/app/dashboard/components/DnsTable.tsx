"use client";

import { DNSRecord } from "@/utils/DNSRecords";
import DataTable, { TableColumn } from "react-data-table-component";

const columns: TableColumn<DNSRecord>[] = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Content (IPv4)",
    selector: (row) => row.content,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: "User",
    selector: (row) => row.username,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.description,
    sortable: true,
  },
  {
    name: "Proxied",
    selector: (row) => JSON.stringify(row.proxied),
    sortable: true,
  },
];

export default function DnsTable({ data }: { data: DNSRecord[] }) {
  return (
    <div className="p-2 rounded-md bg-white">
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        customStyles={{
          cells: {
            style: {
              "&:hover": {
                cursor: "pointer",
              },
            },
          },
        }}
      />
    </div>
  );
}
