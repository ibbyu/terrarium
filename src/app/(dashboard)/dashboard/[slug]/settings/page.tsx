import React from 'react';
import { notFound } from 'next/navigation';

import { getModBySlug, getModBySlugWithTags } from '@/core/persistence/mod';
import UpdateModSummaryCard from './_components/update-mod-summary-card';
import DeleteModCard from './_components/delete-mod-card';
import FeatureTagsCard from './_components/feature-tags-card';
import { getFeatureTags } from '@/core/persistence/feature-tag';
import UpdateModSideCard from './_components/update-mod-side-card';
import type { ModSideType } from '@/core/entities/mod-side';

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
  const mod = await getModBySlugWithTags(params.slug);

  if (!mod) {
    notFound();
  }

  const featureTags = await getFeatureTags();

  return (
    <>
      <h1 className='text-2xl'>Settings</h1>
      <UpdateModSummaryCard modId={mod.id} summary={mod.summary} />
      <FeatureTagsCard modId={mod.id} featureTags={featureTags} activeTags={mod.featureTags} />
      <UpdateModSideCard modId={mod.id}  side={mod.side as ModSideType ?? undefined}/>
      <div className='flex flex-col gap-4 pt-6'>
        <DeleteModCard modId={mod.id}/>
      </div>
    </>
  );
}

export default SettingsPage;