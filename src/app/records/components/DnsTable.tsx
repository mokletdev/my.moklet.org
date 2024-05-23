"use client";

import { Button } from "@/app/components/ui/button";
import { Checkbox, Input, Select } from "@/app/components/ui/input";
import { DNSRecordProps } from "@/utils/DNSRecords";
import DataTable, { TableColumn } from "react-data-table-component";
import { useState, useEffect } from "react";

const columns: TableColumn<DNSRecordProps>[] = [
  {
    name: "Type",
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Content",
    selector: (row) => row.content,
    sortable: true,
  },
  {
    name: "Username",
    selector: (row) => row.username,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.description,
    sortable: true,
  },
];

export default function DnsTable({ data }: { data: DNSRecordProps[] }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="p-2 rounded-md bg-white">
      {!loading && (
        <DataTable columns={columns} data={data} pagination highlightOnHover />
      )}
    </div>
  );
}
