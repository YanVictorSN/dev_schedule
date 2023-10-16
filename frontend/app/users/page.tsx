"use client";

import useSWR from "swr";
import Modaltest from "./register/ModalRegisterUser";
import CardUser from "../(components)/CardUser";
import SearchBar from "../(components)/SearchBar";
import { useState } from "react";

interface Card {
  card: string;
  name: string;
  email: string;
  gender: string;
  public_url: string;
  phone: string;
  id: string;
  address: string;
  complement: string;
  city: string;
  state: string;
  zip_code: string;
}

const fetcher = (url: any) => fetch(url).then((res) => res.json());
export default function Contacts() {
  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useSWR("https://backend-dev-schedule.vercel.app/users", fetcher);

  const {
    data: postaData,
    // error: postaError,
    // isLoading: isPostaLoading,
  } = useSWR("https://backend-dev-schedule.vercel.app/images", fetcher);

  if (userData && postaData) {
    userData.forEach((element: any) => {
      postaData.map((item: any) => {
        if (element.photo_url === item.name)
          element.public_url = item.url.publicUrl;
      });
    });
  }

  const [searchText, setSearchText] = useState("");

  if (userError) return <div>Falha em carregar</div>;
  if (isUserLoading) return <div>Carregando...</div>;

  const filteredContacts = userData.filter((contact: Card) =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="flex flex-col  justify-stretch gap-4">
      <div className="flex justify-center">
        <SearchBar onSearch={setSearchText}></SearchBar>
      </div>
      <div className="flex justify-center">
        <Modaltest></Modaltest>
      </div>
      <div className="flex gap-4 px-4 py-4">
        {filteredContacts.map((card: Card, index: number) => (
          <CardUser
            name={card.name}
            email={card.email}
            public_url={card.public_url}
            gender={card.gender}
            phone={card.phone}
            key={index}
            id={card.id}
            address={card.address}
            complement={card.complement}
            city={card.city}
            state={card.state}
            zip_code={card.zip_code}
          ></CardUser>
        ))}{" "}
      </div>
    </div>
  );
}
