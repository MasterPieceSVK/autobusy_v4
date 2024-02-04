export default function Platform({
  platformNo,
  filterDeparturesByPlatform,
  activePlatform,
}) {
  console.log(activePlatform);

  return (
    <button
      className={`btn ${
        activePlatform == platformNo ? "btn-accent" : "btn-primary"
      }`}
      onClick={filterDeparturesByPlatform}
      value={platformNo}
    >
      {platformNo}
    </button>
  );
}
