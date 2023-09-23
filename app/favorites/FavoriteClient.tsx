'use client';

import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { SafeListing, SafeUser } from '../types';

interface FavoriteClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

function FavoriteClient({ listings, currentUser }: FavoriteClientProps) {
  return (
    <Container>
      <Heading
        title='Trips'
        subtitle='Where you been and where you are going?'
      />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

export default FavoriteClient;
