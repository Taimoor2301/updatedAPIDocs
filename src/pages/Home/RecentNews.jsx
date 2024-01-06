import React from "react";
import { Link } from "react-router-dom";
import { news } from "./data";

const RecentNews = () => {
	return (
		<div className='max-w-7xl mx-auto py-12 flex flex-col gap-5 items-center text-center'>
			<h1 className='text-4xl font-righteous text-gray-800 tracking-wide uppercase'>
				Recent <span className='text-primary'>News</span>
			</h1>
			<p className='max-w-xl'>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione hic ut magnam architecto sequi necessitatibus, cum delectus. Neque
				perspiciatis.
			</p>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 xl:px-0 gap-6'>
				{news.map((n, i) => (
					<NewsCard key={i} {...n} />
				))}
			</div>
		</div>
	);
};

export default RecentNews;

const NewsCard = ({ img, title, postedBy, date, detail, link }) => (
	<div className='col-span-1 gap-3 bg-white'>
		<div className=''>
			<img className='w-full h-full object-center object-cover' src={img} alt='' />
		</div>

		<div className='flex flex-col gap-2 text-left py-7 px-4'>
			<h1 className='text-xl text-gray-800 font-righteous tracking-wide'>{title}</h1>

			<p className='font-righteous capitalize text-gray-700'>
				posted by <span className='text-primary'>{postedBy}</span> on {date}
			</p>

			<p className='text-sm font-medium tracking-wide'>{detail}</p>

			<Link to={link} className='text-lg text-gray-800 font-righteous hover:text-primary transition-all tracking-wide w-max'>
				Read more
			</Link>
		</div>
	</div>
);
