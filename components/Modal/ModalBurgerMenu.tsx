import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalBurgerMenu: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isBrowser, setIsBrowser] = useState(false);

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
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const modalContent = isOpen ? (
    <div className="modal-overlay-burger relative" onClick={handleOverlayClick}>
      <div className="modal-burger" ref={modalRef}>
        {children}
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return createPortal(modalContent, document.body);
  }
};

export default ModalBurgerMenu;
