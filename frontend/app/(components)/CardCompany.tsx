"use client";
import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";
import WhatsAppWeb from "./WhatsAPI";
import ModalEditCompany from "./ModalEditCompany";
import DeleteCompany from "./DeleteCompany";
import Map from "../(components)/Map";
interface CardCompanyProps {
  legal_name: string;
  trade_name: string;
  email: string;
  cnpj: string;
  contact_person: string;
  whatsapp: string;
  phone: string;
  zip_code: string;
  address: string;
  city: string;
  state: string;
  complement: string;
  logo_url: string;
  id: string;
}

export default function CardCompany({
  legal_name,
  trade_name,
  email,
  cnpj,
  contact_person,
  logo_url,
  phone,
  id,
  address,
  complement,
  city,
  state,
  zip_code,
}: CardCompanyProps) {
  return (
    <Card className="flex py-4 justify-center decoration-stone-700">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={logo_url}
        />
        <p className="text-tiny uppercase font-bold">{legal_name}</p>
        <p className="text-tiny uppercase font-bold">{trade_name}</p>
        <p className="text-tiny uppercase font-bold">{email}</p>
        <p className="text-tiny uppercase font-bold">{cnpj}</p>
        <p className="text-tiny uppercase font-bold">{contact_person}</p>
      </CardHeader>
      <CardBody className=" flex py-2 items-center">
        <Map props={{ address, complement, city, state, zip_code }}></Map>
      </CardBody>
      <CardFooter className="flexend gap-1">
        <ModalEditCompany id={id}></ModalEditCompany>
        <DeleteCompany id={id}></DeleteCompany>
        <WhatsAppWeb phone={phone}></WhatsAppWeb>
      </CardFooter>
    </Card>
  );
}
