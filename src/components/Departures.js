import { useEffect, useState } from "react";
import DepartureCard from "./DepartureCard";
import Platform from "./Platform";
import EosIconsThreeDotsLoading from "./LoadingAnimation";
import NoResults from "./NoResults";

export default function Departures({
  departures,
  setNearestDepartures,
  handleEarlierClick,
  loading,
  setEarlier,
  earlier,
}) {
  const [busLines, setBusLines] = useState({});
  const [filteredDepartures, setFilteredDepartures] = useState();
  const [activePlatform, setActivePlatform] = useState("All");
  useEffect(() => {
    const newBusLines = {};
    departures.forEach((busLine) => {
      newBusLines[busLine.TimeTableTrip.TimeTableLine.Line] =
        busLine.TimeTableTrip.TimeTableLine.Line;
    });
    setBusLines(newBusLines);
  }, [departures]);

  function filterDeparturesByBusLine(e) {
    e.preventDefault();
    setActivePlatform(e.target.value);

    const busLine = e.target.value;
    if (busLine == "All") {
      setFilteredDepartures(departures);
    } else {
      const filteredDepartures = departures.filter((departure) => {
        return departure.TimeTableTrip.TimeTableLine.Line == busLine;
      });
      setFilteredDepartures(filteredDepartures);
    }
  }
  function reloadPage() {
    location.reload();
  }

  return loading ? (
    <EosIconsThreeDotsLoading />
  ) : departures.length == 0 ? (
    <div className="flex flex-col items-center mt-16">
      <NoResults />
      <h1>No results for this stop</h1>
    </div>
  ) : (
    <div>
      <div className="mt-3">
        <div className="flex mb-4 justify-center gap-5 items-center">
          {earlier == 0 ? (
            <button className="btn btn-primary" onClick={handleEarlierClick}>
              Load Earlier
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => setEarlier(0)}>
              Reset Time
            </button>
          )}
          <button className="btn btn-primary" onClick={reloadPage}>
            Refresh
          </button>
        </div>
        <h3 className="text-2xl text-center mb-3 font-bold">Lines:</h3>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            className={`btn ${
              activePlatform == "All"
                ? "btn-accent border-neutral border-2"
                : "btn-primary"
            }`}
            onClick={filterDeparturesByBusLine}
            value="All"
          >
            All
          </button>
          {Object.values(busLines).map((busLine, i) => {
            if (busLine > 0) {
              return (
                <Platform
                  key={i}
                  busLineNo={busLine}
                  filterDeparturesByBusLine={filterDeparturesByBusLine}
                  activePlatform={activePlatform}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="flex flex-col items-center mt-3">
        <h2 className="text-2xl font-bold"> Departures:</h2>
        {filteredDepartures
          ? filteredDepartures.map((departure, i) => {
              return <DepartureCard key={i} departure={departure} />;
            })
          : departures.map((departure, i) => {
              return <DepartureCard key={i} departure={departure} />;
            })}
      </div>
    </div>
  );
}
