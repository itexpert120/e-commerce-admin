import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";

export default async function SizePage({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return <SizeForm initialData={size} />;
}
