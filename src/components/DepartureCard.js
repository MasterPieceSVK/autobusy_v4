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
    <div className="card w-96 bg-primary text-primary-content my-4 border-neutral border-[1px]">
      <div className="card-body flex flex-col items-center">
        <h3 className="text-2xl">
          {convertToHHMM(departure.PlannedDepartureTime)}
        </h3>

        <h2 className="card-title text-center">
          {departure.TimeTableTrip.TimeTableLine.Line}:{" "}
          {departure.TimeTableTrip.Destination}
        </h2>
        <p className="text-xl font-bold">Delay: {departure.DelayMinutes} min</p>
        {/* <div className="card-actions justify-end">
          <button className="btn">Buy Now</button>
        </div> */}
      </div>
    </div>
  );
}
