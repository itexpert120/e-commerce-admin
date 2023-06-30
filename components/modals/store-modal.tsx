"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";

import { useStoreModal } from "@/hooks/use-store-modal";

// create form schema (what we need)
// fields: name
// type: string
// requirement: 1 character
const formSchema = z.object({
  name: z.string().min(1),
});

export function StoreModal() {
  // create store modal to control the modal
  const storeModal = useStoreModal();

  // create loading state
  const [loading, setLoading] = useState(false);

  // create form resolver to check if form is filled correctly
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // handle form submit
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/stores", values);

      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      {/* Store Form */}
      <div className="pt-2">
        <Form {...form}>
          {/* Create HTML form element and pass the onsubmit to the form object */}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Create form field for name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                // Return Form for name
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="E-Commerce"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Button Controls */}
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                disabled={loading}
                variant="outline"
                onClick={storeModal.onClose}
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
