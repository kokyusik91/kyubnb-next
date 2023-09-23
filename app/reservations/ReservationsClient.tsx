'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { SafeReservations, SafeUser } from '../types';

import axios from 'axios';

import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import Container from '../components/Container';
import toast from 'react-hot-toast';

interface ReservationsClientProps {
  reservations: SafeReservations[];
  currentUser: SafeUser | null;
}

function ReservationsClient({
  reservations,
  currentUser,
}: ReservationsClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      // 카드를 클릭했을때 현재 ID 부여
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservations canceled');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data.error);
        })
        .finally(() => {
          // id 초기화 하기
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title='Reservations' subtitle='Bookings on your properties' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel Reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

export default ReservationsClient;
