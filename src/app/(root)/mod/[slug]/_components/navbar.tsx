"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  slug: string;
  className?: string;
}

const Navbar = ({ slug, className } : Props) => {
  const pathname = usePathname();
  const DESCRIPTION_PATH = `/mod/${slug}`;
  const RELEASES_PATH = `/mod/${slug}/versions`;
  const GALLERY_PATH = `/mod/${slug}/images`;
  
  return (
    <div className={cn("flex gap-2", className)}>
      <Link href={DESCRIPTION_PATH} className={cn(buttonVariants({ variant: "link" }), "text-foreground", pathname === DESCRIPTION_PATH ? "underline" : "")}>Description</Link>
      <Link href={GALLERY_PATH} className={cn(buttonVariants({ variant: "link" }), "text-foreground", pathname === GALLERY_PATH ? "underline" : "")}>Images</Link>
      <Link href={RELEASES_PATH} className={cn(buttonVariants({ variant: "link" }), "text-foreground", pathname === RELEASES_PATH ? "underline" : "")}>Versions</Link>
    </div>
  );
}

export default Navbar;