import React from 'react'

import { getModBySlug } from '@/core/persistence/mod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const mod = await getModBySlug(params.slug);

  return {
    title: `${mod?.name} - Terrarium`
  };
}

const ModPage = async ({ params }: Props) => {
  const mod = await getModBySlug(params.slug);

  if (!mod) {
    return <div className='w-full flex h-full justify-center items-center'>Mod not found</div>;
  }

  return (
    <Card>
      <CardContent className='h-96 p-6'>
        {mod.description ?? "No description"}
      </CardContent>
    </Card>
  );
}

export default ModPage;