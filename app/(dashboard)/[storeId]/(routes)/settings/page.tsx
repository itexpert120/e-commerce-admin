import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { SettingsForm } from "./components/settings-form";

import prismadb from "@/lib/prismadb";

interface SettingsPageProps {
  params: { storeId: string };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  // check userAuth
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // check if store exists
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  // return child
  return <SettingsForm initialData={store} />;
}
