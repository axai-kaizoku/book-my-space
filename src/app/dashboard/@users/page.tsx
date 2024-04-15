'use client';
import { useEffect, useState } from 'react';
import { UserProps } from '@/types';

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
			<ul className="flex flex-col m-4 overflow-y-auto max-h-[40vh]">
				{users.length > 0 ? (
					users.map((user: UserProps) => (
						<li
							key={user._id}
							className="py-2 text-sm px-2 rounded-lg bg-slate-100 m-1 flex flex-row justify-between items-center">
							<p>{user.name}</p>
							<p>{user.email}</p>
							<p>{user.mobile}</p>
						</li>
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
