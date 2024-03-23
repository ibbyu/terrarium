import React from 'react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  issues?: string | null;
  source?: string | null;
  wiki?: string | null;
  discord?: string | null;
}

const LinksCard = ({ issues, source, wiki, discord }: Props) => {
  if (!issues && !source && !wiki && !discord) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Links</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-3'>
        {issues && <Link href={issues} className='underline hover:text-primary'>Issues</Link>}
        {source && <Link href={source} className='underline hover:text-primary'>Source</Link>}
        {wiki && <Link href={wiki} className='underline hover:text-primary'>Wiki</Link>}
        {discord && <Link href={discord} className='underline hover:text-primary'>Discord</Link>}
      </CardContent>
    </Card>
  );
}

export default LinksCard;