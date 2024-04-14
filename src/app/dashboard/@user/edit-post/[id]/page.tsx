'use client';

// import formatDate from '@/utils/format-date';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/use-user';

export default function EditPost() {
	const user = useUser();
	const router = useRouter();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const params = useParams();

	const getPost = async () => {
		try {
			const res = await fetch(`/api/post/${params.id}`);
			const data = await res.json();

			setTitle(data.title);
			setContent(data.content);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (title.length < 4 || content.length < 50) {
			return;
		}
		try {
			const res = await fetch(`/api/post/${params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					content,
				}),
			});

			if (res.status === 200) {
				router.back();
			} else {
				console.log('Error updating post: ');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPost();
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

						<p className="text-xs font-extralight">Last logged: 14-04-2024</p>
					</div>
				)}
			</div>
			<div className="flex items-center justify-center">
				<div className="w-full mx-5 border "></div>
			</div>
			<div className="mx-6 my-3">
				<Link href="/dashboard">Back</Link>
			</div>
			<section className="bg-gray-50 ">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-5 md:h-full lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
								Edit Blog Post
							</h1>
							<form
								onSubmit={handleSubmit}
								className="space-y-4 md:space-y-6"
								action="#">
								<div>
									<label
										htmlFor="title"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Title
									</label>
									<input
										type="text"
										name="title"
										id="title"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
										placeholder="Bard is now Gemini"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="message"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Content
									</label>
									<textarea
										id="message"
										rows={3}
										value={content}
										onChange={(e) => setContent(e.target.value)}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
										placeholder="Content goes here..."
									/>
								</div>
								<button
									type="submit"
									className="w-full border  text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
									Edit
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
