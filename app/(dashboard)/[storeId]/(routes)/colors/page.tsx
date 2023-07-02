import { format } from "date-fns";

import { ColorClient } from "./components/client";
import { ColorColumn } from "./components/columns";

import prismadb from "@/lib/prismadb";

export default async function ColorPage({
  params,
}: {
  params: { storeId: string };
}) {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yy"),
  }));

  return <ColorClient data={formattedColors} />;
}
