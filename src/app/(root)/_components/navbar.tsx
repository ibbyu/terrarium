import React from 'react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AvatarMenu from "@/components/avatar-menu";
import ToggleTheme from '@/components/toggle-theme';
import { getServerAuthSession } from '@/server/auth';

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <header className="sticky top-0 inset-x-0 light:bg-gray-100/60 backdrop-blur-md z-10 py-4">
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        <div className='flex items-center text-xl gap-8'>
          <Link href="/">
            <span className="font-extrabold text-foreground">Terrarium</span>
          </Link>
          <Link href="/mods" >
            <span 
              className={cn("font-semibold text-lg text-foreground underline-offset-4 hover:underline hover:decoration-primary decoration-2")}>
              Mods
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-8">
          {session ?
            <div className='flex gap-10'>
              <AvatarMenu avatar={session.user.image} username={session.user.name} />
            </div> :
            <div className='flex gap-4'>
              <Link href="/sign-in" className={buttonVariants({ variant: "outline" })}>Sign in</Link>
            </div>}
            <ToggleTheme />
        </div>
      </div>
    </header>
  );
}

export default Navbar;