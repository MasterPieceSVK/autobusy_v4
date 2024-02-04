export default function Platform({
  platformNo,
  filterDeparturesByPlatform,
  activePlatform,
}) {
  console.log(activePlatform);

  return (
    <button
      className={`btn ${
        activePlatform == platformNo ? "btn-secondary" : "btn-primary"
      }`}
      onClick={filterDeparturesByPlatform}
      value={platformNo}
    >
      {platformNo}
    </button>
  );
}
