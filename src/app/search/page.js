"use client";

import Departures from "@/components/Departures";
import Result from "@/components/Result";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const baseUrl = "https://autobusyv3-backend.onrender.com";

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

  let timeoutId = null;

  function searchStops(e) {
    let search = e.target.value;
    if (search == "") {
      setDatalist();
    }
    search = search.split(" ").join("+");
    if (search) {
      // Clear the timeout if it's already set.
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a new timeout to call the API after 200ms
      timeoutId = setTimeout(() => {
        axios
          .post(`${baseUrl}/searchStops/${search}/${longitude}/${latitude}`)
          // axios
          //   .post(`/api/searchStops/${search}/${longitude}/${latitude}`)
          .then((data) => {
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
      }, 200);
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
      <div className="flex flex-col items-center ">
        <div className="bg-primary p-3 rounded-xl w-[300px] flex flex-col items-center">
          <input
            type="text"
            placeholder="Name of Stop"
            className="input input-bordered input-primary w-full max-w-xs  mb-5 text-center"
            onChange={searchStops}
            onClick={(e) => (e.target.value = "")}
          />
          {datalist && (
            <div className="flex flex-col w-[96%] max-h-80 overflow-auto">
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
