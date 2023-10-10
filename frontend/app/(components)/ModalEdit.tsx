'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import '../../app/global.css';
import useSWRMutation from 'swr/mutation';

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  ModalHeader,
} from '@nextui-org/react';
import { Input } from '@nextui-org/react';

async function getUser(url: string) {
  await fetch(url, {
    method: 'GET',
  });
}

export default function ModalEdit({ id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    name: ``,
    email: '',
    birthdate: '',
    gender: '',
    occupation: '',
    company: '',
    whatsapp: '',
    phone: '',
    zip_code: '',
    address: '',
    city: '',
    state: '',
    complement: '',
    photo_url: '',
  });

  useEffect(() => {
    if (isOpen && id) {
      fetchDataModalOpen(id);
    }
  }, [isOpen, id]);

  const fetchDataModalOpen = async (idUser) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${idUser}`);
      const data = await response.json();
      if (data.whatsapp) {
        formatWhatsAppNumber(data.whatsapp);
      }
      if (data.phone) {
        formatPhoneNumber(data.phone);
      }
      if (data.zip_code) {
        formatZipCode(data.zip_code);
      }

      setFormData(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const [phoneWhatsApp, setWhatsAppNumber] = useState('');
  const formatWhatsAppNumber = (input: string) => {
    const value = input.replace(/\D/g, '');

    let formattedValue = '';

    if (value.length > 0) {
      formattedValue = '(';

      if (value.length <= 2) {
        formattedValue += value;
      } else if (value.length <= 7) {
        formattedValue += `${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        formattedValue += `${value.slice(0, 2)}) ${value.slice(
          2,
          7,
        )}-${value.slice(7, 11)}`;
      }
    }

    setWhatsAppNumber(formattedValue);
    setFormData({
      ...formData,
      whatsapp: value,
    });
  };

  const [phoneNumber, setPhoneNumber] = useState('');
  const formatPhoneNumber = (input: string) => {
    const value = input.replace(/\D/g, '');

    let formattedValue = '';

    if (value.length > 0) {
      formattedValue = '(';

      if (value.length <= 2) {
        formattedValue += value;
      } else if (value.length <= 7) {
        formattedValue += `${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        formattedValue += `${value.slice(0, 2)}) ${value.slice(
          2,
          7,
        )}-${value.slice(7, 11)}`;
      }
    }

    setPhoneNumber(formattedValue);
    setFormData({
      ...formData,
      phone: value,
    });
  };

  const [formattedZipCode, setFormattedZipCode] = useState('');
  const formatZipCode = (input) => {
    const value = input.replace(/\D/g, '');

    let formattedValue = '';

    if (value.length > 0) {
      formattedValue = value;

      if (value.length > 5) {
        formattedValue = `${value.slice(0, 5)}-${value.slice(5)}`;
      }
    }

    setFormattedZipCode(formattedValue);
    setFormData({
      ...formData,
      zip_code: value,
    });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  let formUpload = new FormData();

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];

    formData.photo_url = file.name;

    if (!file) {
      console.error('Nenhum arquivo selecionado');
      return;
    }
    console.log(file);
    const reader = new FileReader();

    reader.onload = async () => {
      if (reader.result) {
        console.log('Leitura do arquivo bem-sucedida:', file.name);
        formUpload = new FormData();
        formUpload.append('file', file);
      } else {
        console.log('Não foi possível ler a mensagem.');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleUpload = async () => {
    const response = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formUpload,
    });

    if (response.ok) {
      console.log('Arquivo enviado com sucesso');
    } else {
      console.error('Erro ao enviar arquivo:', response.statusText);
    }
  };

  const [message, setMessage] = useState('');
  const { trigger } = useSWRMutation('http://localhost:3001/users', getUser);
  const handleSubmit = async (idUser, onClose) => {
    const isEmptyField = Object.values(formData).some((value) => value === '');
    console.log(formData);
    if (isEmptyField) {
      setMessage('Por favor, preencha todos os dados.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3001/users/${idUser}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.status == 200) {
        setMessage('Contato editado com sucesso!');
        setTimeout(() => {
          onClose();
        }, 2000);
      }
      trigger();
    } catch (error: any) {
      setMessage('Erro ao enviar dados: ' + error.message);
    }
    console.log('Dados do formulário:', formData);
  };

  return (
    <>
      <Button color="primary" variant="solid" onPress={onOpen}>
        Editar
      </Button>
      <Modal size={'2xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cadastrar Usuário
              </ModalHeader>
              <ModalBody className="flex gap-0">
                <div className="flex py-2 px-1 space-x-1 gap-4">
                  <Input
                    size="sm"
                    type="text"
                    name="name"
                    label="Nome"
                    placeholder="Insira seu nome"
                    value={formData.name}
                    isInvalid={false}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="you@example.com"
                    size="sm"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex py-2 px-1 space-x-1 gap-4">
                  <Input
                    type="date"
                    name="birthdate"
                    label="Data de Nascimento"
                    placeholder="00-00-0000"
                    size="sm"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="gender"
                    label="Gênero"
                    placeholder="Digite aqui o seu gênero."
                    size="sm"
                    value={formData.gender}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex py-2 px-1 space-x-1 gap-4">
                  <Input
                    type="text"
                    name="occupation"
                    label="Profissão"
                    placeholder="Digite aqui sua profissão."
                    size="sm"
                    value={formData.occupation}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="company"
                    label="Empresa"
                    placeholder="Digite aqui a empresa que você trabalha."
                    size="sm"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex py-2 px-1 space-x-1 gap-4">
                  <Input
                    type="text"
                    name="whatsapp"
                    label="WhatsApp"
                    placeholder="WhatsApp"
                    size="sm"
                    value={phoneWhatsApp}
                    onChange={(e) => {
                      handleInputChange(e);
                      formatWhatsAppNumber(e.target.value);
                    }}
                  />
                  <Input
                    type="text"
                    name="phone"
                    label="Celular"
                    placeholder="Celular"
                    size="sm"
                    value={phoneNumber}
                    onChange={(e) => {
                      handleInputChange(e);
                      formatPhoneNumber(e.target.value);
                    }}
                  />
                </div>
                <div className="flex py-2 px-1 space-x-1 gap-4">
                  <Input
                    className="w-2/5"
                    type="text"
                    name="zip_code"
                    label="CEP"
                    placeholder="CEP"
                    size="sm"
                    value={formattedZipCode}
                    onChange={(e) => {
                      handleInputChange(e);
                      formatZipCode(e.target.value);
                    }}
                  />
                  <Input
                    type="text"
                    name="address"
                    label="Endereço"
                    placeholder="(DDD) 9 Dígitos"
                    size="sm"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex py-2 px-1 space-x-1 gap-4">
                  <Input
                    className="w-2/6"
                    type="text"
                    name="state"
                    label="UF"
                    placeholder="UF"
                    size="sm"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="city"
                    label="Cidade"
                    placeholder="Cidade"
                    size="sm"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="complement"
                    label="Complemento"
                    placeholder="Complemento"
                    size="sm"
                    value={formData.complement}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex py-2 px-1 space-x-1 gap-4">
                  <Input
                    type="file"
                    name="photo_url"
                    label="Foto"
                    placeholder="Foto"
                    size="sm"
                    onChange={handleFileChange}
                  />
                  <Button color="success" onClick={handleUpload}>
                    Alterar foto.
                  </Button>
                </div>
              </ModalBody>
              <div className="flex justify-center">{<p>{message}</p>}</div>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleSubmit(id, onClose)}
                >
                  Cadastrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
