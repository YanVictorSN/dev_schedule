"use client";
import "./../global.css";
import "./../map.css";

import React, { useRef, useEffect, useState } from "react";

import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/geocoding-control/style.css";
import "@maptiler/sdk/dist/maptiler-sdk.css";

interface MapProps {
  address: string;
  city: string;
  complement: string;
  state: string;
  zip_code: string;
}

export default function Map({ props }: { props: MapProps }) {
  maptilersdk.config.apiKey = "bgiEdIClqMkJQG0a99cy";

  const query = `${props.address},${props.city},${props.complement},${props.state},${props.zip_code},`;

  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "bgiEdIClqMkJQG0a99cy";
        const apiUrl = `https://api.maptiler.com/geocoding/${query}.json?key=${apiKey}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Não foi possível obter os dados da API");
        }

        const data = await response.json();
        const center = data.features[0].center;
        setLat(center[1]);
        setLng(center[0]);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  });

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom] = useState(14);

  useEffect(() => {
    if (lng != 0 && lat !== 0) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [lng, lat],
        zoom: zoom,
      });

      new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([lng, lat])
        .addTo(map.current);
    }
  }, [lng, lat, zoom]);

  return (
    <>
      <div className="map-wrap">
        <div className="geocoding">=</div>
        <div ref={mapContainer} className="map" />
      </div>
    </>
  );
}
