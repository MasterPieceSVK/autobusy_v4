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

  function showPosition(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  useEffect(() => {
    if (latitude && longitude) {
      axios
        .post(
          `${baseUrl}/nearestDepartures/${longitude}/${latitude}/${earlier}`
        )
        .then((data) => {
          setNearestDepartures(data.data);
          console.log(data.data);
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
      axios
        .post(
          `${baseUrl}/nearestDepartures/${longitude}/${latitude}/${earlier}`
        )
        .then((data) => {
          setNearestDepartures(data.data);
          console.log(data.data);
        });
    }
  }, [earlier]);

  return (
    <div>
      {/* <h1 className="text-3xl"> Welcome</h1>
      {latitude && <h1>{latitude}</h1>}
      {longitude && <h1>{longitude}</h1>} */}

      <div className="flex justify-center flex-col items-center">
        {nearestDepartures && (
          <Departures
            departures={nearestDepartures}
            setNearestDepartures={setNearestDepartures}
            handleEarlierClick={handleEarlierClick}
          />
        )}
      </div>
    </div>
  );
}

// useEffect(() => {
//   console.log(latitude);
//   console.log(longitude);
//   axios
//     .post(`http://localhost:5000/nearestStop/${latitude}/${longitude}`)
//     .then((data) => console.log(data.data));
// }, [latitude]);
