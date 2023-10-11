"use client";
import useSWR from "swr";
import RegisterCompany from "./ModalRegisterCompany";
import SearchBar from "../(components)/SearchBar";
import "./../global.css";
import { useState } from "react";
import CardCompany from "../(components)/CardCompany";

interface CompanyCard {
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
const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Companies() {
  const {
    data: companyData,
    error: userError,
    isLoading: isUserLoading,
  } = useSWR("http://localhost:3001/companies", fetcher);

  const {
    data: imgData,
    // error: postaError,
    // isLoading: isPostaLoading,
  } = useSWR("http://localhost:3001/images", fetcher);

  if (companyData && imgData) {
    companyData.forEach((element: any) => {
      imgData.map((item: any) => {
        if (element.logo_url === item.name)
          element.logo_url = item.url.publicUrl;
      });
    });
  }

  const [searchText, setSearchText] = useState("");

  if (userError) return <div>Não carregou, recarrega a página.</div>;
  if (isUserLoading) return <div>Carregando...</div>;

  const filteredContacts = companyData.filter((contact: CompanyCard) =>
    contact.legal_name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="flex flex-col  justify-stretch gap-4">
      <div className="flex justify-center">
        <SearchBar onSearch={setSearchText}></SearchBar>
      </div>
      <div className="flex justify-center">
        <RegisterCompany></RegisterCompany>
      </div>
      <div className="flex gap-4 px-4 py-4">
        {filteredContacts.map((card: CompanyCard, index: number) => (
          <CardCompany
            legal_name={card.legal_name}
            trade_name={card.trade_name}
            contact_person={card.contact_person}
            email={card.email}
            whatsapp={card.whatsapp}
            logo_url={card.logo_url}
            cnpj={card.cnpj}
            phone={card.phone}
            key={index}
            id={card.id}
            address={card.address}
            complement={card.complement}
            city={card.city}
            state={card.state}
            zip_code={card.zip_code}
          ></CardCompany>
        ))}{" "}
      </div>
    </div>
  );
}
