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

export interface PostProps {
	_id: string;
	id: string;
	title: string;
	content: string;
	author: UserProps;
	createdAt: string;
}

export interface UserProps {
	fname: string;
	lname: string;
	email: string;
	password: string;
	isAdmin: boolean;
	updatedAt: Date;
}
