"use client"
import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { uploadImageSchema } from '@/core/validation/mod';
import { UploadButton } from '@/lib/uploadthing';

interface Props {
  modId: string;
}

const UploadModImageForm = ({ modId }: Props) => {
  const form = useForm<z.infer<typeof uploadImageSchema>>({
    resolver: zodResolver(uploadImageSchema),
    defaultValues: {
      title: "",
      imageUrl: ""
    },
  });

  const onSubmit = (values: z.infer<typeof uploadImageSchema>) => {
    alert("hi")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="imageUrl"
          render={() => (
            <FormItem>
              <FormControl>
                <UploadButton
                  endpoint="modImageUploader"
                  onClientUploadComplete={(res) => {
                    if (res[0]?.url) {
                      form.setValue("imageUrl", res[0]?.url);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
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
        <Button type="submit" disabled={!form.watch("title") || !form.watch("imageUrl")}>Submit</Button>
      </form>
    </Form>
  );
}

export default UploadModImageForm;