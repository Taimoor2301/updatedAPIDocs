import { options } from "./data";
import { Link } from "react-router-dom";

const Options = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto py-10 px-5 xl:px-0'>
			{options.map((o, i) => (
				<DetailItem key={i} {...o} />
			))}
		</div>
	);
};

export default Options;

const DetailItem = ({ Icon, heading, detail, link }) => {
	return (
		<div className='flex flex-col gap-2 py-5 px-5 bg-white'>
			<Icon className='text-2xl bg-primary text-white p-2 h-10 w-10 my-2' />

			<Link to={link} className='font-righteous text-md uppercase hover:text-primary '>
				{heading}
			</Link>
			<p className='text-gray-500 text-sm tracking-wide'>{detail}</p>
			<Link className='font-righteous text-primary' to={link}>
				Read more
			</Link>
		</div>
	);
};
