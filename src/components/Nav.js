"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathName = usePathname();
  return (
    <div className="navbar bg-base-100  flex justify-center">
      <Link
        href="/"
        className={`btn btn-ghost text-xl" ${
          pathName.includes("search") ? "bg-base-100" : "bg-accent"
        }`}
      >
        Nearest Stop
      </Link>
      <Link
        href="/search"
        className={`btn btn-ghost text-xl" ${
          pathName.includes("search") ? "bg-accent" : "bg-base-100"
        }`}
      >
        Search Stop
      </Link>
    </div>
  );
}
