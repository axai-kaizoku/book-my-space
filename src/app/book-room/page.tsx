'use client';
import { RoomProps } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/use-user';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function BookRoom() {
	const user = useUser();
	const { data: session, status: sessionStatus } = useSession();

	const router = useRouter();
	const [error, setError] = useState<string>('');
	const [rooms, setRooms] = useState<RoomProps[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [checkIn, setCheckIn] = useState<string>();
	const [checkOut, setCheckOut] = useState<string>();
	const [person, setPerson] = useState<number>(1);
	const [bookingRooms, setBookingRooms] = useState<number>(1);

	useEffect(() => {
		if (sessionStatus === 'unauthenticated') {
			router.replace('/auth');
		}
	}, [sessionStatus, router]);

	const incrementRooms = () => {
		if (bookingRooms < 3) setBookingRooms(bookingRooms + 1);
	};

	const decrementRooms = () => {
		if (bookingRooms > 1) setBookingRooms(bookingRooms - 1);
	};

	const incrementPerson = () => {
		if (person < 5) setPerson(person + 1);
	};

	const decrementPerson = () => {
		if (person > 1) setPerson(person - 1);
	};

	var isBookingDisabled = true;

	if (person <= 2 && bookingRooms === 1) {
		isBookingDisabled = false;
	}
	if (person <= 4 && bookingRooms === 2) {
		isBookingDisabled = false;
	}
	if (person < 5 && bookingRooms === 3) {
		isBookingDisabled = false;
	}
	if (person === 5 && bookingRooms === 3) {
		isBookingDisabled = false;
	}

	const fetchRoomsAndAvailable = async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/room');
			const data = await response.json();
			setRooms(data);
			setLoading(false);
			const allRooms = rooms.map((room) => !room.isBooked);
			const anyRoomAvailable = allRooms.every((isBooked) => !isBooked);
			return !anyRoomAvailable;
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchRoomsAndAvailable();
	}, []);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const checkInDate = new Date(checkIn);
		const checkOutDate = new Date(checkOut);
		const currentTime = Date.now();

		if (await fetchRoomsAndAvailable()) {
			// Check if both dates are valid
			if (!isNaN(checkInDate) && !isNaN(checkOutDate)) {
				// Check if Check Out date is greater than Check In date
				if (checkOutDate > checkInDate) {
					// Check if both dates are greater than the current time
					if (
						checkInDate.getTime() > currentTime &&
						checkOutDate.getTime() > currentTime
					) {
						setError('');

						const orderBook = {
							persons: person,
							user: user?._id,
							checkIn: checkInDate,
							checkOut: checkOutDate,
						};
						// console.log(orderBook);
						const response = await fetch('/api/book-room', {
							method: 'POST',
							body: JSON.stringify(orderBook),
							headers: {
								'Content-Type': 'application/json',
							},
						});

						if (!response.ok) {
							throw new Error(`HTTP error! Status: ${response.status}`);
						}

						const data = await response.json();

						// console.log(data);
						await fetchRoomsAndAvailable();
						// console.log(await fetchRoomsAndAvailable());
					} else {
						setError('Both dates should be greater than the current time.');
					}
				} else {
					setError('Check Out date should be greater than Check In date.');
				}
			} else {
				setError('Invalid date format.');
			}
		} else {
			setError('No rooms available !');
			return;
		}
	};

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
				<div className="flex w-full flex-col md:flex-row">
					{/* Avaliable Rooms */}
					<div className="inset-0 z-20 w-11/12 md:w-2/5  flex flex-col items-center justify-center mx-auto pt-8 md:py-8">
						<div className="bg-white shadow-2xl bg-opacity-80 backdrop-filter backdrop-blur-sm p-8 rounded-lg">
							<h1
								className={`text-xl font-bold p-2 rounded-xl whitespace-nowrap leading-tight tracking-tight text-gray-900 md:text-2xl hover:cursor-default`}>
								Available Rooms
							</h1>
							<ul className="w-full flex flex-wrap gap-5 mt-2 p-8 overflow-y-auto max-h-[40vh]">
								{loading ? (
									<div className="flex flex-row justify-center items-center w-full ">
										<div className="w-9 h-9 border-t-8 rounded-full border-8 border-t-slate-500 border-gray-300 animate-spin"></div>
									</div>
								) : rooms.length > 0 ? (
									rooms.map((room: RoomProps) => (
										<li
											key={room._id}
											className={`w-48 flex flex-col justify-center h-40 border ${
												room.isBooked ? 'bg-red-400' : 'bg-green-400'
											} text-white rounded-lg`}>
											<p className="text-2xl font-semibold p-4">
												{room.roomNumber}
											</p>
											<div className="text-sm p-4">
												<p className="text-base font-semibold">Room Details</p>
												<p>
													<span className="font-semibold">Room Type: </span>
													{room.roomType}
												</p>
												<p>
													<span className="font-semibold">Max Occupancy: </span>
													{room.maxOccupancy}
												</p>
												<p>
													<span className="font-semibold">
														Price Per Night:{' '}
													</span>
													₹{room.pricePerNight}
												</p>
											</div>
										</li>
									))
								) : (
									<li className="text-center text-xl">No rooms!</li>
								)}
							</ul>
						</div>
					</div>
					{/* booking form */}
					<div className="inset-0 z-20 w-full md:w-2/6 h-[70vh] md:h-[100vh] flex flex-col items-center justify-center mx-auto py-4 md:py-8">
						<div className="bg-white shadow-2xl bg-opacity-80 backdrop-filter backdrop-blur-sm p-8 rounded-lg">
							<div className="w-full md:mt-0 sm:max-w-md xl:p-0 ">
								<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
									<h1
										className={`text-xl font-bold   p-2 rounded-xl whitespace-nowrap leading-tight tracking-tight text-gray-900 md:text-2xl hover:cursor-default`}>
										Book Room
									</h1>
									<form
										className="flex flex-wrap w-full gap-2"
										onSubmit={handleSubmit}>
										<div className="w-44">
											<label
												htmlFor="loginEmailOrNumber"
												className="block mb-2 w-fit text-sm font-medium text-gray-900 ">
												Check In
											</label>
											<input
												type="datetime-local"
												name="loginEmailOrNumber"
												id="loginEmailOrNumber"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-11/12 p-2.5"
												required
												value={checkIn}
												onChange={(e) => setCheckIn(e.target.value)}
											/>
										</div>
										<div className="w-44">
											<label
												htmlFor="signinPassword"
												className="block mb-2 text-sm w-fit font-medium text-gray-900 ">
												Check Out
											</label>
											<input
												type="datetime-local"
												name="password"
												id="signinPassword"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block  w-11/12 p-2.5"
												required
												value={checkOut}
												onChange={(e) => setCheckOut(e.target.value)}
											/>
										</div>
										<div className="flex  flex-col">
											<label
												htmlFor="signinPassword"
												className="block mb-2 text-sm font-medium text-gray-900 ">
												Rooms
											</label>
											<div className="flex gap-3 items-center justify-center">
												<Image
													src="/minus.svg"
													alt="minus"
													width={20}
													height={20}
													className="object-fit"
													onClick={() => decrementRooms()}
												/>
												<input
													type="number"
													name="password"
													id="signinPassword"
													className="w-8 bg-transparent border-b-2 border-b-black text-gray-900 sm:text-base   p-2.5"
													disabled
													value={bookingRooms}
												/>
												<Image
													src="/plus.svg"
													alt="plus"
													width={20}
													height={20}
													className="object-fit"
													onClick={() => incrementRooms()}
												/>
											</div>
										</div>
										<div className="flex pl-0  lg:pl-20 flex-col">
											<label
												htmlFor="signinPassword"
												className="block mb-2 text-sm font-medium text-gray-900 ">
												Adults and Children
											</label>
											<div className="flex gap-3 items-center justify-center">
												<Image
													src="/minus.svg"
													alt="minus"
													width={20}
													height={20}
													className="object-fit"
													onClick={() => decrementPerson()}
												/>
												<input
													type="number"
													name="password"
													id="signinPassword"
													className="w-8 bg-transparent border-b-2 border-b-black text-gray-900 sm:text-base   p-2.5"
													disabled
													value={person}
												/>
												<Image
													src="/plus.svg"
													alt="plus"
													width={20}
													height={20}
													className="object-fit"
													onClick={() => incrementPerson()}
												/>
											</div>
										</div>
										<div>
											<span className="text-red-500 my-4 text-sm">{error}</span>
										</div>
										<button
											type="submit"
											disabled={isBookingDisabled}
											className={`w-full ${
												isBookingDisabled ? '  cursor-not-allowed' : ''
											} mt-4 border-black border bg-slate-700 text-slate-100  font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
											Book
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
