import React from 'react';
import { getModsByQueryWithOwner } from '@/core/persistence/mod';
import ModCard from './_components/mod-card';
import SearchFilter from './_components/search-filter';
import { EnvironmentType } from '@/core/entities/environment';

export function generateMetadata() {
  return {
    title: "Search mods - Terrarium"
  };
}

interface Props {
  params: { slug: string };
  searchParams: { q?: string }
}

const ModsPage = async ({ searchParams } : Props) => {
  const mods = await getModsByQueryWithOwner(searchParams.q);

  return (
    <div className='pt-16'>
      <div className='grid grid-cols-1 md:grid-cols-8 gap-6 h-full'>
        <div className='hidden md:flex flex-col rounded-2xl md:col-span-2 p-6 h-96 gap-4 bg-accent'>
          tag filter placeholder
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
                side={m.side as EnvironmentType ?? undefined}
              />
            }) : <div className='flex items-center justify-center'>no mods found</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModsPage;