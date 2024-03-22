"use client";
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";

import { updateModEnvironmentSchema } from '@/core/validation/mod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type EnvironmentType, Environments } from '@/core/entities/environment';

interface Props {
  modId: string;
  environment?: EnvironmentType;
}

const UpdateModSideForm = ({ modId, environment }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof updateModEnvironmentSchema>>({
    resolver: zodResolver(updateModEnvironmentSchema),
    defaultValues: {
      environment
    },
  })

  const onSubmit = async (values: z.infer<typeof updateModEnvironmentSchema>) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/mods/${modId}/environment`, {
        method: "PATCH",
        body: JSON.stringify(values)
      });

      const { message } = await response.json() as { message: string };

      if (response.ok) {
        toast.success(message);
        router.refresh();
      }
      else {
        toast.error(message);
      }
    }
    catch (e) {
      console.error(e);
      toast.error('Something went wrong');
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="environment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Environment</FormLabel>
              <FormControl>
                <Select value={field.value} name={field.name} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue onBlur={field.onBlur} ref={field.ref} placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    {Environments.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button disabled={form.watch("environment") === environment}>{loading ? <Loader2 className='animate-spin' /> : "Save"}</Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateModSideForm;