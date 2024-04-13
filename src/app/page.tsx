import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Home() {
	return (
		<div className="w-full">
			{/* Hero section */}
			<section className="flex w-full flex-col md:flex-row pt-16 lg:pt-24">
				<div className="flex w-full lg:w-2/4 flex-col">
					<h1 className="text-7xl max-sm:text-5xl font-semibold py-8 px-10 whitespace-break-spaces leading-tight">
						A space for work, a space
						<br />
						for play
					</h1>
					<button className="text-left mx-10 px-6 py-4 w-fit border-black border">
						Book Now
					</button>
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
			<Footer />
		</div>
	);
}
