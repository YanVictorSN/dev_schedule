"use client";
import React from "react";
import { useState, useEffect } from "react";
import "../../app/global.css";
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

async function getCompany(url: string) {
  await fetch(url, {
    method: "GET",
  });
}

export default function ModalEditCompany({ id }: { id: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    legal_name: "",
    trade_name: "",
    email: "",
    cnpj: "",
    contact_person: "",
    whatsapp: "",
    phone: "",
    zip_code: "",
    address: "",
    city: "",
    state: "",
    complement: "",
    logo_url: "",
  });

  useEffect(() => {
    if (isOpen && id) {
      fetchDataModalOpen(id);
    }
  }, [isOpen, id]);

  const fetchDataModalOpen = async (idCompany: string) => {
    try {
      const response = await fetch(
        `https://vercel.com/yanvictorsns-projects/backend-dev-schedule/companies/${idCompany}`
      );
      const data = await response.json();

      if (data.whatsapp) {
        formatWhatsAppNumber(data.whatsapp);
      }
      if (data.cnpj) {
        formatCNPJ(data.cnpj);
      }
      if (data.phone) {
        formatPhoneNumber(data.phone);
      }
      if (data.zip_code) {
        formatZipCode(data.zip_code);
      }

      setFormData(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

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

  const [cnpj, setCNPJ] = useState("");

  const formatCNPJ = (input: string) => {
    const value = input.replace(/\D/g, "");

    let formattedValue = "";

    if (value.length > 0) {
      formattedValue = value.slice(0, 2) + ".";

      if (value.length <= 5) {
        formattedValue += value.slice(2);
      } else if (value.length <= 8) {
        formattedValue += value.slice(2, 5) + "." + value.slice(5);
      } else if (value.length <= 12) {
        formattedValue +=
          value.slice(2, 5) + "." + value.slice(5, 8) + "/" + value.slice(8);
      }
    }

    setCNPJ(formattedValue);
    setFormData({
      ...formData,
      cnpj: value,
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

  let formUpload = new FormData();

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];

    formData.logo_url = file.name;

    if (!file) {
      console.error("Nenhum arquivo selecionado");
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      if (reader.result) {
        setMessage("Leitura do arquivo bem-sucedida:");
        formUpload = new FormData();
        formUpload.append("file", file);
      } else {
        setMessage("Não foi possível ler a mensagem.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleUpload = async () => {
    const response = await fetch(
      "https://vercel.com/yanvictorsns-projects/backend-dev-scheduleupload",
      {
        method: "POST",
        body: formUpload,
      }
    );

    if (response.ok) {
      setMessage("Arquivo enviado com sucesso");
    } else {
      console.error("Erro ao enviar arquivo:", response.statusText);
    }
  };

  const [message, setMessage] = useState("");
  const { trigger } = useSWRMutation(
    "https://vercel.com/yanvictorsns-projects/backend-dev-schedule/companies",
    getCompany
  );
  const handleSubmit = async (idCompany: string, onClose: any) => {
    const isEmptyField = Object.values(formData).some((value) => value === "");

    if (isEmptyField) {
      setMessage("Por favor, preencha todos os dados.");
      return;
    }
    try {
      const res = await fetch(`https://vercel.com/yanvictorsns-projects/backend-dev-schedule/companies/${idCompany}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.status == 200) {
        setMessage("Contato editado com sucesso!");
        setTimeout(() => {
          onClose();
        }, 2000);
      }
      trigger();
    } catch (error: any) {
      setMessage("Erro ao enviar dados: " + error.message);
    }
  };

  return (
    <>
      <Button color="primary" variant="solid" onPress={onOpen}>
        Editar
      </Button>
      <Modal size={"2xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar Empresa
              </ModalHeader>
              <ModalBody className="flex gap-0">
                <div className="flex py-2 px-1 space-x-1 gap-4">
                  <Input
                    size="sm"
                    type="text"
                    name="legal_name"
                    label="Razão Social"
                    placeholder="Insira a razão social"
                    value={formData.legal_name}
                    isInvalid={false}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="trade_name"
                    label="Nome Fantasia"
                    placeholder="Insira o nome fantasia"
                    size="sm"
                    value={formData.trade_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex py-2 px-1 space-x-1 gap-4">
                  <Input
                    type="email"
                    name="email"
                    label="E-mail"
                    placeholder="empresa@empresa.com"
                    size="sm"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="contact_person"
                    label="Responsável"
                    placeholder="Insira o responsável"
                    size="sm"
                    value={formData.contact_person}
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
                    label="Telefone"
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
                    type="text"
                    name="cnpj"
                    label="CNPJ"
                    placeholder="Insira o CNPJ da empresa."
                    size="sm"
                    value={cnpj}
                    onChange={(e) => {
                      handleInputChange(e);
                      formatCNPJ(e.target.value);
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
