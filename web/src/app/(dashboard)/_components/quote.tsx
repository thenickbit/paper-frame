'use client';

import 'react-medium-image-zoom/dist/styles.css';

import Balancer from 'react-wrap-balancer';

type QuoteProps = {
  text: string;
};

export function Quote({ text }: QuoteProps) {
  return (
    <div className="flex h-96 cursor-pointer items-center justify-center rounded-lg border border-border/20 dark:border-border/80 shadow-md p-4 transition-transform hover:scale-110">
      <Balancer className="flex-1 select-none text-3xl text-center">{text}</Balancer>
    </div>
  );
}
