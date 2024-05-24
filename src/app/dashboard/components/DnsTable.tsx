"use client";

import { Button } from "@/app/components/ui/button";
import { Checkbox, Input, Select } from "@/app/components/ui/input";
import { DNSRecordProps } from "@/utils/DNSRecords";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { deleteDNSAction, upsertDNSAction } from "../actions";

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

export default function DnsTable({ data }: { data: DNSRecordProps[] }) {
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  async function deleteRecord(id: string) {
    if (!confirm("Are you sure to delete this record?")) return;
    const toastId = toast.loading("Loading...");
    const action = await deleteDNSAction(id);

    if (!action.success) toast.error(action.errors[0].message, { id: toastId });
    else {
      toast.success("Successfully deleted record", { id: toastId });
      window.location.reload();
    }
  }

  async function upsertRecord(data: FormData, id?: string) {
    const toastId = toast.loading("Loading...");
    let action = await upsertDNSAction(data, id);

    if (!action.success) toast.error(action.errors[0].message, { id: toastId });
    else {
      toast.success(`Successfully ${id ? "updated" : "created"} record`, {
        id: toastId,
      });
      window.location.reload();
    }
  }

  return (
    <div className="p-2 rounded-md bg-white">
      <Button onClick={() => setShowAdd(!showAdd)} variant={"delete"}>
        Add record
      </Button>
      {showAdd && (
        <form
          action={(formData) => {
            upsertRecord(formData);
          }}
        >
          <Input
            label="Name"
            name="name"
            placeholder="e.g: john (for john.my.moklet.org)"
            required
          />
          <Input
            label="Content"
            name="content"
            placeholder="e.g: 1.1.1.1 (IPv4 address)"
            required
          />
          <Input
            label="Description"
            name="description"
            placeholder="e.g: John's domain"
            required
          />
          <Select
            label="Type"
            name="type"
            options={[
              { label: "A", value: "A" },
              { label: "CNAME", value: "CNAME" },
            ]}
          />
          <Checkbox label="Proxied" name="proxied" />
          <div className="flex items-center gap-5 mt-4">
            <Button variant={"success"}>Save</Button>
          </div>
        </form>
      )}
      {!loading && (
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          expandableRows
          expandableRowsComponent={({ data }) => (
            <form
              action={(formData) => {
                upsertRecord(formData, data.id);
              }}
            >
              <Input
                label="Name"
                name="name"
                defaultValue={data.name.replace(".my.moklet.org", "")}
                required
              />
              <Input
                label="Content"
                name="content"
                defaultValue={data.content}
                required
              />
              <Input
                label="Description"
                name="description"
                defaultValue={data.description}
                required
              />
              <Select
                label="Type"
                name="type"
                options={[
                  { label: "A", value: "A" },
                  { label: "CNAME", value: "CNAME" },
                ]}
                defaultValue={data.type}
              />
              <Checkbox
                label="Proxied"
                name="proxied"
                defaultChecked={data.proxied}
              />
              <div className="flex items-center gap-5 mt-4">
                <Button variant={"success"}>Save</Button>
                <Button
                  variant={"delete"}
                  onClick={() => deleteRecord(data.id)}
                  type="button"
                >
                  Delete
                </Button>
              </div>
            </form>
          )}
        />
      )}
    </div>
  );
}
