// using modal provider to help with hydration error

"use client";

import { useState, useEffect } from "react";

import { StoreModal } from "@/components/modals/store-modal";

export function ModalProvider() {
  // create a global state for server to follow
  const [isMounted, setIsMounted] = useState(false);

  // mount the modal on each render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // if it is not mounted, return nothing
  if (!isMounted) {
    return null;
  }

  // return the modal if it is mounted
  return <StoreModal />;
}
