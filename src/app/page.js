"use client";
import Departures from "@/components/Departures";
import EosIconsThreeDotsLoading from "@/components/LoadingAnimation";
import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = "https://autobusy-backend.onrender.com";

export default function Home() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [nearestDepartures, setNearestDepartures] = useState();
  const [earlier, setEarlier] = useState(0);
  const [loading, setLoading] = useState(false);
  const [nearestStops, setNearestStops] = useState([]);
  const [stopId, setStopId] = useState();
  const [isFavorite, setIsFavorite] = useState(false);

  function showPosition(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  useEffect(() => {
    if (latitude && longitude) {
      // setLoading(true);
      axios
        .post(`${baseUrl}/nearestStop/${longitude}/${latitude}`)
        .then((data) => {
          setNearestStops(data.data);
          console.log(data.data);
          // setLoading(false);
        });
    }
  }, [latitude]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition);
  }, []);

  function handleEarlierClick(e) {
    setEarlier(() => earlier + 1);
  }
  useEffect(() => {
    if (latitude && longitude) {
      // setLoading(true);
      axios.post(`${baseUrl}/stopsById/${stopId}/${earlier}`).then((data) => {
        setNearestDepartures(data.data.PlannedDepartures);
        console.log(data.data.PlannedDepartures);
        // setLoading(false);
      });
    }
  }, [earlier]);
  async function handleNearestStopClick(e) {
    setStopId(e.target.value);
    console.log(e.target.value);
  }

  useEffect(() => {
    if (stopId) {
      // setLoading(true);
      axios.post(`${baseUrl}/stopsById/${stopId}/${earlier}`).then((data) => {
        // setLoading(false);
        setNearestDepartures(data.data.PlannedDepartures);
      });
    }

    const saved = JSON.parse(localStorage.getItem("saved"));
    if (saved) {
      const isInSaved = saved.map((id) => {
        if (id == stopId) {
          setIsFavorite(true);
        }
      });
      console.log(isInSaved);
      console.log(typeof saved);
    }
  }, [stopId]);

  useEffect(() => {
    if (nearestStops && nearestStops[0] && nearestStops[0].StopID) {
      const stopId = nearestStops[0].StopID;
      setStopId(stopId);
      console.log(stopId);
    }
  }, [nearestStops]);

  function saveStop(e) {
    let saved = JSON.parse(localStorage.getItem("saved"));
    if (saved) {
      saved.push(Number(stopId));
    } else {
      saved = [stopId]; // make it an array
    }
    localStorage.setItem("saved", JSON.stringify(saved));
  }

  function removeStop(e) {
    let saved = JSON.parse(localStorage.getItem("saved"));
    if (saved) {
      saved = saved.filter((id) => {
        return id != stopId;
      });
      localStorage.setItem("saved", JSON.stringify(saved));
    }
  }
  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        {nearestStops && (
          <select
            className="select select-primary w-full max-w-xs"
            onChange={handleNearestStopClick}
          >
            {nearestStops.map(async (stop, i) => {
              return (
                <option key={i} className="text-center" value={stop.StopID}>
                  {stop.StopName}
                </option>
              );
            })}
          </select>
        )}

        {nearestDepartures && (
          <Departures
            departures={nearestDepartures}
            setNearestDepartures={setNearestDepartures}
            handleEarlierClick={handleEarlierClick}
            loading={loading}
            setEarlier={setEarlier}
            earlier={earlier}
            saveStop={saveStop}
            isFavorite={isFavorite}
            removeStop={removeStop}
            setIsFavorite={setIsFavorite}
          />
        )}
      </div>
    </div>
  );
}
