import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import useAxious from "../../../../utils/useAxios";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import AddUserModal from "./AuthUserModals/Add";
import EditUserModal from "./AuthUserModals/Edit";
import Spinner from "../../../../components/Spinner";

export default function AuthorizedUsers({ users }) {
	const [openAddNewModel, setOpenAddNewModel] = useState(false);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const api = useAxious();
	const [active, setActive] = useState("Appraiser");
	const [filteredData, setFilteredData] = useState(null);

	async function fetchData() {
		setLoading(true);
		try {
			const res = await api.get(`/authorized_users/owner`);
			setData(res.data);
		} catch (error) {
			console.log(error);
			toast.error("unknown error has occoured");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (data.length > 0) {
			setFilteredData(data.filter((el) => el.role === active));
		}
	}, [data]);

	if (loading)
		return (
			<div className='flex w-full items-center justify-center py-2'>
				<Spinner />
			</div>
		);

	return (
		<div className='flex flex-col gap-8 col-span-full'>
			<div className='justify-between flex items-center'>
				<select
					className='border-2 rounded w-max p-1 border-gray-800 font-poppins font-semibold'
					onChange={(e) => {
						setActive(e.target.value);
					}}
					name='history'
					id='history'
					value={active}>
					<option value='selling'>Appraiser</option>
					<option value='buying'>Agent</option>
				</select>
				<button
					className='bg-gray-800 text-white text-xs p-2 w-28 rounded font-medium tracking-wider hover:bg-primary flex justify-center items-center gap-1 group self-end transition-all'
					onClick={() => setOpenAddNewModel(true)}>
					Add New <FaPlus className='group-hover:rotate-[270deg] transition-all duration-700' />
				</button>
			</div>

			<AnimatePresence>{openAddNewModel && <AddUserModal closeModel={setOpenAddNewModel} />}</AnimatePresence>

			<div className='flex flex-col font-poppins'>
				<div className='py-4 px-2 text-xs flex items-center gap-5 w-full bg-primary transition-all rounded-md border-2 border-gray-800 mb-5'>
					<span className='font-semibold'>S.no</span>
					<span className='w-52 font-semibold'>Name</span>
					<span className='w-full text-end font-medium underline'>Type</span>
				</div>

				<>
					{filteredData.map((item, i) => (
						<ListElement
							key={item.id}
							index={i}
							active={active}
							{...item}
						/>
					))}
				</>
			</div>

			<Toaster
				position='bottom-center'
				reverseOrder={false}
			/>
		</div>
	);
}

const ListElement = ({ active, id, profile_image, first_name, last_name }) => {
	const [openEditModal, setOpenEditModal] = useState(false);

	return (
		<div className='py-4 md:px-2 border-b flex items-center gap-5 w-full hover:bg-primary/50 transition-all rounded-lg  text-xs'>
			<AnimatePresence>
				{openEditModal && (
					<EditUserModal
						closeModel={setOpenEditModal}
						id={id}
					/>
				)}
			</AnimatePresence>

			<div className='w-[70px] md:w-8 text-xs bg-gray-800 text-white md:text-sm flex justify-center items-center aspect-square rounded-full overflow-hidden'>
				<img
					src={profile_image}
					alt='user profile image'
					className='max-w-full object-cover'
				/>
			</div>
			<span className='w-52 font-semibold'>{first_name + " " + last_name}</span>
			<div className='flex items-center gap-2 text-2xl'>
				<button
					title={active === "Agent" ? "Make Appraiser" : "Make Agent"}
					onClick={() => setOpenEditModal(true)}
					className='border-0 font-medium text-green-500 md:border-2 whitespace-nowrap p-0.5 rounded border-gray-800 md:text-gray-800 hover:text-white hover:bg-gray-800 text-[10px] md:text-xs'>
					{active === "Agent" ? "Make Appraiser" : "Make Agent"}
				</button>
				<MdDeleteForever
					onClick={() => null}
					className='hover:scale-150 hover:text-red-600 hover:-translate-y-1 transition-all duration-150'
					title='delete'
				/>
			</div>
			<span className='text-end font-medium underline w-full'>{active}</span>
		</div>
	);
};
