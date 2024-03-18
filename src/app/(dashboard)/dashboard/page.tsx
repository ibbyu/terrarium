import React from 'react';
import Link from 'next/link';
import ModCard from './_components/mod-card';
import { buttonVariants } from '@/components/ui/button';

const Dashboard = async () => {
  return (
    <div className="container max-w-7xl mx-auto">
      <div className='flex flex-col items-center pt-16'>
        <div className='w-full py-4 flex items-center justify-between'>
          <h1 className='text-4xl font-bold'>Mods</h1>
          <Link href="/dashboard/new" className={buttonVariants({ variant: "default" })}>
            Create a new mod
          </Link>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <Link href="#" >
            <ModCard name="Fabric" summary='Idk' slug='fabric' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;