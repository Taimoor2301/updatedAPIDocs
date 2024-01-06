import { register } from "swiper/element/bundle";

import "./slider.css";

register();

const Mainslider = () => {
	return (
		<div className='relative max-w-[1530px] mx-auto'>
			<swiper-container
				slides-per-view='1'
				speed='500'
				loop='true'
				autoPlay='true'>
				{images.map((i) => (
					<Slide
						key={i}
						img={i}
					/>
				))}
			</swiper-container>
		</div>
	);
};

export default Mainslider;

const images = [
	"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Slide = ({ img }) => {
	return (
		<swiper-slide>
			<div className='max-h-[80vh] relative'>
				<img
					src={img}
					className='object-cover object-center'
					alt='image'
				/>
				<div className='absolute inset-0 bg-black/40  flex justify-center items-center'>
					<div className='flex flex-col md:gap-3 gap-1 items-center fadein'>
						<h2 className='md:text-xl text-sm font-righteous font-thin tracking-wide text-white'>Real Estate Excellence</h2>
						<h1 className='text-2xl md:text-7xl font-bold text-white tracking-wide font-righteous'>
							Jaguar <span className='text-primary'>palace</span>
						</h1>
						<a
							href='#recentProperties'
							className='flex justify-center items-center text-sm md:text-2xl text-white bg-primary hover:scale-105 opacity-90 hover:opacity-100 transition-all duration-150 font-medium md:py-2.5 py-1 md:px-10 px-3'>
							Properties
						</a>
					</div>
				</div>
			</div>
		</swiper-slide>
	);
};
