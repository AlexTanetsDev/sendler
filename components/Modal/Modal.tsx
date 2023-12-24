import { useEffect, useRef, useState } from 'react';
import { FormFeedback } from '../forms/FormFeedback';
import Image from 'next/image';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef?.current && !modalRef?.current?.contains(event.target as Node)) {
          onClose();
        }
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
    
      useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal relative" ref={modalRef}>
      <button className=' absolute top-4 right-4 transform transition-transform hover:rotate-90 hover:scale-110' onClick={onClose}>
            <Image src={'/svg/cross-circle.svg'} alt='close modal button' width={34} height={34} />
        </button>
        <FormFeedback onClose={onClose} title='Зворотній зв’язок'/>
        
      </div>
    </div>
  );
};

export default Modal;