'use client';
import useSWR from 'swr';
import RegisterCompany from './ModalRegisterCompany';
import SearchBar from '../(components)/SearchBar';
import './../global.css';
import { useState } from 'react';
import CardCompany from '../(components)/CardCompany';

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Companies() {
  // interface UserData{

  // }
  const { data, error, isLoading } = useSWR(
    'http://localhost:3001/companies',
    fetcher,
  );

  const [searchText, setSearchText] = useState('');

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

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

  const filteredContacts = data.filter((contact) =>
    contact.legal_name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className="flex flex-col  justify-stretch gap-4">
      <h1>Contatos</h1>
      <div className="flex justify-center">
        <SearchBar onSearch={setSearchText}></SearchBar>
      </div>
      <div className="flex justify-center">
        <RegisterCompany></RegisterCompany>
      </div>
      <div className="flex flex-col">
        {filteredContacts.map((card: Card, index: number) => (
          <CardCompany
            name={card.name}
            email={card.email}
            imageSrc={card.public_url}
            gender={card.gender}
            phone={card.phone}
            key={index}
            id={card.id}
            address={card.address}
            complement={card.complement}
            city={card.city}
            state={card.state}
            zip_code={card.zip_code}
          ></CardCompany>
        ))}{' '}
      </div>
    </div>
  );
}
