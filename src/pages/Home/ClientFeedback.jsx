import { register } from "swiper/element";
import { feedback } from "./data";
import { FaQuoteLeft } from "react-icons/fa";
register();

const ClientFeedback = () => {
	return (
		<div className='bg-white'>
			<div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:py-20 py-10 px-5 xl:px-0'>
				<div className='col-span-1'>
					<img
						className='object-cover w-full h-full object-center rounded-xl'
						src='https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHByb3BlcnR5fGVufDB8fDB8fHww'
						alt=''
					/>
				</div>
				<div className='col-span-1 lg:px-20 md:px-6 py-5 lg:py-32'>
					<swiper-container loop='true' slides-per-view='1' autoPlay='true'>
						{feedback.map((f, i) => (
							<FeedbackElm key={i} {...f} />
						))}
					</swiper-container>
				</div>
			</div>
		</div>
	);
};

export default ClientFeedback;

const FeedbackElm = ({ name, feedback }) => (
	<swiper-slide>
		<div className='flex flex-col gap-2 items-center text-center cursor-grab'>
			<h1 className='uppercase text-4xl font-righteous text-gray-800'>
				Clients <span className='text-primary'>Feedback</span>
			</h1>

			<p className='text-sm max-w-sm'>
				<FaQuoteLeft className='text-gray-300 text-2xl mt-2' />
				{feedback}
			</p>

			<span className='text-2xl font-righteous text-gray-800'>{name}</span>
		</div>
	</swiper-slide>
);
