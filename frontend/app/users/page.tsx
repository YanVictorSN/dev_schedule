import Link from 'next/link';
import Modaltest from '../components/Modal';

export default async function Contacts() {
  const response = await fetch('http://localhost:3000/users');
  const contacts = await response.json();

  return (
    <div>
      <h1>Contatos</h1>
      <pre>{JSON.stringify(contacts, null, 2)}</pre>
      <Link href={'/'}>Home</Link>
      <Modaltest></Modaltest>
    </div>
  );
}
