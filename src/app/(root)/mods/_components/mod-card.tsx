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
      <CardHeader className='grid grid-cols-1 gap-4 h-auto'>
        <div className='min-w-24 sm:w-32 col-end-1'>
          <Link href={`/mod/${slug}`}>
            <ModIcon icon={icon} />
          </Link>
        </div>
        <div className='flex flex-col justify-between w-full flex-wrap'>
          <div className='flex gap-2 items-center'>
            <Link href={`/mod/${slug}`} className='font-bold text-2xl'>{name}</Link>
            by
            <Link href={`/user/${ownerName}`} className='hover:text-muted-foreground'>{ownerName}</Link>
          </div>
          <div className='w-full truncate whitespace-pre-wrap'>
            {summary}
          </div>
          <div className='text-sm text-muted-foreground flex gap-2 flex-wrap'>
            <span>{downloads} Downloads</span>
            <span>-</span>
            <span>{`Updated ${formatDistance(updatedAt, new Date(), { addSuffix: true })}`}</span>
            {environment && <span>-</span>}
            {environment && <span>{environment}</span>}
          </div>
        </div>
        <div className='sm:ml-auto col-start-0 sm:col-start-2'>
          feature tag placeholder container
        </div>
      </CardHeader>
    </Card>
  );
}

export default ModCard;