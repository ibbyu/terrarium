"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { SearchIcon, XIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUrl } from '@/core/common/utils';

interface Props {
  query?: string;
  modsFound: number;
}

const SearchFilter = ({ query, modsFound }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialRender = useRef(true);
  const [text, setText] = useState(query ?? "");
  const [currentQuery] = useDebounce(text, 150);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams);
    currentQuery ? params.set("q", currentQuery) : params.delete("q");
    router.push(createUrl(pathname, new URLSearchParams(params)));
  }, [currentQuery]);

  return (
    <div className='flex items-center'>
      <div className='relative rounded-md shadow-sm'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <SearchIcon
            className='h-5 w-5 text-muted-foreground'
            aria-hidden='true'
          />
        </div>
        <Input
          value={text}
          placeholder='Search mods'
          onChange={e => setText(e.target.value)}
          className='block w-full rounded-md border-0 py-1.5 pl-10 text-foreground focus:ring-2 sm:text-sm sm:leading-6 bg-accent'
        />
        {text && <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
          <XIcon
            className='h-4 w-4 text-muted-foreground hover:text-white hover:cursor-pointer'
            aria-hidden='true'
            onClick={() => setText("")}
          />
        </div>}
      </div>
      <div className='pl-4'>{query && <Label>{modsFound} {modsFound === 1 ? "mod" : "mods"} found</Label>}</div>
    </div>
  );
}

export default SearchFilter;