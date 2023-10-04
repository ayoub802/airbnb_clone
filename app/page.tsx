import Image from 'next/image'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import getListings, { IListingsParams } from './actions/getListings'
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from './components/EmptyState';
import ListingCard from './components/listings/ListingCard';

interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({searchParams} : HomeProps) => {

  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if(listings.length === 0){
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className="grid pt-24 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 2xl:grid-cols-6 gap-8">
            {
              listings.map((listing: any) => (
                <ListingCard 
                  currentUser={currentUser}
                  key={listing.id}
                  data={listing}
                />
              ))
            }
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;