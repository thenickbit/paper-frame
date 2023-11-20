import { Skeleton } from '@/components/ui/skeleton';

export default function QuotesLoading() {
  return (
    <div className="grid h-screen w-full flex-1 grid-cols-1 gap-4 overflow-y-hidden p-8 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-full w-full" />
      ))}
    </div>
  );
}
