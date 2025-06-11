
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Briefcase, Building2 } from 'lucide-react';
import { InfoItem } from './InfoItem';

import me from './me.jpeg';
const contactInfo = {
  name: "Michael Nkomo",
  title: "Co-founder & Software Engineer",
  company: "Brocode Zimbabwe",
  location: "Gweru, Zimbabwe",
  phone: "+263 719 340 335",
  email: "cvlised360@gmail.com",
  avatarUrl: me,
};

export function ContactCard() {
  return (
    <Card className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/30 text-card-foreground overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
      <CardHeader className="items-center text-center p-6 pt-8">
        <Image
          src={contactInfo.avatarUrl}
          alt={contactInfo.name}
          width={100}
          height={100}
          className="rounded-full border-4 border-primary mb-4 shadow-lg"
          data-ai-hint="profile avatar"
        />
        <CardTitle className="text-3xl font-headline font-bold">{contactInfo.name}</CardTitle>
        <CardDescription className="text-md text-muted-foreground mt-1">
          {contactInfo.title}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 p-6 text-sm">
        <InfoItem icon={<Building2 />} text={contactInfo.company} />
        <InfoItem icon={<MapPin />} text={contactInfo.location} />
        <InfoItem icon={<Phone />} text={contactInfo.phone} href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} />
        <InfoItem icon={<Mail />} text={contactInfo.email} href={`mailto:${contactInfo.email}`} />
      </CardContent>
    </Card>
  );
}
