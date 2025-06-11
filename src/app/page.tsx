import { BroCardPage } from '@/components/brocard/BroCardPage';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <BroCardPage />
    </main>
  );
}
