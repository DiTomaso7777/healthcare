"use client"

import Footer from '@/components/Footer';
import ProfileCardList from '@/components/ProfileCardList';
import ServiceDescription from '@/components/ServiceDescription';

import TicketList from '@/components/TicketList';
import { useAuth } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn } = useAuth();
  return (
    <div className="">
      {isSignedIn && <TicketList />}
      <ServiceDescription />
      <ProfileCardList />
      <Footer />
    </div>
    
  );
}
