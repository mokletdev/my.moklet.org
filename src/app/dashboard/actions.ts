"use server";

import { nextGetServerSession } from "@/lib/next-auth";
import { createDNSRecord, updateDNSRecord } from "@/utils/DNSRecords";

export async function UpsertDNSAction(data: FormData, id?: string) {
  const session = await nextGetServerSession();

  let action = null;

  try {
    let body = {
      name: data.get("name") as string,
      content: data.get("content") as string,
      description: data.get("description") as string,
      type: data.get("type") as "A" | "CNAME",
      proxied: data.get("proxied") == "on",
      username: session?.user?.email.split("@")[0] as string,
    };
    if (id) {
      action = await updateDNSRecord(id, body);
    } else {
      action = await createDNSRecord(body);
    }

    return action;
  } catch (error) {
    return {
      success: false,
      errors: action.errors,
    };
  }
}
