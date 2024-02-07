"use client";

import Stops from "@/components/stops";
import axios from "axios";
import { useEffect, useState } from "react";
const baseUrl = "https://autobusy-backend.onrender.com";

export default function Saved() {
  const [stopIds, setStopIds] = useState();
  const [stopsInfo, setStopsInfo] = useState();

  useEffect(() => {
    const stopIds = JSON.parse(localStorage.getItem("saved"));
    setStopIds(stopIds);
  }, []);

  useEffect(() => {
    if (stopIds) {
      const formattedStopIds = stopIds.join(",");
      axios.post(`${baseUrl}/stopName/${formattedStopIds}`).then((data) => {
        setStopsInfo(data.data);
      });
    }
  }, [stopIds]);

  if (!stopIds) {
    return (
      <div>
        <h1 className="text-center mt-7 px-3">
          You don't have any stops favorited
        </h1>
        <h1 className="text-center mt-2 px-3">
          Click the heart icon to favorite
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {stopsInfo &&
        stopsInfo.map((stop, i) => {
          return <Stops key={i} info={stop} />;
        })}
    </div>
  );
}
