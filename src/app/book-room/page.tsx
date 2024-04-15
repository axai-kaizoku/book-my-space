'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function BookRoom() {
	const [error, setError] = useState<string>('');
	const handleSubmit = async (e: any) => {};
	return (
		<>
			<section className="relative">
				{/* Background Image with Blur */}
				<div className="absolute inset-0 z-0">
					<Image
						src="/bg-book-room.jpg"
						alt="background"
						width={1500}
						height={900}
						className="absolute inset-0 w-full h-full object-cover filter blur-sm"
					/>
				</div>
				<div className="inset-0 z-20 w-full h-[100vh] flex flex-col items-center justify-center mx-auto py-8">
					<div className="bg-white shadow-2xl bg-opacity-80 backdrop-filter backdrop-blur-sm p-8 rounded-lg">
						<div className="w-full md:mt-0 sm:max-w-md xl:p-0 ">
							<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
								<h1
									className={`text-xl font-bold   p-2 rounded-xl whitespace-nowrap leading-tight tracking-tight text-gray-900 md:text-2xl hover:cursor-default`}>
									Book Room
								</h1>
								<form
									className="space-y-4 md:space-y-6"
									onSubmit={handleSubmit}>
									<>
										<div>
											<label
												htmlFor="loginEmailOrNumber"
												className="block mb-2 text-sm font-medium text-gray-900 ">
												Your email / number
											</label>
											<input
												type="text"
												name="loginEmailOrNumber"
												id="loginEmailOrNumber"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
												placeholder="name@example.com / 9909192900"
												required
												// value={loginEmailOrNumber}
												// onChange={(e) => setLoginEmailOrNumber(e.target.value)}
											/>
										</div>
										<div>
											<label
												htmlFor="signinPassword"
												className="block mb-2 text-sm font-medium text-gray-900 ">
												Password
											</label>
											<input
												type="password"
												name="password"
												id="signinPassword"
												placeholder="••••••••"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
												required
												// value={loginPassword}
												// onChange={(e) => setLoginPassword(e.target.value)}
											/>
										</div>
									</>

									<div>
										{/* <span className="text-red-500">{error}</span> */}
									</div>
									<button
										type="submit"
										className="w-full border-black border  text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center">
										Book
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
