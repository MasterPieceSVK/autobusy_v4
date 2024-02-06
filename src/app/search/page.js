"use client";

import Departures from "@/components/Departures";
import Result from "@/components/Result";
import axios from "axios";
import { useEffect, useState } from "react";
const baseUrl = "https://autobusy-backend.onrender.com";

export default function Search() {
  const [stops, setStops] = useState();
  const [datalist, setDatalist] = useState([]);
  const [departures, setDepartures] = useState();
  const [earlier, setEarlier] = useState(0);
  const [stopId, setStopId] = useState(null);

  const [loading, setLoading] = useState(true);

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
    console.log(e.target);
    setStopId(e.target.value);
  }

  useEffect(() => {
    if (stopId) {
      setLoading(true);
      axios.post(`${baseUrl}/stopsById/${stopId}/0`).then((data) => {
        setDepartures(data.data.PlannedDepartures);
        setDatalist();
        console.log(data.data.PlannedDepartures);
        setLoading(false);
      });
    }
  }, [stopId]);

  function handleEarlierClick(e) {
    setEarlier(() => earlier + 1);
  }

  useEffect(() => {
    console.log(earlier);
    console.log(stopId);

    if (latitude && longitude && stopId) {
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
    </div>
  );
}
