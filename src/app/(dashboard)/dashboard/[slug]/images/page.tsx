import React from 'react';
import { notFound } from 'next/navigation';
import UploadModImageModal from './_components/upload-mod-image-modal';
import { getModBySlug, getModBySlugWithImages } from '@/core/persistence/mod';

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const mod = await getModBySlugWithImages(params.slug);

  return {
    title: `${mod?.name} - Images - Terarium`
  };
}

const ImagesPage = async ({ params }: Props) => {
  const mod = await getModBySlug(params.slug);

  if (!mod) {
    notFound();
  }

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-2xl'>Images</h1>
        <UploadModImageModal modId={mod.id} />
      </div>
    </>
  );
}

export default ImagesPage;