import React from 'react';
import { notFound } from 'next/navigation';
import UploadModImageModal from './_components/upload-mod-image-modal';
import { getModBySlug, getModBySlugWithImages } from '@/core/persistence/mod';
import ModImage from './_components/mod-image';

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const mod = await getModBySlug(params.slug);

  return {
    title: `${mod?.name} - Images - Terarium`
  };
}

const ImagesPage = async ({ params }: Props) => {
  const mod = await getModBySlugWithImages(params.slug);

  if (!mod) {
    notFound();
  }

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-2xl'>Images</h1>
        <UploadModImageModal modId={mod.id} />
      </div>
        <div className='w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6'>
          {mod.images.map(img => <ModImage key={img.id} title={img.title} imageUrl={img.url}/>)}
        </div>
    </>
  );
}

export default ImagesPage;