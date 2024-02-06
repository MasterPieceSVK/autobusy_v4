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
      setLoading(true);
      axios.post(`${baseUrl}/stopsById/${stopId}/${earlier}`).then((data) => {
        setNearestDepartures(data.data.PlannedDepartures);
        console.log(data.data.PlannedDepartures);
        setLoading(false);
      });
    }
  }, [earlier]);
  async function handleNearestStopClick(e) {
    setStopId(e.target.value);
  }

  useEffect(() => {
    if (stopId) {
      setLoading(true);
      axios.post(`${baseUrl}/stopsById/${stopId}/${earlier}`).then((data) => {
        setLoading(false);
        setNearestDepartures(data.data.PlannedDepartures);
      });
    }
  }, [stopId]);

  useEffect(() => {
    if (nearestStops && nearestStops[0] && nearestStops[0].StopID) {
      const stopId = nearestStops[0].StopID;
      setStopId(stopId);
      console.log(stopId);
    }
  }, [nearestStops]);

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

        {loading ? (
          <EosIconsThreeDotsLoading />
        ) : (
          nearestDepartures && (
            <Departures
              departures={nearestDepartures}
              setNearestDepartures={setNearestDepartures}
              handleEarlierClick={handleEarlierClick}
              loading={loading}
              setEarlier={setEarlier}
              earlier={earlier}
            />
          )
        )}
      </div>
    </div>
  );
}
