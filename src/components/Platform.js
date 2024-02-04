export default function Platform({
  platformNo,
  filterDeparturesByPlatform,
  activePlatform,
}) {
  console.log(activePlatform);

  return (
    <button
      className={`btn ${
        activePlatform == platformNo
          ? "btn-accent border-neutral border-2"
          : "btn-primary"
      }`}
      onClick={filterDeparturesByPlatform}
      value={platformNo}
    >
      {platformNo}
    </button>
  );
}
