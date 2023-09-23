import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';

interface IParams {
  listingId?: string;
}

// 서버컴포넌트에서도 다행히도 params에 접근할 수는 있다.
async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  // listing이 없을때...
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  // 클라이언트 컴포넌트에서 서버컴포넌트를 자식으로 가지려면 이렇게 children으로 셋팅해야한다.
  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
}

export default ListingPage;
