import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import useAxious from "../../../../../utils/useAxios";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import AddApiKey from "./APIKeyModals/Add";
import { FaCopy } from "react-icons/fa";
import copyToClipboard from 'elastic-copy-paste'
export default function APIKey({ users }) {
	const [openAddNewModel, setOpenAddNewModel] = useState(false);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false)

	const api = useAxious();

	const getProperties = async () => {
		setLoading(true)
		try {
			const response = await api.get("/apikey/list/");
			setData(response.data);
		} catch (error) {

			console.log(error);
		}
		setLoading(false)
	};

	const generateApiKey = async (data) => {
		setLoading(true)
		try {
			const response = await api.post("/apikey/create/", data);
			getProperties()
		} catch (error) {
			console.log(error);
		}
		setLoading(false)
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

	const handleCopy=(textToCopy)=>{
		copyToClipboard(textToCopy)
		.then((success) => {
			if (success) {
				toast.success('Text copied successfully!');
			} else {
				toast.error('Failed to copy text.');
			}
		})
		.catch((error) => {
			toast.error('Error during copy:', error);
		});
	}

	useEffect(() => {
		getProperties();
	}, []);

	return (
		<div className='flex flex-col gap-8 col-span-full'>
			<button
				className='bg-gray-800 text-white text-xs p-2 w-28 rounded font-medium tracking-wider hover:bg-primary flex justify-center items-center gap-1 group self-end transition-all'
				onClick={() => setOpenAddNewModel(true)}>
				Add New <FaPlus className='group-hover:rotate-[270deg] transition-all duration-700' />
			</button>

			<AnimatePresence>{openAddNewModel && <AddApiKey closeModel={setOpenAddNewModel} generate={generateApiKey} loading={loading} />}</AnimatePresence>

			<div className='flex flex-col font-poppins'>
				<div className='py-4 px-2 text-xs flex items-center gap-5 w-full bg-primary transition-all rounded-md border-2 border-gray-800 mb-5'>
					<span className='w-52 font-semibold'>Name</span>
					<span className='w-31 text-end font-medium underline'>Key</span>
					<span className='w-52 text-end font-medium underline'>Actions</span>

				</div>

				<>
					{data.map((item, i) => (
						<ListElement
							key={item.id}
							index={i}
							handleCopy={handleCopy}
							deleteProperty={deleteProperty}
							{...item}
						/>
					))}
				</>
			</div>


		</div>
	);
}

const ListElement = ({ api_key, id, api_key_name, index, deleteProperty, write, handleCopy }) => {
	const [openEditModal, setOpenEditModal] = useState(false);

	return (
		<div className='py-4 md:px-2 border-b flex items-center gap-5 w-full hover:bg-primary/50 transition-all rounded-lg  text-xs'>
			<span className='w-52 font-semibold'>{api_key_name}</span>
			<span className='w-52 font-semibold'>{api_key.slice(0, 3)}****{api_key.slice(29, 32)}({write ? 'Read/Write' : 'Read Only'})</span>
			<div className='flex items-center gap-2 text-2xl'>
				<FaCopy
					title='Copy'
					onClick={() => {handleCopy(api_key)}}
					className='hover:scale-150 hover:text-gray-800 hover:-translate-y-1 transition-all duration-150'
				/>
				<MdDeleteForever
					onClick={() => deleteProperty(id)}
					className='hover:scale-150 hover:text-red-600 hover:-translate-y-1 transition-all duration-150'
					title='Delete'
				/>
			</div>

		</div>
	);
};
