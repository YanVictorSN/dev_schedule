'use client';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';

export default function App() {
  return (
    <Navbar position="static">
      <NavbarBrand>
        <p className="items-center text-2xl">Agenda Dev</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" size="lg" href={'/'}>
            Início
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" size="lg" href={'users'}>
            Contatos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" size="lg" href={'birthdays'}>
            Aniversariantes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={'companies'} size="lg">
            Empresas
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <Link href={'/maps'}>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
