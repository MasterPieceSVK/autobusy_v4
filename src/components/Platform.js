export default function Platform({
  busLineNo,
  filterDeparturesByBusLine,
  activePlatform,
}) {
  return (
    <button
      className={`btn ${
        activePlatform == busLineNo
          ? "btn-accent border-neutral border-2"
          : "btn-primary"
      }`}
      onClick={filterDeparturesByBusLine}
      value={busLineNo}
    >
      {busLineNo}
    </button>
  );
}
