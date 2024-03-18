import React from 'react';
import { Avatar as UserAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

interface Props {
  avatar?: string | null;
  fallback: string;
  className?: string;
}

const Avatar = ({ avatar, fallback, className } : Props) => {
  return (
    <UserAvatar className={cn(className)}>
      <AvatarImage src={avatar ?? "https://github.com/ibbyu.png"} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </UserAvatar>
  );
}

export default Avatar;