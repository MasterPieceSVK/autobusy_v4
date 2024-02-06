"use client";

import Departures from "@/components/Departures";
import Result from "@/components/Result";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const baseUrl = "https://autobusy-backend.onrender.com";

export default function Search() {
  const [datalist, setDatalist] = useState([]);
  const router = useRouter();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition);
  }, []);
  function showPosition(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  function searchStops(e) {
    let search = e.target.value;
    if (search == "") {
      setDatalist();
    }
    search = search.split(" ").join("+");
    if (search) {
      axios
        .post(`${baseUrl}/searchStops/${search}/${longitude}/${latitude}`)
        .then((data) => {
          //   setStops(data.data.Stops);
          let datalistArray = [];
          data.data.Stops.forEach((stop) => {
            const dataObject = {
              stop_id: stop.StopID,
              stop_name: stop.StopName,
            };

            datalistArray.push(dataObject);
          });
          setDatalist(datalistArray);
        });
    }
  }

  useEffect(() => {
    console.log(datalist);
  }, [datalist]);

  function getDeparturesByStopId(e) {
    router.push(`/search/${e.target.value}`);
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="bg-primary p-3 rounded-xl">
          <input
            type="text"
            placeholder="Name of Stop"
            className="input input-bordered input-primary w-full max-w-xs  mb-5"
            onChange={searchStops}
            onClick={(e) => (e.target.value = "")}
          />
          {datalist && (
            <div className="flex flex-col">
              {datalist.map((stop, index) => {
                return (
                  <Result
                    key={index}
                    result={stop}
                    getDeparturesByStopId={getDeparturesByStopId}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
