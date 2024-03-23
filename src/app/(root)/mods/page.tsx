import React from 'react';
import { getModsByQueryTagWithOwnerWithFeatureTags } from '@/core/persistence/mod';
import ModCard from './_components/mod-card';
import SearchFilter from './_components/search-filter';
import type { EnvironmentType } from '@/core/entities/environment';
import FeatureTagFilter from './_components/feature-tag-filter';

export function generateMetadata() {
  return {
    title: "Search mods - Terrarium"
  };
}

interface Props {
  params: { slug: string };
  searchParams: { q?: string, c?: string | string[] }
}

const ModsPage = async ({ searchParams }: Props) => {
  let mods = await getModsByQueryTagWithOwnerWithFeatureTags(searchParams.q);
  const categories = Array.isArray(searchParams.c) ? searchParams.c : searchParams.c ? [searchParams.c] : [];

  if (categories.length) {
    mods = mods.filter((m) => m.featureTags.some(t => categories.includes(t.featureTag.name)));
  }

  return (
    <div className='pt-16'>
      <div className='grid grid-cols-1 md:grid-cols-8 gap-6 h-full'>
        <div className='hidden md:flex flex-col rounded-2xl md:col-span-2 p-6 gap-4 bg-accent'>
          <FeatureTagFilter activeTags={[]} />
        </div>
        <div className='w-full h-full md:col-span-6 rounded-2xl flex flex-col gap-4'>
          <SearchFilter query={searchParams.q} modsFound={mods.length} />
          <div className='flex flex-col gap-4 pb-5'>
            {mods.length ? mods.map(m => {
              return <ModCard
                key={m.id}
                slug={m.slug}
                name={m.name}
                ownerName={m.owner?.name ?? "Unknown"}
                summary={m.summary}
                downloads={m.downloads}
                icon={m.icon}
                updatedAt={new Date(m.updatedAt)}
                environment={m.environment as EnvironmentType ?? undefined}
                featureTags={m.featureTags}
              />
            }) : <div className='flex items-center justify-center'>no mods found</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModsPage;