import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import React from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	isSelectOpen?: boolean;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	isSelectOpen,
	children }) => {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const [isBrowser, setIsBrowser] = useState<boolean>(false);

	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (modalRef?.current && !modalRef?.current?.contains(event.target as Node)) {
			onClose();
		};
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && !isSelectOpen) {
			onClose();
		};
	};

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown, isSelectOpen]);

	const modalContent = isOpen ? (
		<div className="modal-overlay" onClick={handleOverlayClick}>
			<div className="modal relative" ref={modalRef}>
				{children}
			</div>
		</div>
	) : null;

	if (isBrowser) {
		return createPortal(modalContent, document.body);
	};
};

export default Modal;
