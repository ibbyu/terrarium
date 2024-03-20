import React from 'react';
import { notFound } from 'next/navigation';

import { getModBySlug } from '@/core/persistence/mod';

interface Props {
  params: {
    slug: string
  }
}

const DashboardModPage = async ({ params }: Props) => {
  const mod = await getModBySlug(params.slug);

  if (!mod) {
    notFound();
  }

  return (
    <div>Overview page</div>
  );
}

export default DashboardModPage;