"use client";
import React from "react";
import { Image } from "@nextui-org/react";

import "./global.css";
import "./index.css";

export default function Home() {
  return (
    <>
      <div className="flex-col items-center">
        <div className="flex-col ">
          <h1 id="test" className="flex text-2xl ">
            Agenda Dev
          </h1>
          <h2>A melhor agenda para desenvolvedores!</h2>
        </div>
        <div>
          <Image
            width={400}
            height={400}
            alt="NextUI hero Image"
            src="Calendar-rafiki.svg"
          />
        </div>
      </div>
    </>
  );
}
