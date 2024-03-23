"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

import { UploadButton } from "@/lib/uploadthing";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ModIcon from '@/components/mod-icon';

interface Props {
  modId: string;
  icon:  string | null | undefined;
}

const UpdateModIconCard = ({ modId, icon }: Props) => {
  const router = useRouter();
  const [currentIcon, setCurrentIcon] = useState(icon);

  const postClientUpload = async (url: string) => {
    try {
      const response = await fetch(`/api/mods/${modId}/icon`, {
        method: "PATCH",
        body: JSON.stringify({ icon: url })
      });
      
      const { message } = await response.json() as { message: string };

      if (response.ok) {
        setCurrentIcon(url);
        toast.success(message);
        router.refresh();
      }
      else {
        toast.error(message);
      }
    }
    catch(e) {
      console.error(e);
      toast.error('Something went wrong');
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Icon</CardTitle>
      </CardHeader>
      <CardContent className='flex items-center gap-10'>
        <ModIcon icon={currentIcon} className='w-32' />
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res[0]?.url) {
              void postClientUpload(res[0].url);
            }
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </CardContent>
    </Card>
  );
}

export default UpdateModIconCard;