import React from 'react';
import InfoCard from './_components/info-card';
import LinksCard from './_components/links-card';
import MembersCard from './_components/members-card';
import Navbar from './_components/navbar';
import { getModBySlugWithOwnerWithLinksWithMembers } from '@/core/persistence/mod';

const ModPageLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const mod = await getModBySlugWithOwnerWithLinksWithMembers(params.slug);
  
  if (!mod?.owner) {
    return <div className='w-full flex h-full justify-center items-center'>Mod not found</div>;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-8 gap-6 pt-16 lg:grid-rows-1'>
      <Navbar slug={mod.slug} className='lg:hidden'/>
      <div className='lg:col-span-2 flex flex-col gap-4'>
        <InfoCard
          icon={mod.icon}
          name={mod.name}
          summary={mod.summary}
          downloads={mod.downloads}
          createdAtTimeStamp={new Date(mod.createdAt).toLocaleDateString()}
          updatedAtTimeStamp={new Date(mod.updatedAt).toLocaleDateString()}
          approved={Boolean(mod.approved)}
          draft={Boolean(mod.draft)}
          slug={mod.slug}
          environment={mod.environment}
        />
        <div className='row-start-3 flex flex-col gap-4'>
          <LinksCard
            issues={mod.links?.issues}
            source={mod.links?.source}
            wiki={mod.links?.wiki}
            discord={mod.links?.discord}
          />
          <MembersCard name={mod.owner.name} avatar={mod.owner.image} />
        </div>
      </div>
      <div className='w-full lg:col-span-6 flex flex-col gap-4 lg:row-start-1'>
        <Navbar slug={mod.slug} className='hidden lg:block'/>
        {children}
      </div>
    </div>
  );
}

export default ModPageLayout;