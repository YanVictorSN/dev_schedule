import React from 'react';
import { Input } from '@nextui-org/react';
import { SearchIcon } from './SearchIcon';

interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <Input
      label="Pesquisar"
      isClearable
      radius="lg"
      className="max-w-xl"
      classNames={{
        label: 'text-black/50 dark:text-white/90',
        input: [
          'bg-transparent',
          'text-black/90 dark:text-white/90',
          'placeholder:text-default-700/50 dark:placeholder:text-white/60',
        ],
        innerWrapper: 'bg-transparent',
        inputWrapper: [
          'shadow-xl',
          'bg-default-200/50',
          'dark:bg-default/60',
          'backdrop-blur-xl',
          'backdrop-saturate-200',
          'hover:bg-default-200/70',
          'dark:hover:bg-default/70',
          'group-data-[focused=true]:bg-default-200/50',
          'dark:group-data-[focused=true]:bg-default/60',
          '!cursor-text',
        ],
      }}
      placeholder="Pesquisar"
      startContent={
        <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
      }
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
