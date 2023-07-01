import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

export default async function BillboardPage({
  params,
}: {
  params: { billboardId: string };
}) {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return <BillboardForm initialData={billboard} />;
}
