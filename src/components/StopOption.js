import Link from "next/link";

export default function StopOption({ result }) {
  if (result.stop_id > 0) {
    return (
      <Link
        href={`/search/${result.stop_id}`}
        className="min-w-11/12 text-center"
      >
        <button
          className="btn btn-outline btn-accent w-3/4"
          value={result.stop_id}
        >
          {result.stop_name}
        </button>
      </Link>
    );
  }
}
