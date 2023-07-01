import { format } from "date-fns";

import { BillboardClient } from "./components/billboard-client";
import { BillboardColumn } from "./components/columns";

import prismadb from "@/lib/prismadb";

export default async function BillboardsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yy"),
  }));

  return <BillboardClient data={formattedBillboards} />;
}
