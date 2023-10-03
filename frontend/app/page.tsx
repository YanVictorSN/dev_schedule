import Link from 'next/link';
import './global.css';

import { Button } from '@nextui-org/button';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Link href={'/users'}>Contatos</Link>
      <Button color="primary">Button</Button>
    </div>
  );
}
