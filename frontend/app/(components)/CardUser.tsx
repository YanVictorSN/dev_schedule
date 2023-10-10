'use client';
import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from '@nextui-org/react';
import ModalEdit from './ModalEdit';
import DeleteUser from './DeleteUser';
import WhatsAppWeb from './WhatsAPI';
import Map from '../(components)/Map';

interface CardUserProps {
  name: string;
  email: string;
  gender: string;
  phone: string;
  public_url: string;
  id: string;
  address: string;
  complement: string;
  city: string;
  state: string;
  zip_code: string;
}

export default function CardUser({
  name,
  email,
  gender,
  phone,
  public_url,
  id,
  address,
  complement,
  city,
  state,
  zip_code,
}: CardUserProps) {
  return (
    <Card className="flex py-4 justify-center decoration-stone-700">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={public_url}
        />
        <p className="text-tiny uppercase font-bold">{name}</p>
        <p className="text-tiny uppercase font-bold">{email}</p>
        <p className="text-tiny uppercase font-bold">{gender}</p>
        <p className="text-tiny uppercase font-bold">{phone}</p>
      </CardHeader>
      <CardBody className=" flex py-2 items-center">
        <Map props={{ address, complement, city, state, zip_code }}></Map>
      </CardBody>
      <CardFooter className="flex gap-1">
        <ModalEdit id={id}></ModalEdit>
        <DeleteUser id={id}></DeleteUser>
        <WhatsAppWeb phone={phone}></WhatsAppWeb>
      </CardFooter>
    </Card>
  );
}
