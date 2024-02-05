export default function Result({ result, getDeparturesByStopId }) {
  if (result.stop_id > 0) {
    return (
      <button
        className="btn btn-outline btn-neutral"
        value={result.stop_id}
        onClick={getDeparturesByStopId}
      >
        {result.stop_name}
      </button>
    );
  }
}
