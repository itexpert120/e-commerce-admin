import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import Navbar from "@/components/navbar";

import prismadb from "@/lib/prismadb";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

export async function generateMetadata({
  params,
}: {
  params: { storeId: string };
}) {
  const id = params.storeId;

  const store = await prismadb.store.findFirst({
    where: {
      id,
    },
  });

  return {
    title: store?.name,
  };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="flex flex-col">
          <div className="flex-1 space-y-4 p-6">{children}</div>
        </div>
      </div>
    </>
  );
}
