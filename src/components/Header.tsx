'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
	const { data: session }: any = useSession();
	return (
		<header>
			<nav className="md:h-32 h-36 bg-white w-full flex items-center flex-col md:flex-row justify-between px-20 border-b-black border-b-2 shadow-xl">
				<h2 className="text-3xl font-bold p-8 md:p-0">
					<Link href="/">Book my Space.</Link>
				</h2>
				<div className="flex gap-4 mb-6 md:mb-0">
					{session ? (
						<>
							<Link
								href="/dashboard"
								className="hover:underline">
								Dashboard
							</Link>
							<Link
								href="/"
								onClick={() => signOut()}
								className="hover:underline">
								Logout
							</Link>
						</>
					) : (
						<Link
							href="/auth"
							className="hover:underline">
							Login/Signup
						</Link>
					)}
				</div>
			</nav>
		</header>
	);
}
