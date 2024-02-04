"use client";
import Departures from "@/components/Departures";
import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = "https://autobusyv3backend-production.up.railway.app";

export default function Home() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [nearestDepartures, setNearestDepartures] = useState();
  const [earlier, setEarlier] = useState(0);
  const [loading, setLoading] = useState(true);
  function showPosition(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  useEffect(() => {
    if (latitude && longitude) {
      setLoading(true);
      axios
        .post(
          `${baseUrl}/nearestDepartures/${longitude}/${latitude}/${earlier}`
        )
        .then((data) => {
          setNearestDepartures(data.data);
          console.log(data.data);
          setLoading(false);
        });
    }
  }, [latitude]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition);
  }, []);

  useEffect(() => {
    console.log(nearestDepartures);
  }, [nearestDepartures]);

  function handleEarlierClick(e) {
    setEarlier(() => earlier + 1);
  }

  useEffect(() => {
    if (latitude && longitude) {
      setLoading(true);
      axios
        .post(
          `${baseUrl}/nearestDepartures/${longitude}/${latitude}/${earlier}`
        )
        .then((data) => {
          setNearestDepartures(data.data);
          console.log(data.data);
          setLoading(false);
        });
    }
  }, [earlier]);

  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        {nearestDepartures && (
          <Departures
            departures={nearestDepartures}
            setNearestDepartures={setNearestDepartures}
            handleEarlierClick={handleEarlierClick}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
