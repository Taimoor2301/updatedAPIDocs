import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../../utils/useAxios";
import Spinner from "../../../../components/Spinner";

const HistoryTab = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const api = useAxios();

	const boughtProperties = async () => {
		try {
			setLoading(true);
			const data = await api.get("bought");
			setData(data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	const soldProperties = async () => {
		try {
			setLoading(true);
			const data = await api.get("sold");
			setData(data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		soldProperties();
	}, []);

	return (
		<div className='flex flex-col gap-5 p-5'>
			<select
				className='border-2 rounded w-max p-2 border-gray-800 font-poppins font-semibold'
				onChange={(e) => {
					if (e.target.value == "buying") {
						boughtProperties();
					} else {
						soldProperties();
					}
				}}
				name='history'
				id='history'>
				<option value='selling'>Selling</option>
				<option value='buying'>Buying</option>
			</select>

			{loading ? (
				<Spinner />
			) : data.length > 0 ? (
				data.map((el, i) => (
					<ListElement
						key={el.id}
						data={el}
						index={i}
					/>
				))
			) : (
				<div className='text-center font-medium'>No Documents</div>
			)}
		</div>
	);
};

export default HistoryTab;

const ListElement = ({ data, index }) => {
	return (
		<Link
			to={`/details/${data?.id}`}
			className='py-4 px-2 border-b flex items-center gap-5 w-full hover:bg-primary/50 transition-all rounded-lg text-xs'>
			<span className='w-12 md:w-8 bg-gray-800 text-white text-sm flex justify-center items-center aspect-square rounded-full'>{index + 1}</span>
			<span className='w-52 font-semibold'>{data?.owner_name}</span>
			<span className='w-full text-end font-medium underline'>{data?.property_type}</span>
		</Link>
	);
};
