import Image from "next/image";
import { P } from "../ui/text";
import { Link } from "../ui/button";

export default function Header() {
  return (
    <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
      <Link
        href={"/"}
        className="fixed group left-0 top-0 flex w-full justify-center border-b bg-gradient-to-b pb-6 pt-8 font-bold backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30"
      >
        <P className="group-hover:text-zinc-900">Moklet Domains</P>
      </Link>
      <div className="fixed bottom-0 left-0 flex h-32 w-full items-end justify-center bg-gradient-to-t from-zinc-900 via-zinc-900 lg:static lg:size-auto lg:bg-none">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://dev.moklet.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <P>By </P>
          <Image
            src="/logo.jpeg"
            alt="MokletDev Logo"
            className="transition-all duration-300 rounded-lg hover:rounded-none w-8 h-8 md:w-16 md:h-16"
            width={100}
            height={24}
            priority
          />
        </a>
      </div>
    </div>
  );
}
