"use client";
import React from "react";
import { useState } from "react";
import "../../global.css";
import useSWRMutation from "swr/mutation";

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  ModalHeader,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";

async function getUser(url: string) {
  await fetch(url, {
    method: "GET",
  });
}

export default function RegisterUSer() {
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthdate: "",
    gender: "",
    occupation: "",
    company: "",
    whatsapp: "",
    phone: "",
    zip_code: "",
    address: "",
    city: "",
    state: "",
    complement: "",
    photo_url: "",
  });

  const [phoneWhatsApp, setWhatsAppNumber] = useState("");
  const formatWhatsAppNumber = (input: string) => {
    const value = input.replace(/\D/g, "");

    let formattedValue = "";

    if (value.length > 0) {
      formattedValue = "(";

      if (value.length <= 2) {
        formattedValue += value;
      } else if (value.length <= 7) {
        formattedValue += `${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        formattedValue += `${value.slice(0, 2)}) ${value.slice(
          2,
          7
        )}-${value.slice(7, 11)}`;
      }
    }

    setWhatsAppNumber(formattedValue);
    setFormData({
      ...formData,
      whatsapp: value,
    });
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const formatPhoneNumber = (input: string) => {
    const value = input.replace(/\D/g, "");

    let formattedValue = "";

    if (value.length > 0) {
      formattedValue = "(";

      if (value.length <= 2) {
        formattedValue += value;
      } else if (value.length <= 7) {
        formattedValue += `${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        formattedValue += `${value.slice(0, 2)}) ${value.slice(
          2,
          7
        )}-${value.slice(7, 11)}`;
      }
    }

    setPhoneNumber(formattedValue);
    setFormData({
      ...formData,
      phone: value,
    });
  };

  const [formattedZipCode, setFormattedZipCode] = useState("");
  const formatZipCode = (input: string) => {
    const value = input.replace(/\D/g, "");

    let formattedValue = "";

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

  const clearMessage = () => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  let formUpload = new FormData();

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];

    formData.photo_url = file.name;

    if (!file) {
      setMessage("Nenhum arquivo selecionado");
      clearMessage();
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      if (reader.result) {
        setMessage("Foto carregada com sucesso, faça o upload.");
        clearMessage();
        formUpload = new FormData();
        formUpload.append("file", file);
      } else {
        setMessage("Não foi possível ler o arquivo.");
        clearMessage();
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleUpload = async () => {
    const response = await fetch(
      "https://backend-dev-schedule.vercel.app/upload",
      {
        method: "POST",
        body: formUpload,
        mode: "no-cors",
      }
    );

    if (response.ok) {
      setMessage("Upload da imagem concluído.");
    } else {
      console.error("Erro ao enviar arquivo:", response.statusText);
    }
  };

  const { trigger } = useSWRMutation(
    "https://backend-dev-schedule.vercel.app/users",
    getUser
  );
  const handleSubmit = async (onClose: any) => {
    const isEmptyField = Object.values(formData).some((value) => value === "");

    if (isEmptyField) {
      setMessage("Por favor, preencha todos os dados.");
      clearMessage();
      return;
    }
    try {
      const res = await fetch("https://backend-dev-schedule.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        mode: "no-cors",
      });

      if (res.status == 201) {
        setFormData({
          name: "",
          email: "",
          birthdate: "",
          gender: "",
          occupation: "",
          company: "",
          whatsapp: "",
          phone: "",
          zip_code: "",
          address: "",
          city: "",
          state: "",
          complement: "",
          photo_url: "",
        });

        setMessage("Contato adicionado com sucesso!");
        clearMessage();
        onClose();
      }

      trigger();
    } catch (error: any) {
      setMessage("Erro ao enviar dados: " + error.message);
      clearMessage();
    }
  };

  return (
    <>
      <Button onPress={onOpen}>Cadastrar Contato</Button>
      <Modal size={"2xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
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
                    placeholder="email@email.com"
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
                    placeholder="Insira seu gênero."
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
                    placeholder="Insira sua profissão."
                    size="sm"
                    value={formData.occupation}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="company"
                    label="Empresa"
                    placeholder="Insira a empresa que você trabalha."
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
                    placeholder="(xx) xxxxx-xxxx"
                    size="sm"
                    onChange={(e) => {
                      handleInputChange(e);
                      formatWhatsAppNumber(e.target.value);
                    }}
                    value={phoneWhatsApp}
                  />
                  <Input
                    type="text"
                    name="phone"
                    label="Celular"
                    placeholder="(xx) xxxxx-xxxx"
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
                    placeholder="xxxxx-xxx"
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
                    placeholder="Rua, Logradouro, etc."
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
                    Upload
                  </Button>
                </div>
              </ModalBody>
              <div className="flex justify-center">{<p>{message}</p>}</div>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button color="primary" onPress={() => handleSubmit(onClose)}>
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
