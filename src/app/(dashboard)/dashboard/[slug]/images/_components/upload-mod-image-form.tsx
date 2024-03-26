"use client"
import React, { useState } from 'react';
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { uploadImageSchema } from '@/core/validation/mod';
import { UploadButton } from '@/lib/uploadthing';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Props {
  modId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadModImageForm = ({ modId, setOpen }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof uploadImageSchema>>({
    resolver: zodResolver(uploadImageSchema),
    defaultValues: {
      title: "",
      imageUrl: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof uploadImageSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/mods/${modId}/image`, {
        method: "POST",
        body: JSON.stringify(values)
      });
      
      const { message } = await response.json() as { message: string };

      if (response.ok) {
        toast.success(message);
        setOpen(false);
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
    finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {form.watch("imageUrl") && <div className='relative overflow-hidden aspect-video'>
          <Image 
            src={form.watch("imageUrl")}
            alt="mod image preview"
            fill
            style={{objectFit: "cover"}}
          />
        </div>}
        <FormField
          control={form.control}
          name="imageUrl"
          render={() => (
            <FormItem className='pt-6'>
              <FormControl>
                <UploadButton
                  endpoint="modImageUploader"
                  onClientUploadComplete={(res) => {
                    if (res[0]?.url) {
                      form.setValue("imageUrl", res[0]?.url);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    console.error(error);
                    toast.error("An error occurred uploading your image");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button disabled={!form.watch("title") || !form.watch("imageUrl")}>{loading ? <Loader2 className='animate-spin' /> : "Save"}</Button>
        </div>
      </form>
    </Form>
  );
}

export default UploadModImageForm;