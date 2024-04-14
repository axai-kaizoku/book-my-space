'use client';
import { useRouter } from 'next/navigation';
import validateEmail from '@/utils/email-validate';
import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import validateMobile from '@/utils/mobile-validate';

export default function Authentication() {
	const router = useRouter();
	const session = useSession();
	const [error, setError] = useState<string>('');
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const [name, setName] = useState<string>('');
	const [mobile, setMobile] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [rePassword, setRePassword] = useState<string>('');
	const [terms, setTerms] = useState<boolean>(false);
	const [loginEmailOrNumber, setLoginEmailOrNumber] = useState<string>('');
	const [loginPassword, setLoginPassword] = useState<string>('');

	useEffect(() => {
		if (session?.status === 'authenticated') {
			setIsLogin(false);
		}
	}, [session, router]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setError('');

		if (isLogin) {
			const response = await fetch('/api/user', {
				method: 'POST',
				body: JSON.stringify({ loginEmailOrNumber }),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			console.log(data.email);
			const loginEmail = data.email;
			const loginMobile = data.mobile;

			console.log(loginEmail, loginMobile);
			console.log(loginEmailOrNumber, loginPassword, 'logged in successfully');

			const res = await signIn('credentials', {
				redirect: false,
				email: loginEmail,
				password: loginPassword,
			});

			if (res?.error) {
				setError('Invalid email or password');
				return;
			}

			if (res?.ok) router.replace('/');
			router.refresh();

			console.log(loginEmailOrNumber, loginPassword, 'logged in successfully');
			setLoginEmailOrNumber('');
			setLoginPassword('');
			setError('');
		} else {
			if (name.length < 3) {
				setError('Name must be at least 3 characters long.');
				return;
			}
			if (!validateMobile(mobile)) {
				setError('Invalid Mobile number.');
				return;
			}
			if (!validateEmail(email)) {
				setError('Invalid Email address.');
				return;
			}
			if (password.length < 8) {
				setError('Password must be at least 8 characters long.');
				return;
			}
			if (password !== rePassword) {
				setError('Re enter the same password');
				return;
			}
			if (!terms) {
				setError('Please accept the terms and conditions');
				return;
			}

			const response = await fetch('/api/signup', {
				method: 'POST',
				body: JSON.stringify({ name, mobile, email, password }),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.status === 400) {
				setError('Email is already in use');
				return;
			}
			if (response.status === 401) {
				setError('Mobile number is already in use');
				return;
			}

			console.log(
				name,
				email,
				password,
				mobile,
				terms,
				'Account created successfully',
			);
			setName('');
			setEmail('');
			setMobile('');
			setPassword('');
			setRePassword('');
			setTerms(false);
			setIsLogin(true);
			setError('');
		}
	};

	return (
		<>
			<section>
				<div className="bg-white flex flex-col items-center justify-center mx-auto py-8">
					<div className="w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<ul className="flex  p-2 bg-white border rounded-xl justify-between">
								<li
									className={`text-xl font-bold w-1/2 ${
										isLogin ? 'bg-slate-600 text-slate-100' : ''
									} p-2 rounded-xl text-center leading-tight tracking-tight text-gray-900 md:text-2xl `}
									onClick={() => setIsLogin(true)}>
									Login
								</li>
								<li
									className={`text-xl font-bold w-1/2 ${
										isLogin ? '' : 'bg-slate-600 text-slate-100'
									} p-2 rounded-xl text-center leading-tight tracking-tight text-gray-900 md:text-2xl `}
									onClick={() => setIsLogin(false)}>
									Signup
								</li>
							</ul>
							<form
								className="space-y-4 md:space-y-6"
								onSubmit={handleSubmit}>
								{isLogin ? (
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
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
												placeholder="name@example.com / 9909192900"
												required
												value={loginEmailOrNumber}
												onChange={(e) => setLoginEmailOrNumber(e.target.value)}
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
												value={loginPassword}
												onChange={(e) => setLoginPassword(e.target.value)}
											/>
										</div>
									</>
								) : (
									<>
										<div>
											<label
												htmlFor="name"
												className="block mb-2 text-sm font-medium text-gray-900 ">
												Your name
											</label>
											<input
												type="text"
												name="name"
												id="name"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
												placeholder="John"
												required
												value={name}
												onChange={(e) => setName(e.target.value)}
											/>
										</div>
										<div>
											<label
												htmlFor="number"
												className="block mb-2 text-sm font-medium text-gray-900 ">
												Your number
											</label>
											<input
												type="text"
												name="number"
												id="number"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
												placeholder="9909192900"
												required
												value={mobile}
												onChange={(e) => setMobile(e.target.value)}
											/>
										</div>
										<div>
											<label
												htmlFor="signinEmail"
												className="block mb-2 text-sm font-medium text-gray-900 ">
												Your email
											</label>
											<input
												type="email"
												name="email"
												id="signinEmail"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
												placeholder="name@example.com"
												required
												value={email}
												onChange={(e) => setEmail(e.target.value)}
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
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div>
										<div>
											<label
												htmlFor="signinRePassword"
												className="block mb-2 text-sm font-medium text-gray-900 ">
												Re-enter Password
											</label>
											<input
												type="password"
												name="repassword"
												id="signinRePassword"
												placeholder="••••••••"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
												required
												value={rePassword}
												onChange={(e) => setRePassword(e.target.value)}
											/>
										</div>
										<div className="flex items-center space-x-2">
											<input
												type="checkbox"
												className="font-medium text-sm"
												onClick={() => setTerms(!terms)}
											/>
											<label
												htmlFor="terms2"
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
												Accept terms and conditions
											</label>
										</div>
									</>
								)}
								<div>
									<span className="text-red-500">{error}</span>
								</div>
								<button
									type="submit"
									className="w-full border  text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
									{isLogin ? 'Login' : 'Signup'}
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
