import prismadb from "@/lib/prismadb";
import { ColorForm } from "./components/color-form";

export default async function ColorPage({
  params,
}: {
  params: { storeId: string; colorId: string };
}) {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return <ColorForm initialData={color} />;
}
