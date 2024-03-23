import React from 'react';
import Link from 'next/link';
import { formatDistance, format } from "date-fns";
import { RefreshCcw, Download } from 'lucide-react';

import ModIcon from '@/components/mod-icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { EnvironmentType } from '@/core/entities/environment';

interface Props {
  slug: string;
  name: string;
  ownerName: string;
  icon?: string | null;
  summary: string;
  downloads: number;
  updatedAt: Date;
  environment?: EnvironmentType;
}

const ModCard = ({ slug, name, ownerName, icon, summary, downloads, updatedAt, environment }: Props) => {
  return (
    <Card>
      <CardHeader className='grid grid-cols-2 gap-4'>
        <div className='w-20 sm:w-32 col-end-1'>
          <Link href={`/mod/${slug}`}>
            <ModIcon icon={icon} />
          </Link>
        </div>
        <div className='flex flex-col gap-2 col-span-2'>
          <div className='flex gap-2 flex-wrap items-end'>
          <Link href={`/mod/${slug}`} className='font-bold text-2xl'>{name}</Link>
          <span>by</span>
          <Link href={`/user/${ownerName}`} className='hover:text-muted-foreground'>{ownerName}</Link>
          </div>
          <div>{summary}</div>
          <div className='text-xs sm:text-sm text-muted-foreground flex sm:flex-row gap-4 sm:gap-10 flex-wrap sm:items-end h-full'>
            <span>{downloads} Downloads</span>
            <span>{`Updated ${formatDistance(updatedAt, new Date(), { addSuffix: true })}`}</span>
            {environment && <span>{environment}</span>}
          </div>
        </div>
        <div className='sm:col-end-4 row-span-3 sm:row-span-1'>
          test
        </div>
      </CardHeader>
    </Card>
  );
}

export default ModCard;