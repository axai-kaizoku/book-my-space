'use client';
import { useEffect, useState } from 'react';
import { UserProps } from '@/types';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import formatDate from '@/utils/format-date';

export default function Users() {
	const [users, setUsers] = useState([]);

	const getAllUsers = async () => {
		const response = await fetch('api/all-users');
		const data = await response.json();
		setUsers(data);
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	return (
		<div>
			<h1 className="text-xl font-bold">Users</h1>
			<div className="border rounded border-gray-600"></div>
			<ul className="flex flex-col m-2 overflow-y-auto max-h-[40vh]">
				{users.length > 0 ? (
					users.map((user: UserProps) => (
						<Accordion
							type="single"
							collapsible
							key={user._id}>
							<AccordionItem value="item-1">
								<AccordionTrigger>{user.name}</AccordionTrigger>
								<AccordionContent>
									<p>Name: {user.name}</p>
									<p>Mobile: {user.mobile}</p>
									<p>Email: {user.email}</p>
									<p>Created At: {formatDate(user.createdAt)}</p>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))
				) : (
					<div className="flex flex-row justify-center items-center w-full ">
						<div className="w-9 h-9 border-t-8 rounded-full border-8 border-t-slate-500 border-gray-300 animate-spin"></div>
					</div>
				)}
			</ul>
		</div>
	);
}
