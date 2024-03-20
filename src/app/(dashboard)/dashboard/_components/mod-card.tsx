import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ModIcon from '@/components/mod-icon';
import { MoreVerticalIcon } from 'lucide-react';

interface Props {
  name: string;
  icon?: string | null;
  summary: string;
  slug: string;
}

const ModCard = ({ name, icon, summary, slug }: Props) => {
  return (
    <Card className='hover:border-1 hover:border-primary ease-in-out duration-300'>
      <CardHeader className='p-4'>
        <div className='w-full flex gap-4'>
          <ModIcon icon={icon} className='w-24 h-24' />
          <div className='flex flex-col'>
            <div>
              {name}
            </div>
            <div className='text-muted-foreground'>
              {summary}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='h-6 ml-auto'>
                <MoreVerticalIcon size={24} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={`/dashboard/${slug}/settings`}>
                <DropdownMenuItem className='hover:cursor-pointer'>
                  Settings
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
    </Card>
  );
}

export default ModCard;