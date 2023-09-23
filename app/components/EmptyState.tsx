'use client';

import { useRouter } from 'next/navigation';
import Heading from './Heading';
import Button from './Button';

interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

function EmptyState({
  title = 'No exact matches',
  subTitle = 'Try changing or remove some of your filters',
  showReset,
}: EmptyStateProps) {
  const router = useRouter();
  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
      <Heading center title={title} subtitle={subTitle} />
      <div className='w-48 mt-4'>
        {showReset && (
          <Button
            outline
            label='Remove all filters'
            onClick={() => {
              router.push('/');
              console.log('클릭');
            }}
          />
        )}
      </div>
    </div>
  );
}

export default EmptyState;
