import { useEffect, useState } from "react";
import DepartureCard from "./DepartureCard";
import Platform from "./Platform";

export default function Departures({ departures, setNearestDepartures }) {
  const [platforms, setPlatforms] = useState({});
  const [filteredDepartures, setFilteredDepartures] = useState();
  const [activePlatform, setActivePlatform] = useState("All");

  useEffect(() => {
    const newPlatforms = {};
    departures.forEach((platform) => {
      newPlatforms[platform.PlatformNumber] = platform.PlatformNumber;
    });
    setPlatforms(newPlatforms);
  }, [departures]);

  function filterDeparturesByPlatform(e) {
    e.preventDefault();
    setActivePlatform(e.target.value);

    const platform = e.target.value;
    if (platform == "All") {
      setFilteredDepartures(departures);
    } else {
      const filteredDepartures = departures.filter((departure) => {
        return departure.PlatformNumber == platform;
      });
      setFilteredDepartures(filteredDepartures);
    }
  }

  return (
    <div>
      <div className="mt-3">
        <h3 className="text-2xl text-center mb-3 font-bold">Platforms:</h3>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            className={`btn ${
              activePlatform == "All" ? "btn-secondary" : "btn-primary"
            }`}
            onClick={filterDeparturesByPlatform}
            value="All"
          >
            All
          </button>
          {Object.values(platforms).map((platform) => {
            if (platform > 0) {
              return (
                <Platform
                  platformNo={platform}
                  filterDeparturesByPlatform={filterDeparturesByPlatform}
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
          ? filteredDepartures.map((departure) => {
              return <DepartureCard departure={departure} />;
            })
          : departures.map((departure) => {
              return <DepartureCard departure={departure} />;
            })}
      </div>
    </div>
  );
}
