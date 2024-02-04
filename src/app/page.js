"use client";
import Departures from "@/components/Departures";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [nearestDepartures, setNearestDepartures] = useState();

  function showPosition(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  useEffect(() => {
    if (latitude && longitude) {
      axios
        .post(
          `http://localhost:5000/nearestDepartures/${longitude}/${latitude}`
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
