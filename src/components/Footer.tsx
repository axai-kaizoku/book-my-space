import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className=" bg-footer-bg text-white flex flex-col h-fit mt-8 justify-between w-full py-16">
			<h2 className="text-4xl font-semibold px-10 md:px-36 py-10">
				Book my Space.
			</h2>
			<div className="flex flex-col md:flex-row justify-between w-full items-center px-36 py-5 gap-5">
				<div className="border-slate-50 rounded-sm border-2 p-4 w-[300px] h-[200px] flex flex-col gap-12">
					<h3 className="text-2xl font-semibold">Join our community</h3>
					<p className="whitespace-break-spaces text-sm">
						123 Anywhere St, Any City ST 12345 Tel: +123-456-7890
						hello@nicesite.com
					</p>
				</div>
				<div className="border-slate-50 rounded-sm border-2 p-4 w-[300px] h-[200px] flex flex-col gap-12">
					<h3 className="text-2xl font-semibold">Business Hours</h3>
					<p className="whitespace-break-spaces text-sm">
						Monday-Friday: 9AM - 6PM Saturday: 9AM - 12PM
					</p>
				</div>
				<div className="border-slate-50 rounded-sm border-2 p-4 w-[300px] h-[200px] flex flex-col justify-between">
					<h3 className="text-2xl font-semibold">Get social</h3>
					<ul className="flex gap-3">
						<li>
							<Image
								src="/facebook.svg"
								width={30}
								height={30}
								alt="facebook"
								className="object-contain cursor-pointer"
							/>
						</li>
						<li>
							<Image
								src="/insta.svg"
								width={30}
								height={30}
								alt="insta"
								className="object-contain cursor-pointer"
							/>
						</li>
						<li>
							<Image
								src="/twitter.svg"
								width={30}
								height={30}
								alt="twitter"
								className="object-contain cursor-pointer"
							/>
						</li>
						<li>
							<Link
								href="https://github.com/axai-kaizoku"
								target="_blank">
								<Image
									src="/github-white.svg"
									width={30}
									height={30}
									alt="twitter"
									className="object-contain"
								/>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}
