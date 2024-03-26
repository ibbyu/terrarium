import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  title: string | null;
  imageUrl: string;
  className?: string;
}

const ModImage = ({ title, imageUrl, className }: Props) => {
  return (
    <div className={cn("aspect-square relative overflow-hidden rounded-md", className)}>
      <Image
        src={imageUrl}
        alt="Mod icon"
        fill
        style={{objectFit: "cover"}}
      />
    </div>
  );
};

export default ModImage;