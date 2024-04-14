'use client';
import { PostProps } from '@/types';
// import DeleteBtn from '@/components/DeleteBtn';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/use-user';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import formatDate from '@/utils/format-date';

export default function UserDashboard() {
	const { data: session, status: sessionStatus } = useSession();
	const user = useUser();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (sessionStatus === 'unauthenticated') {
			router.replace('/signin');
		}
	}, [sessionStatus, router]);

	const getPosts = async () => {
		setLoading(true);
		const res = await fetch('/api/user-posts');
		const data = await res.json();
		setPosts(data);
		setLoading(false);
	};

	const deletePost = async (id: string) => {
		const res = await fetch(`/api/post/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (res.status === 200) {
			router.replace('/');
		} else {
			console.log('error occurred while deleting');
		}
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<>
			<div className="p-7 flex flex-row justify-between">
				<h1 className="text-3xl font-semibold ">User Dashboard</h1>
				{user && (
					<div>
						<p>
							{user.fname} {user.lname}
						</p>

						<p className="text-xs font-extralight">Last logged: 14-02-2024</p>
					</div>
				)}
			</div>
			<div className="flex items-center justify-center">
				<div className="w-full mx-5 border "></div>
			</div>
			<div className="w-full h-5/6 flex flex-row justify-center items-center">
				<div className=" w-11/12 h-full flex flex-row justify-between p-6">
					<div className=" bg-slate-50  shadow-lg w-11/12 p-3 rounded">
						<div>
							<h1 className="text-xl font-bold">Posts</h1>
							<div className="border rounded border-gray-600"></div>
							<ul className="flex flex-col m-4">
								{loading ? (
									<div className="flex flex-row justify-center items-center w-full ">
										<div className="w-9 h-9 border-t-8 rounded-full border-8 border-t-slate-500 border-gray-300 animate-spin"></div>
									</div>
								) : posts.length > 0 ? (
									posts.map((post: PostProps) => (
										<li
											key={post._id}
											className="py-2 px-1 rounded bg-slate-100 m-1 flex flex-col sm:flex-row justify-between items-center">
											<p className="w-4/5">
												<p className="font-medium">{post.title}</p>
												<p className="text-sm ">
													{post.content.slice(
														0,
														post.content.lastIndexOf(' ', 50),
													) + ' ...'}
												</p>
											</p>
											<button className="w-1/12 py-2 sm:py-0">
												<Link href={`/dashboard/edit-post/${post._id}`}>
													Edit
												</Link>
											</button>
											<button className="w-1/12 mx-2 py-2 sm:py-0">
												{/* <DeleteBtn
													btnSize={13}
													btnName="Delete"
													onDelete={() => deletePost(post._id)}
												/> */}
												<button>Delete</button>
											</button>
										</li>
									))
								) : (
									<li className="text-center text-xl">No posts yet!</li>
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
