import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="w-full">
			{/* Hero section */}
			<section className="flex w-full flex-col md:flex-row pt-16 lg:pt-24">
				<div className="flex w-full lg:w-2/4 flex-col">
					<h1 className="text-7xl max-sm:text-5xl font-semibold py-8 px-10 whitespace-break-spaces leading-none">
						A space for
						<br />
						work, a space
						<br />
						for play
					</h1>
					<Link
						href="/book-room"
						className="text-left mx-10 px-6 py-4 w-fit border-black border">
						Book Now
					</Link>
				</div>
				<div className="w-full lg:w-2/4 mt-6 lg:mt-0">
					<Image
						src="/hero.jpg"
						alt="room"
						width={800}
						height={500}
					/>
				</div>
			</section>
			{/* 2nd section */}
			<section className="flex w-full flex-col md:flex-row pt-10 gap-6 md:gap-20">
				<div className="flex w-full lg:w-2/4 flex-col">
					<h2 className="text-6xl max-sm:text-5xl font-semibold py-8 md:py-20 px-10 whitespace-break-spaces leading-tight">
						A place for
						<br />
						everyone
					</h2>
					<Image
						src="/room.jpg"
						alt="room"
						width={800}
						height={500}
					/>
				</div>
				<div className="w-full lg:w-2/4 mt-6 px-8 lg:mt-0">
					<p className="pt-4 md:pt-56 text-lg ">
						Discover tailored accommodations for every traveler. From serene
						retreats to vibrant spaces, find your perfect getaway. Get your
						rooms booked from anywhere any time.
					</p>
					<div className="w-11/12 flex  pt-12 md:pt-40 gap-8 flex-col">
						<Link
							href="/book-room"
							className=" items-center flex justify-center w-full h-12 border-black border">
							One Night
						</Link>
						<Link
							href="/book-room"
							className="items-center flex justify-center w-full h-12 border-black border">
							Two Nights
						</Link>
						<Link
							href="/book-room"
							className="items-center flex justify-center w-full h-12 border-black border">
							One Week
						</Link>
					</div>
				</div>
			</section>
			{/* 3rd section */}
			<section className="flex w-full flex-col md:flex-row pt-10 p-16 justify-center gap-6 md:gap-20">
				<div className="flex justify-between gap-20 items-center w-full lg:w-2/5 flex-col border p-10 ">
					<Image
						src="/privacy.jpg"
						alt="privacy"
						width={300}
						height={300}
					/>
					<hr className="border-slate-700 border w-full" />
					<p>
						Experience tranquility in our private rooms, ensuring secluded
						comfort. Escape into serenity with our discreet accommodations,
						offering the ultimate privacy for your stay.
					</p>
				</div>
				<div className="flex justify-between gap-20 items-center w-full lg:w-2/5 flex-col border p-10 ">
					<Image
						src="/book.jpg"
						alt="book"
						width={300}
						height={300}
					/>
					<hr className="border-slate-700 border w-full" />
					<p>
						Experience convenience at its peak with our 24/7 booking
						availability. Seamlessly reserve your ideal room anytime, ensuring
						effortless planning for your stay.
					</p>
				</div>
			</section>
			<Footer />
		</div>
	);
}
