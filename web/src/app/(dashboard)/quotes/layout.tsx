import { QuoteUploader } from '../_components/quote-uploader';

export default function QuotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full items-center justify-between gap-4 p-8">
        <h1 className="flex-1 text-4xl font-extrabold tracking-tight lg:text-5xl">Quotes</h1>
        <QuoteUploader />
      </div>
      {children}
    </div>
  );
}
