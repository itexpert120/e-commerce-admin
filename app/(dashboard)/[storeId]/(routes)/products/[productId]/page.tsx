import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

export default async function ProductPage({
  params,
}: {
  params: { storeId: string; productId: string };
}) {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <ProductForm
      categories={categories}
      colors={colors}
      sizes={sizes}
      initialData={product}
    />
  );
}
