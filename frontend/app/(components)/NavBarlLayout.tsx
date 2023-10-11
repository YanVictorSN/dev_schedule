"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function App() {
  return (
    <Navbar position="static">
      <NavbarBrand>
        <p className="items-center text-2xl">Agenda Dev</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" size="lg" href={"/"}>
            Início
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" size="lg" href={"users"}>
            Contatos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" size="lg" href={"birthdays"}>
            Aniversariantes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={"companies"} size="lg">
            Empresas
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <Link
            as={Link}
            href="https://github.com/YanVictorSN/dev_schedule"
            target="_blank"
          >
            {" "}
            Git Hub
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="https://www.linkedin.com/in/yanvictosn/"
            target="_blank"
            variant="flat"
          >
            Linkedin
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
