import { FaEye, FaPlus, FaClipboardList } from "react-icons/fa";
import AddNewModel from "../Modal/AddNewModel";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import useAxious from "../../../utils/useAxios";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import EditDataModal from "../Modal/EditDataModal";
import ListingModal from "../Modal/ListingModal";

const ListingTab = () => {
	const [openAddNewModel, setOpenAddNewModel] = useState(false);
	const [data, setData] = useState([]);
	const [added, setAdded] = useState(true);
	const [unListed, setUlisted] = useState(false);

	const api = useAxious();

	const getProperties = async () => {
		try {
			const response = await api.get("/properties");
			setData(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteProperty = async (id) => {
		try {
			const confirm = window.confirm("Confirm Delete");
			if (confirm) {
				const response = await api.delete(`/properties/${id}`);
				console.log(response);
				toast.success("deleted successfully");
				setAdded((prev) => !prev);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong...");
		}
	};

	useEffect(() => {
		getProperties();
	}, [added]);

	return (
		<div className='flex flex-col gap-8'>
			<button
				className='bg-gray-800 text-white text-xs p-2 w-28 rounded font-medium tracking-wider hover:bg-primary flex justify-center items-center gap-1 group self-end transition-all'
				onClick={() => setOpenAddNewModel(true)}>
				Add New <FaPlus className='group-hover:rotate-[270deg] transition-all duration-700' />
			</button>

			<AnimatePresence>
				{openAddNewModel && (
					<AddNewModel
						closeModel={setOpenAddNewModel}
						setAdded={setAdded}
					/>
				)}
			</AnimatePresence>

			<div className='flex flex-col font-poppins'>
				<div className='py-4 px-2 border-b text-xs flex items-center gap-5 w-full bg-primary transition-all rounded-lg text-white mb-5'>
					<span className='font-semibold'>S.no</span>
					<span className='w-52 font-semibold'>Owner Name</span>
					<span className='w-full text-end font-medium underline'>Type</span>
				</div>
				{unListed ? (
					<>
						{data.map((item, i) => (
							<ListElement
								key={item.id}
								index={i}
								deleteProperty={deleteProperty}
								setAdded={setAdded}
								{...item}
							/>
						))}
					</>
				) : (
					<>
						{data.map((item, i) => (
							<ListElement
								key={item.id}
								index={i}
								deleteProperty={deleteProperty}
								setAdded={setAdded}
								{...item}
							/>
						))}
					</>
				)}
			</div>

			<Toaster
				position='bottom-center'
				reverseOrder={false}
			/>
		</div>
	);
};

export default ListingTab;

const ListElement = ({ property_type, id, owner_name, index, deleteProperty, setAdded, listed_on }) => {
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openListingModal, setOpenListingModal] = useState(false);

	return (
		<div className='py-4 md:px-2 border-b flex items-center gap-5 w-full hover:bg-primary/50 transition-all rounded-lg  text-xs'>
			<AnimatePresence>
				{openEditModal && (
					<EditDataModal
						closeModel={setOpenEditModal}
						setAdded={setAdded}
						id={id}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{openListingModal && (
					<ListingModal
						closeModel={setOpenListingModal}
						id={id}
					/>
				)}
			</AnimatePresence>
			<span className='w-[70px] md:w-8 text-xs bg-primary text-white md:text-sm flex justify-center items-center aspect-square rounded-full'>
				{index + 1}
			</span>
			<span className='w-52 font-semibold'>{owner_name}</span>
			<div className='flex items-center gap-2 text-2xl'>
				<Link to={`/details/${id}`}>
					<FaEye
						title='view'
						className='hover:scale-150 hover:-translate-y-1 transition-all duration-150 hover:text-gray-800'
					/>
				</Link>
				<MdEditSquare
					title='edit'
					onClick={() => setOpenEditModal(true)}
					className='hover:scale-150 hover:text-gray-800 hover:-translate-y-1 transition-all duration-150'
				/>
				<MdDeleteForever
					onClick={() => deleteProperty(id)}
					className='hover:scale-150 hover:text-red-600 hover:-translate-y-1 transition-all duration-150'
					title='delete'
				/>

				<FaClipboardList
					title='add to listing'
					onClick={() => setOpenListingModal(true)}
					className='hover:scale-150 hover:-translate-y-1 transition-all duration-150 hover:text-gray-800'
				/>
			</div>
			<span className='text-end font-medium underline w-full'>{property_type}</span>
		</div>
	);
};
