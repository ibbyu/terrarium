"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { createNewModSchema } from '@/core/validation/mod';
import { toast } from 'sonner';

const NewModForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const form = useForm<z.infer<typeof createNewModSchema>>({
    resolver: zodResolver(createNewModSchema),
    defaultValues: {
      name: "",
      summary: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof createNewModSchema>) => {
    setLoading(true);

    try {
      const response = await fetch("/api/mods", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          'content-type': 'application/json',
        }
      });
      
      const data = await response.json() as { message: string, slug: string }
      
      if (response.ok) {
        toast.success(data.message);
        router.push(`/dashboard/${data.slug}`);
        router.refresh();
      }
      else {
        setMessage(data.message);
      }
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col justify-center gap-4'>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete='off'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='w-full flex justify-end'>
          <Button>{loading ? <Loader2 className='animate-spin' /> : "Create mod"}</Button>
        </div>
        {message && <div className='w-full flex justify-center items-center'><span className='text-red-600 font-bold'>{message}</span></div>}
      </form>
    </Form>
  );
}

export default NewModForm;