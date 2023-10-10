'use client';
import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from '@nextui-org/react';
import WhatsAppWeb from './WhatsAPI';
import ModalEditCompany from './ModalEditCompany';
import DeleteCompany from './DeleteCompany';
import Map from '../(components)/Map';
interface CardCompanyProps {
  name: string;
  email: string;
  gender: string;
  phone: string;
  imageSrc: string;
  id: string;
  address: string;
  complement: string;
  city: string;
  state: string;
  zip_code: string;
}

export default function CardCompany({
  name,
  email,
  gender,
  phone,
  imageSrc,
  id,
  address,
  complement,
  city,
  state,
  zip_code,
}: CardCompanyProps) {
  return (
    <Card className="flex flex-col py-4 justify-center w-2xl decoration-stone-700">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{name}</p>
        <p className="text-tiny uppercase font-bold">{email}</p>
        <p className="text-tiny uppercase font-bold">{gender}</p>
        <p className="text-tiny uppercase font-bold">{phone}</p>
      </CardHeader>
      <CardBody className=" flex py-2 justify-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={imageSrc}
        />
      </CardBody>
      <Map props={{ address, complement, city, state, zip_code }}></Map>
      <CardFooter className="flexend">
        <ModalEditCompany id={id}></ModalEditCompany>
        <DeleteCompany id={id}></DeleteCompany>
        <WhatsAppWeb phone={phone}></WhatsAppWeb>
      </CardFooter>
    </Card>
  );
}
