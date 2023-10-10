import { Button } from '@nextui-org/react';
import { WhatsIcon } from '../(icons)/WhatsAppIcon';

export default function WhatsAppWeb({ phone }: { phone: string }) {
  const handleApi = () => {
    const whatapplink = `https://wa.me/${phone}`;
    window.open(whatapplink, '_blank');
  };

  return (
    <>
      <Button
        onClick={handleApi}
        color="success"
        startContent={<WhatsIcon />}
        variant="bordered"
      >
        WhatsApp
      </Button>
    </>
  );
}
