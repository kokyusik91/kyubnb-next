'use client';

import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';

function RentModal() {
  const rentModal = useRentModal();

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title='Airbnb your home'
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel='Submit'
    ></Modal>
  );
}

export default RentModal;
