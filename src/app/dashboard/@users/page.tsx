'use client';
// import DeleteBtn from '@/components/DeleteBtn';
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
			<ul className="flex flex-col m-4">
				{users.length > 0 ? (
					users.map((user: UserProps) => (
						<li
							key={user._id}
							className="py-2 px-1 rounded bg-slate-100 m-1 flex flex-row justify-between items-center">
							<div>
								<p>
									{user.fname} {user.lname}
								</p>
								<p className="text-sm">{user.email}</p>
							</div>
							<div>
								<p className="text-xs my-2">
									{/* <DeleteBtn
										btnSize={12}
										btnName="Approve Admin?"
										onDelete={() => console.log('Approved Admin')}
									/> */}
									<button>Delete</button>
								</p>
							</div>
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
