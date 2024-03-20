import React from 'react';
import { notFound } from 'next/navigation';
import { getModBySlug } from '@/core/persistence/mod';
import UpdateDescriptionForm from './_components/update-description-form';

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const mod = await getModBySlug(params.slug);

  return {
    title: `${mod?.name} - Description - Terrarium`
  };
}

const DescriptionPage = async ({ params }: Props) => {
  const mod = await getModBySlug(params.slug);

  if (!mod) {
    notFound();
  }

  return (
    <>
      <h1 className='text-2xl'>Description</h1>
      <div className='flex flex-col gap-4'>
        <UpdateDescriptionForm modId={mod.id} description={mod.description ?? undefined} />
      </div>
    </>
  );
}

export default DescriptionPage;