export default function Result({ result, getDeparturesByStopId }) {
  return (
    <button
      className="btn btn-outline btn-secondary"
      value={result.stop_id}
      onClick={getDeparturesByStopId}
    >
      {result.stop_name}
    </button>
  );
}
