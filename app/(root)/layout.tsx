import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import prismadb from "@/lib/prismadb";

export const metadata: Metadata = {
  title: {
    absolute: "Admin Dashboard",
  },
};

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
