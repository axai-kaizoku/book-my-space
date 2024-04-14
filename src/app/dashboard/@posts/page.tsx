'use client';
// import DeleteBtn from '@/components/DeleteBtn';
import { useEffect, useState } from 'react';
import { PostProps } from '@/types';
import { useRouter } from 'next/navigation';

export default function Posts() {
	const router = useRouter();
	const [posts, setPosts] = useState([]);

	const getAllPosts = async () => {
		const response = await fetch('/api/flagged-posts');
		const data = await response.json();
		setPosts(data);
	};

	const approvePost = async (id: string) => {
		try {
			const res = await fetch('/api/flagged-posts', {
				method: 'PUT',
				body: JSON.stringify({ id }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (res.status === 200) router.push('/');
		} catch (error: any) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllPosts();
	}, []);
	return (
		<div>
			<h1 className="text-xl font-bold">Posts</h1>
			<div className="border rounded border-gray-600"></div>
			<ul className="flex flex-col m-4">
				{posts.length > 0 ? (
					posts.map((post: PostProps) => (
						<li
							key={post._id}
							className="py-2 px-1 rounded bg-slate-100 m-1 flex flex-row justify-between items-center">
							<div className="w-4/5">
								<div className="flex flex-col sm:flex-row justify-between sm:items-center">
									<p className="font-medium">{post.title}</p>
									<p className="text-xs">
										By {post.author.fname} {post.author.lname}
									</p>
								</div>
								<p className="text-sm ">{post.content}</p>
							</div>
							<div className="w-2/12 text-sm">
								{/* <DeleteBtn
									btnSize={14}
									btnName="Approve"
									onDelete={() => approvePost(post._id)}
								/> */}
								<button>Delete</button>
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
