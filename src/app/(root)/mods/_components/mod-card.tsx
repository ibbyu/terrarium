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
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
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
  featureTags: {
    featureTagId: string;
    modId: string;
    featureTag: {
      name: string;
      id: string;
    };
  }[]
}

const ModCard = ({ slug, name, ownerName, icon, summary, downloads, updatedAt, environment, featureTags }: Props) => {
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
          <div className='flex items-center gap-2 md:col-span-2 text-muted-foreground'><Download size={16} /><span className='font-bold'>{downloads}</span> downloads</div>

            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='hover:cursor-default'>
                <div className='flex items-center gap-2'>
                  <RefreshCcw size={16} />{`Updated ${formatDistance(updatedAt, new Date(), { addSuffix: true})}`}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{format(updatedAt, "MMMM d, yyyy 'at' h:m a")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
            {environment && <span>{environment}</span>}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default ModCard;