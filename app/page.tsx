

import Footer from '@/components/Footer';
import ProfileCardList from '@/components/ProfileCardList';
import TicketList from '@/components/TicketList';

export default function Home() {
  return (
    <div className="">
      <TicketList />
      <ProfileCardList />
      <Footer />
    </div>
    
  );
}
