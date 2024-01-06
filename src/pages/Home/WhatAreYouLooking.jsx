import { FaHouse } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const WhatAreYouLooking = () => {
	return (
		<>
			<div className='bg-white'>
				<div className='mx-auto max-w-7xl py-10 font-righteous px-5 xl:px-0'>
					<h1 className='text-center text-primary font-bold tracking-wide text-4xl'>
						<span className='text-gray-800'>What Are You</span> Looking For
					</h1>
					<p className='text-center max-w-lg mx-auto text-sm text-gray-500 my-6'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi accusamus odio consectetur quos quia ex eaque, aliquid sunt maxime dolores
						numquam iusto molestias, obcaecati ratione doloribus aperiam aspernatur facilis optio.
					</p>

					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
						{data.map((item, i) => (
							<Item key={i} {...item} />
						))}
					</div>
				</div>
			</div>

			<div className='bg-primary'>
				<main className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 py-20 px-5 xl:px-0'>
					<AchivementElm title='Projects Done' number={1060} />
					<AchivementElm title='Satisfied Clients' number={920} />
					<AchivementElm title='Awards Win' number={460} />
					<AchivementElm title='Years Experience' number={820} />
				</main>
			</div>
		</>
	);
};

export default WhatAreYouLooking;

const data = [
	{
		name: "House",
		detail: "Nisi. Tellus lobortis dapibus erat eu et. Senectus quam vitae in arcu nisi quam",
		Icon: FaHouse,
	},
	{
		name: "Land",
		detail: "Nisi. Tellus lobortis dapibus erat eu et. Senectus quam vitae in arcu nisi quam",
		Icon: FaLocationDot,
	},
	{
		name: "Office",
		detail: "Nisi. Tellus lobortis dapibus erat eu et. Senectus quam vitae in arcu nisi quam",
		Icon: FaBuilding,
	},
	{
		name: "Business",
		detail: "Nisi. Tellus lobortis dapibus erat eu et. Senectus quam vitae in arcu nisi quam",
		Icon: MdWork,
	},
];

const Item = ({ name, detail, Icon, link }) => {
	return (
		<Link
			to={link}
			className='md:px-6 px-2 py-3 md:py-8 hover:bg-primary hover:text-white transition-all duration-500 ease-in-out bg-gray-200 flex flex-col items-center justify-center gap-2.5 col-span-1'>
			<Icon className='text-4xl' />
			<span className='text-xl font-bold tracking-wide'>{name}</span>
			<span className=' text-center font-sans text-xs md:text-base'>{detail}</span>
		</Link>
	);
};

const AchivementElm = ({ title, number }) => (
	<div className='flex flex-col text-white font-righteous items-center justify-center gap-5'>
		<span className='text-6xl'>{number}</span>

		<div className='bg-gray-800 rounded-full h-[5px] w-10'></div>

		<span className='tracking-wide text-lg text-gray-800'>{title}</span>
	</div>
);
