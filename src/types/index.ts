import { ReactNode } from 'react';

export interface ModalProps {
	children: ReactNode;
	modalClose?: (() => void) | undefined;
}

export interface CustomFormProps {
	title: string;
	handleSubmit: (e: any) => Promise<void>;
	btnText: string;
	forgotPass: boolean;
	terms: boolean;
	name: boolean;
	email: boolean;
	password: boolean;
	blogTitle: boolean;
	blogContent: boolean;
	error: string;
}

export interface RoomProps {
	_id: string;
	hotelId: string;
	roomNumber: string;
	roomNo: string;
	roomType: string;
	maxOccupancy: number;
	pricePerNight: number;
	isBooked: boolean;
}

export interface UserProps {
	_id?: string;
	name: string;
	email: string;
	mobile: string;
	password: string;
	isAdmin: boolean;
	updatedAt: Date;
	createdAt: Date;
}

export interface OrderProps {
	_id?: string;
	rooms: RoomProps[];
	persons: number;
	user: UserProps;
	checkIn: Date;
	checkOut: Date;
	status: string;
}
