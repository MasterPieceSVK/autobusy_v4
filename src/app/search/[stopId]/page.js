"use client";
import Departures from "@/components/Departures";
import Search from "../page";
import { useEffect, useState } from "react";
import EosIconsThreeDotsLoading from "@/components/LoadingAnimation";
import axios from "axios";
const baseUrl = "https://autobusy-backend.onrender.com";

export default function StopSite({ params }) {
  const [earlier, setEarlier] = useState(0);
  const [stopId, setStopId] = useState(null);
  const [departures, setDepartures] = useState();
  const [loading, setLoading] = useState(false);

  function handleEarlierClick(e) {
    setEarlier(() => earlier + 1);
  }
  useEffect(() => {
    setStopId(() => params.stopId);
  });

  useEffect(() => {
    console.log(stopId);
    if (stopId) {
      setLoading(true);
      axios.post(`${baseUrl}/stopsById/${stopId}/0`).then((data) => {
        setDepartures(data.data.PlannedDepartures);

        console.log(data.data.PlannedDepartures);
        setLoading(false);
      });
    }
  }, [stopId]);

  useEffect(() => {
    console.log(earlier);
    console.log(stopId);

    if (stopId) {
      setLoading(true);

      axios.post(`${baseUrl}/stopsById/${stopId}/${earlier}`).then((data) => {
        setDepartures(data.data.PlannedDepartures);
        console.log(data.data.PlannedDepartures);
        setLoading(false);
      });
    }
  }, [earlier]);

  return (
    <div>
      <Search />
      {loading ? (
        <div className="flex justify-center">
          <EosIconsThreeDotsLoading />
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center">
          {departures && (
            <Departures
              departures={departures}
              setNearestDepartures={setDepartures}
              handleEarlierClick={handleEarlierClick}
              loading={loading}
              setEarlier={setEarlier}
              earlier={earlier}
            />
          )}
        </div>
      )}
    </div>
  );
}
