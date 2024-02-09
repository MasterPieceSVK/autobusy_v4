import Link from "next/link";
import { motion } from "framer-motion";

export default function Stops({ info }) {
  let lines = info.Lines.map((line) => {
    return line.Line;
  });

  lines = lines.filter((line) => {
    const numericValue = Number(line);
    return !Number.isNaN(numericValue);
  });

  lines = lines.map((line) => {
    return Number(line);
  });

  lines.sort(function (a, b) {
    return a - b;
  });

  if (lines.length > 7) {
    lines = lines.slice(0, 7);
    lines.push(" ...");
  }

  lines = lines.join(", ");

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring" }}
    >
      <Link href={`/search/${info.StopID}`}>
        <div className="card w-96  bg-primary  text-primary-content my-1 border-neutral border-[1px]">
          <div className="card-body flex  flex-col items-center gap-2">
            {/* <div className="flex  justify-center gap-32"></div> */}
            <h2 className="card-title">{info.StopName}</h2>
            <h2>{lines}</h2>
            {/* <h2 className="card-title"></h2> */}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
