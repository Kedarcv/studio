import { ContactCard } from './ContactCard';
import { ShareActions } from './ShareActions';

export function BroCardPage() {
  return (
    <div className="w-full max-w-md p-4 sm:p-0">
      <ContactCard />
      <ShareActions />
      <p className="text-center text-sm text-primary/80 mt-10 font-medium">
        BroCard by <a href="https://brocodezw.com" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">BroCode ZW</a>
      </p>
    </div>
  );
}
