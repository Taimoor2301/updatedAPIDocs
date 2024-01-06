import { FaLocationDot } from "react-icons/fa6";
import { recentProperty } from "./data";
import { Link } from "react-router-dom";

const RecentProperties = () => {
	return (
		<div
			className='mx-auto max-w-7xl py-10 px-5 xl:px-0'
			id='recentProperties'>
			<div className='flex flex-col md:flex-row justify-between items-center py-10'>
				<div className='text-4xl font-righteous tracking-wide'>
					Recent <span className='text-primary'>Properties</span>
				</div>
				<Link className='text-md font-medium hover:text-base hover:text-primary'>View All Properties</Link>
			</div>

			<div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
				{recentProperty.map((p, i) => (
					<RecentElement
						key={i}
						{...p}
					/>
				))}
			</div>
		</div>
	);
};

export default RecentProperties;

const RecentElement = ({ image, landArea, bedrooms, bathrooms, location, heading, price, id }) => {
	return (
		<div className='bg-white font-righteous transition-all duration-300 rounded-xl overflow-hidden hover:shadow-[0_0_10px] hover:shadow-primary/70'>
			<Link
				to={`/file/${id}`}
				className='h-[250px] flex justify-center items-center'>
				<img
					src={image}
					className='h-full w-full object-cover'
					alt=''
				/>
			</Link>

			<div className='flex flex-col gap-3 py-4 px-3'>
				<Link
					to={`/file/${id}`}
					className='font-bold tracking-wider hover:text-primary'>
					{heading}
				</Link>

				<span className='text-gray-500 text-sm flex items-center gap-2'>
					<FaLocationDot />
					{location}
				</span>
				<span className='text-center text-orange-600 font-bold tracking-widest text-2xl'>${price}</span>
				<div className='flex gap-2 items-center flex-wrap'>
					<span className=' text-gray-500'>
						Bedrooms: <span className='text-black'>{bedrooms}</span>
					</span>
					<span className='text-gray-500'>
						Bathrooms: <span className='text-black'>{bathrooms}</span>
					</span>
					<span className='text-gray-500'>
						Land Size:{" "}
						<span className='text-black'>
							{landArea} ft <sup>2</sup>
						</span>
					</span>
				</div>

				<div className='flex items-center'>
					<span className='text-gray-500 text-sm'>2 years ago</span>
					<Link
						className='hover:bg-primary bg-gray-800 transition-all duration-300 text-white  font-medium py-1.5 px-3 ml-10'
						to={`/file/${id}`}>
						Details
					</Link>
				</div>
			</div>
		</div>
	);
};
