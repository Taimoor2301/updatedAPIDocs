import { data } from "./data";

const Search = () => {
	return (
		<div className='bg-white'>
			<div className='max-w-7xl mx-auto grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 gap-5 py-16 font-righteous px-5 xl:px-0'>
				<InputSelect {...data.status} />
				<InputSelect {...data.state} />
				<InputSelect {...data.bedrooms} />
				<InputSelect {...data.bathrooms} />
				<InputSelect {...data.type} />
				<InputSearch name={"minPrice"} placeholder='Min Price' />
				<InputSearch name={"maxPrice"} placeholder='Max Price' />
				<button className='bg-primary/90 text-white  text-xl hover:bg-primary'>Search</button>
			</div>
		</div>
	);
};

export default Search;

const InputSelect = ({ name, options, value, onChange }) => {
	return (
		<select name={name} className='col-span-1 p-2 border shadow-inner border-gray-300 text-lg'>
			{options.map((o) => (
				<option key={o}>{o}</option>
			))}
		</select>
	);
};

const InputSearch = ({ name, placeholder }) => {
	return (
		<input
			type='text'
			placeholder={placeholder}
			name={name}
			className='p-2 border border-gray-300 col-span-1 text-lg placeholder:text-gray-800 focus:placeholder:text-transparent'
		/>
	);
};
