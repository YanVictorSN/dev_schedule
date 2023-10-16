import { Button } from "@nextui-org/react";
import useSWRMutation from "swr/mutation";

async function sendRequest(url: string, { arg }: { arg: { id: string } }) {
  await fetch(`${url}/${arg.id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

export default function DeleteCompany({ id }: { id: string }) {
  const { trigger, isMutating } = useSWRMutation(
    "https://backend-dev-schedule.vercel.app/companies",
    sendRequest
  );

  const handleDelete = async () => {
    try {
      const result = await trigger({ id: id });
    } catch (e) {}
  };

  return (
    <>
      <Button
        disabled={isMutating}
        onClick={handleDelete}
        color="danger"
        variant="bordered"
      >
        Deletar
      </Button>
    </>
  );
}
