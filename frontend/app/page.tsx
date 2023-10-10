'use client';
import React, { useEffect } from 'react';
import { Image } from '@nextui-org/react';
import './global.css';

export default function Home() {
  useEffect(() => {
    import('preline');
  }, []);

  return (
    <>
      <div className=" flex flex-col">
        <div className="flex justify-items-center w-28">
          <p>Oie</p>
        </div>
        <div className="flex-end">
          <Image
            width={500}
            height={500}
            alt="NextUI hero Image"
            src="Calendar-rafiki.svg"
          />
        </div>
      </div>
    </>
  );
}
