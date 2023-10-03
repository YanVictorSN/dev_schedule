'use client';
import React from 'react';
import { useState } from 'react';

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { Input } from '@nextui-org/react';

export default function Modaltest() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    dataNascimento: '',
    genero: '',
    profissao: '',
    empresa: '',
    whatsapp: '',
    celular: '',
    cep: '',
    endereco: '',
    uf: '',
    cidade: '',
    complemento: '',
    foto: null,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      foto: file,
    });
  };

  const handleSubmit = () => {
    console.log('Dados do formulário:', formData);
  };

  return (
    <>
      <Button onPress={onOpen}>Cadastrar Contato</Button>
      <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex gap-0">
                <div className="flex py-2 px-1 space-x-1 ">
                  <Input
                    type="text"
                    name="nome"
                    label="Nome"
                    placeholder="Insira aqui seu nome"
                    labelPlacement="outside"
                    value={formData.nome}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex py-2 px-1 space-x-1 ">
                  <Input
                    type="text"
                    name="dataNascimento"
                    label="Data de Nascimento"
                    placeholder="00-00-00000"
                    labelPlacement="outside"
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="genero"
                    label="Gênero"
                    placeholder="Digite aqui o seu gênero."
                    labelPlacement="outside"
                    value={formData.genero}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex py-2 px-1 space-x-1 ">
                  <Input
                    type="text"
                    name="profissao"
                    label="Profissão"
                    placeholder="Digite aqui sua profissão."
                    labelPlacement="outside"
                    value={formData.profissao}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="empresa"
                    label="Empresa"
                    placeholder="Digite aqui a empresa que você trabalha."
                    labelPlacement="outside"
                    value={formData.empresa}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex py-2 px-1 space-x-1 ">
                  <Input
                    type="text"
                    name="whatsapp"
                    label="WhatsApp"
                    placeholder="WhatsApp"
                    labelPlacement="outside"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="celular"
                    label="Celular"
                    placeholder="Celular"
                    labelPlacement="outside"
                    value={formData.celular}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex py-2 px-1 space-x-1 ">
                  <Input
                    className="w-2/5"
                    type="text"
                    name="cep"
                    label="CEP"
                    placeholder="CEP"
                    labelPlacement="outside"
                    value={formData.cep}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="endereco"
                    label="Endereço"
                    placeholder="(DDD) 9 Dígitos"
                    labelPlacement="outside"
                    value={formData.endereco}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex py-2 px-1 space-x-1 ">
                  <Input
                    className="w-2/6"
                    type="text"
                    name="uf"
                    label="UF"
                    placeholder="UF"
                    labelPlacement="outside"
                    value={formData.uf}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="cidade"
                    label="Cidade"
                    placeholder="Cidade"
                    labelPlacement="outside"
                    value={formData.cidade}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="complemento"
                    label="Complemento"
                    placeholder="Complemento"
                    labelPlacement="outside"
                    value={formData.complemento}
                    onChange={handleInputChange}
                  />
                </div>
                <Input
                  type="file"
                  name="foto"
                  label="Foto"
                  placeholder="Foto"
                  labelPlacement="outside"
                  onChange={handleFileChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
