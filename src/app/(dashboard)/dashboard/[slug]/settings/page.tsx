import React from 'react';
import { notFound } from 'next/navigation';

import { getModBySlug, getModBySlugWithTagsWithLinks } from '@/core/persistence/mod';
import UpdateModSummaryCard from './_components/update-mod-summary-card';
import DeleteModCard from './_components/delete-mod-card';
import FeatureTagsCard from './_components/feature-tags-card';
import { getFeatureTags } from '@/core/persistence/feature-tag';
import UpdateModSideCard from './_components/update-mod-environment-card';
import type { EnvironmentType } from '@/core/entities/environment';
import UpdateModIconCard from "./_components/update-mod-icon-card";
import UpdateModLinksCard from './_components/update-mod-links-card';

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
  const mod = await getModBySlugWithTagsWithLinks(params.slug);

  if (!mod) {
    notFound();
  }

  const featureTags = await getFeatureTags();

  return (
    <>
      <h1 className='text-2xl'>Settings</h1>
      <UpdateModIconCard modId={mod.id} icon={mod.icon} />
      <UpdateModSummaryCard modId={mod.id} summary={mod.summary} />
      <FeatureTagsCard modId={mod.id} featureTags={featureTags} activeTags={mod.featureTags} />
      <UpdateModSideCard modId={mod.id}  environment={mod.environment as EnvironmentType ?? undefined}/>
      <UpdateModLinksCard
          modId={mod.id} modLinksId={mod.links?.id} 
          issues={mod.links?.issues}
          source={mod.links?.source}
          wiki={mod.links?.wiki}
          discord={mod.links?.discord} 
        />
      <div className='flex flex-col gap-4 pt-6'>
        <DeleteModCard modId={mod.id}/>
      </div>
    </>
  );
}

export default SettingsPage;