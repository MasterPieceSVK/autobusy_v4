"use client";
import Link from "next/link";

import Departures from "@/components/Departures";
import EosIconsThreeDotsLoading from "@/components/LoadingAnimation";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import Result from "@/components/Result";
import StopOption from "@/components/StopOption";

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
      setLoading(true);
      axios
        .post(`${baseUrl}/nearestStop/${longitude}/${latitude}`)
        // .post(`api/nearestStops/${longitude}/${latitude}`)

        .then((data) => {
          console.log(data.data);
          setNearestStops(data.data);
          console.log(data.data);
          setLoading(false);
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
      axios
        .post(`${baseUrl}/stopsById/${stopId}/${earlier}`)
        // axios
        //   .post(`/api/departuresByStopId/${stopId}/${earlier}`)

        .then((data) => {
          setNearestDepartures(data.data.PlannedDepartures);
          console.log(data.data.PlannedDepartures);
          setLoading(false);
        });
    }
  }, [earlier]);
  async function handleNearestStopClick(e) {
    const stopId = e.target.value;
    // redirect(307, `/search/${stopId}`);
    // setStopId(e.target.value);
    console.log(e.target.value);
  }

  useEffect(() => {
    if (stopId) {
      setLoading(true);
      axios
        .post(`${baseUrl}/stopsById/${stopId}/${earlier}`)
        // axios
        //   .post(`/api/departuresByStopId/${stopId}/${earlier}`)
        .then((data) => {
          setLoading(false);
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
      {!latitude ? (
        <div className="h-screen">
          <h1 className="text-center font-medium">
            Location not available <br></br>
            <br></br>
            <br></br> In Apple phones go to settings -&gt; Location Services
            -&gt; Safari (Websites) -&gt; Set it to &quot;While Using the
            App&quot;{" "}
          </h1>
        </div>
      ) : (
        nearestStops && (
          <div>
            <div className="flex justify-center flex-col items-center bg-secondary rounded-xl p-3 m-1">
              <h1 className="text-2xl mb-3 font-medium text-white">
                Nearest Stops
              </h1>
              <div className="flex flex-col w-[96%] max-w-96 rounded-2xl p-3 overflow-auto bg-primary gap-1">
                {nearestStops.map(async (stop, i) => {
                  const result = {
                    stop_name: stop.StopName,
                    stop_id: stop.StopID,
                  };
                  return <StopOption result={result} key={i}></StopOption>;
                })}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
