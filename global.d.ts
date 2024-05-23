declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      CLOUDFLARE_DOMAIN_ZONE_ID: string;
      CLOUDFLARE_API_TOKEN: string;
      APP_ENV: "development" | "staging" | "production";
      [key: string]: string | undefined;
    }
  }
}

export {};
