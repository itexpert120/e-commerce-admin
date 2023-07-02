"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  // create a global state for server to follow
  const [isMounted, setIsMounted] = useState(false);

  // mount the modal on each render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  // if it is not mounted, return nothing
  if (!isMounted) {
    return null;
  }

  return (
    <div className="mb-4 flex flex-col gap-4">
      <div className="flex gap-x-2">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              sizes="100%"
              style={{ objectFit: "cover" }}
              src={url}
              alt="billboard image"
            />
          </div>
        ))}
      </div>
      <div className="max-w-[200px]">
        <CldUploadWidget onUpload={onUpload} uploadPreset="oulut7iu">
          {({ open }) => {
            const onClick = () => {
              open();
            };

            return (
              <Button
                type="button"
                disabled={disabled}
                variant="secondary"
                onClick={onClick}
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                Upload an image
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
}
