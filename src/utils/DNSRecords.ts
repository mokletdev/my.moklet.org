"use server";

import { revalidatePath } from "next/cache";

const BASE_URL = "https://api.cloudflare.com";
const authorization = {
  Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
};

interface CloudflareResponse {
  success: boolean;
  errors: string[];
  messages: string[];
  result_info: {
    page: number;
    per_page: number;
    count: number;
    total_count: number;
    total_pages: number;
  };
  result: DNSRecordProps[];
}

export const getDNSRecordsByOwner = async (
  username: string,
  page: number = 1
) => {
  const url =
    BASE_URL +
    `/client/v4/zones/${process.env.CLOUDFLARE_DOMAIN_ZONE_ID}/dns_records?comment.contains=${username}&name=contains%3A-my&page=${page}`;

  const response = await fetch(url, {
    headers: authorization,
  }).then((res) => res.json());

  const records: DNSRecordProps[] = response.result.map((record: any) => ({
    id: record.id,
    name: record.name,
    type: record.type,
    content: record.content,
    proxied: record.proxied,
    username: record.comment.split(";")[0],
    description: record.comment.split(";")[1],
  }));

  return { ...response, result: records } as CloudflareResponse;
};

export const getDNSRecords = async (filter: string = "", page: number = 1) => {
  const url =
    BASE_URL +
    `/client/v4/zones/${process.env.CLOUDFLARE_DOMAIN_ZONE_ID}/dns_records?search=${filter}&page=${page}&per_page=2000&name=contains%3A-my`;

  const response = await fetch(url, {
    headers: authorization,
  }).then((res) => res.json());

  const records = response.result.map((record: any) => ({
    id: record.id,
    name: record.name,
    type: record.type,
    content: record.content,
    proxied: record.proxied,
    username: record.comment.split(";")[0],
    description: record.comment.split(";")[1],
  }));

  return { ...response, result: records };
};

export interface DNSRecordProps {
  id: string;
  content: string;
  name: string;
  type: "A" | "CNAME";
  proxied: boolean;
  username: string;
  description: string;
}

export interface CreateDNSRecordInput {
  content: string;
  name: string;
  type: "A" | "CNAME";
  proxied: boolean;
  username: string;
  description: string;
}

export const createDNSRecord = async ({
  content,
  description,
  name,
  proxied,
  type,
  username,
}: CreateDNSRecordInput) => {
  const url =
    BASE_URL +
    `/client/v4/zones/${process.env.CLOUDFLARE_DOMAIN_ZONE_ID}/dns_records`;

  const data = {
    content,
    name: name + "-my.moklet.org",
    proxied,
    type,
    comment: username + ";" + description,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  return response;
};

export const updateDNSRecord = async (
  id: string,
  { content, description, name, proxied, type, username }: CreateDNSRecordInput
) => {
  const url =
    BASE_URL +
    `/client/v4/zones/${process.env.CLOUDFLARE_DOMAIN_ZONE_ID}/dns_records/${id}`;

  const data = {
    content,
    name: name + "-my.moklet.org",
    proxied,
    type,
    comment: username + ";" + description,
  };

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      ...authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  return response;
};

export const deleteDNSRecord = async (id: string) => {
  const url =
    BASE_URL +
    `/client/v4/zones/${process.env.CLOUDFLARE_DOMAIN_ZONE_ID}/dns_records/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: authorization,
  }).then((res) => res.json());

  revalidatePath("/records", "page");

  return response;
};
