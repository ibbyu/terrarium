import React from 'react';
import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <>
      {children}
    </>
  );
}