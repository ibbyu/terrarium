import React from 'react';
import { notFound } from 'next/navigation';

import { getModBySlug } from '@/core/persistence/mod';
import UpdateModSummaryCard from './_components/update-mod-summary-card';
import DeleteModCard from './_components/delete-mod-card';

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const mod = await getModBySlug(params.slug);

  return {
    title: `${mod?.name} - Settings - Terarium`
  };
}

const SettingsPage = async ({ params }: Props) => {
  const mod = await getModBySlug(params.slug);

  if (!mod) {
    notFound();
  }

  return (
    <>
      <h1 className='text-2xl'>Settings</h1>
      <UpdateModSummaryCard modId={mod.id} summary={mod.summary} />
      <div className='flex flex-col gap-4 pt-6'>
        <DeleteModCard modId={mod.id} />
      </div>
    </>
  );
}

export default SettingsPage;