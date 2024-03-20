import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getServerAuthSession } from '@/server/auth';
import ModCard from './_components/mod-card';
import { buttonVariants } from '@/components/ui/button';
import { getUserByUsernameWithMods } from '@/core/persistence/user';

const Dashboard = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  const user = await getUserByUsernameWithMods(session.user.name);

  return (
    <div className='flex flex-col items-center pt-16'>
      <div className='w-full py-4 flex items-center justify-between'>
        <h1 className='text-4xl font-bold'>Mods</h1>
        <Link href="/dashboard/new" className={buttonVariants({ variant: "default" })}>
          Create a new mod
        </Link>
      </div>
      <div className='w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {user?.mods.map((mod) => (
          <Link href={`/dashboard/${mod.slug}`} key={mod.id}>
            <ModCard
              name={mod.name}
              icon={mod.icon}
              summary={mod.summary}
              slug={mod.slug}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;