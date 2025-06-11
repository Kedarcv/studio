
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Share2, WalletCards, QrCode, CheckCircle, Download } from 'lucide-react';

const contactInfo = {
  name: "Michael Nkomo",
  title: "Founder & Software Engineer",
  company: "BroCode ZW",
  location: "Gweru, Zimbabwe",
  phone: "+263 719 340 335",
  email: "cvlised360@gmail.com",
};

export function ShareActions() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleShare = async () => {
    if (!navigator.clipboard) {
      toast({
        title: "Error",
        description: "Clipboard API not available in your browser.",
        variant: "destructive",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: "Copied to Clipboard!",
        description: "You can now share the link to your BroCard.",
        action: <CheckCircle className="text-green-500" />,
      });
    } catch (err) {
      toast({
        title: "Failed to Copy",
        description: "Could not copy the link. Please try again manually.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadVCard = () => {
    const vCardString = `BEGIN:VCARD
VERSION:3.0
N:${contactInfo.name.split(' ').slice(-1).join(' ')};${contactInfo.name.split(' ').slice(0,-1).join(' ')}
FN:${contactInfo.name}
ORG:${contactInfo.company}
TITLE:${contactInfo.title}
TEL;TYPE=WORK,VOICE:${contactInfo.phone.replace(/\s+/g, '')}
EMAIL:${contactInfo.email}
ADR;TYPE=WORK:;;;${contactInfo.location.split(',')[0]};;${contactInfo.location.split(',')[1]?.trim()};
END:VCARD`;
    const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contactInfo.name.replace(/\s+/g, '_')}_BroCard.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "vCard Downloading",
      description: "Your contact card (vCard) is being downloaded.",
      action: <Download className="text-primary" />,
    });
  };

  const qrCodeUrl = currentUrl ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}&qzone=1&margin=10&color=000080&bgcolor=40E0D0` : '';


  const buttonClass = "flex-1 min-w-[160px] transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-ring";

  return (
    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full flex-wrap">
      <Button onClick={handleShare} className={buttonClass} aria-label="Share BroCard link">
        <Share2 className="mr-2 h-5 w-5" /> Share Link
      </Button>

      <Button onClick={handleDownloadVCard} variant="outline" className={`${buttonClass} border-primary text-primary hover:bg-primary hover:text-primary-foreground`} aria-label="Save contact as vCard">
        <WalletCards className="mr-2 h-5 w-5" /> Save vCard
      </Button>

      <Dialog open={showQrModal} onOpenChange={setShowQrModal}>
        <DialogTrigger asChild>
          <Button variant="outline" className={`${buttonClass} border-primary text-primary hover:bg-primary hover:text-primary-foreground`} aria-label="Show QR code for BroCard">
            <QrCode className="mr-2 h-5 w-5" /> Show QR
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[320px] bg-background/80 backdrop-blur-md border-primary/50 rounded-xl">
          <DialogHeader className="items-center">
            <DialogTitle className="text-2xl font-headline text-primary">Scan to Share</DialogTitle>
            <DialogDescription className="text-center text-foreground/80">
              Scan this QR code with a phone camera to open the BroCard.
            </DialogDescription>
          </DialogHeader>
          {currentUrl && (
            <div className="mt-4 flex justify-center p-4 bg-turquoise-blue rounded-lg">
              <Image 
                src={qrCodeUrl} 
                alt="BroCard QR Code" 
                width={200} 
                height={200} 
                className="rounded-md border-4 border-primary shadow-lg"
                data-ai-hint="qr code"
                unoptimized={true}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
