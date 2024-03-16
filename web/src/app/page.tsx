import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import Balancer from 'react-wrap-balancer';

export default async function Home() {
  return (
    <div className="h-screen p-8 bg-dotted-spacing-12 bg-dotted-secondary">
      <div className="flex h-full w-full flex-col gap-2 lg:flex-row">
        <ThemeToggle className="" />
        <div className="flex h-full w-full grow basis-1/2 flex-col justify-center gap-6 @container">
          <div>
            <h1 className="text-9xl font-bold tracking-tight @xs:text-6xl @sm:text-7xl @2xl:text-9xl">
              One frame,
            </h1>
            <h1 className="text-9xl font-bold tracking-tight @xs:text-6xl @sm:text-7xl @2xl:text-9xl">
              endless art
            </h1>
          </div>
          <p className="text-2xl text-muted-foreground">
            <Balancer>
              Bring an infinite gallery to life and easily update your curated collection of arts,
              quotes and photos.
            </Balancer>
          </p>
          <p className="text-2xl text-muted-foreground">Designed for the modern minimalist.</p>
          <Button className="w-fit" variant="secondary" size="lg">
            <Icons.github height={16} className="mr-2" /> Learn more
          </Button>
          <Button className="w-fit" variant="default" size="lg">
            Go to gallery
          </Button>
        </div>
        <div className="h-full w-full grow basis-1/2"></div>
      </div>
    </div>
  );
}
