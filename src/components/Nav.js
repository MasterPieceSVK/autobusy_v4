import Link from "next/link";

export default function Nav() {
  return (
    <div className="navbar bg-base-100 flex justify-center">
      <Link href="/" className="btn btn-ghost text-xl">
        Nearest Stop
      </Link>
      <Link href="/search" className="btn btn-ghost text-xl">
        Search Stop
      </Link>
    </div>
  );
}
