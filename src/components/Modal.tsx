'use client';
import { ModalProps } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Modal({ children, modalClose }: ModalProps) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const closeModal = () => {
		router.back();
		setIsOpen(false);
		modalClose();
	};
	useEffect(() => {
		setIsOpen(true);
	}, []);
	return (
		<>
			<Transition
				appear
				show={isOpen}
				as={Fragment}>
				<Dialog
					as="div"
					className="relative z-30"
					onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-full p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
									<button
										type="button"
										onClick={closeModal}
										className="absolute z-10 p-2 rounded-full top-2 right-2 w-fit bg-slate-50">
										<Image
											src="/x-mark.svg"
											alt="close"
											width={20}
											height={20}
											className="object-contain"
										/>
									</button>
									{children}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
