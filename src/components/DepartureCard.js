export default function DepartureCard({ departure }) {
  function convertToHHMM(timeString) {
    let date = new Date(timeString);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Pad the minutes and hours with zeros if they are single digits
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes;
  }
  return (
    <div
      className={`card w-96  bg-primary  text-primary-content my-1 border-neutral border-[1px]`}
    >
      <div className="card-body flex  flex-col items-center gap-1">
        <div className="flex  justify-center gap-32">
          <h3
            className={`text-2xl ${
              departure.DelayMinutes >= 1 ? "text-red-600" : "text-green-500"
            }`}
          >
            {convertToHHMM(departure.PlannedDepartureTime)}
          </h3>
        </div>
        <h2 className="card-title">
          {departure.TimeTableTrip.TimeTableLine.Line}
        </h2>
        <h2 className="card-title">{departure.TimeTableTrip.Destination}</h2>
        {departure.DelayMinutes > 1 && (
          <p className={`text-xl font-bold text-red-600`}>
            Delay: {departure.DelayMinutes} min
          </p>
        )}
      </div>
    </div>
  );
}
