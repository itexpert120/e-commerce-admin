import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

export default async function CategoryPage({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return <CategoryForm billboards={billboards} initialData={category} />;
}
