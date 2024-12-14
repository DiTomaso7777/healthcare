

import Footer from '@/components/Footer';
import ProfileCardList from '@/components/ProfileCardList';
import ServiceDescription from '@/components/ServiceDescription';
import TicketList from '@/components/TicketList';

export default function Home() {
  return (
    <div className="">
      <TicketList />
      <ServiceDescription />
      <ProfileCardList />
      <Footer />
    </div>
    
  );
}
