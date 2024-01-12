import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { getLink } from "../../../utils/getLink";
import toast, { Toaster } from "react-hot-toast";
import useAxios from "../../../utils/useAxios";
import Spinner from "../../../components/Spinner";

const EditDataModal = ({ closeModel, setAdded, id }) => {
	const api = useAxios();

	const dataTemplate = {
		property_type: "commercial",
		location: "abc",
		description: "",
		pictures: "",
		latitude: "",
		longitude: "",
		google_plus_code: "",
		deed_of_ownership: "",
		appraisal: "",
		owner_name: "",
		owner_address: "",
		owner_percentage: "",
	};

	useEffect(() => {
		document.body.style.overflowY = "hidden";
		return () => (document.body.style.overflowY = "auto");
	}, []);

	const [data, setData] = useState(dataTemplate);
	const [image, setImage] = useState(null);
	const [appraisal, setAppraisal] = useState(null);
	const [deed, setDeed] = useState(null);
	const [loading, setLoading] = useState(false);
	const [fetchingData, setFetchingData] = useState(true);

	const fetchData = async () => {
		try {
			setFetchingData(true);
			const response = await api.get(`properties/${id}`);
			setData(response.data);
			// console.log(response.data);
			setFetchingData(false);
		} catch (error) {
			console.log(error);
			setFetchingData(false);
			toast.error("something went wong");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handlePostRequest = async () => {
		try {
			setLoading(true);
			const imageLink = image ? await getLink(image) : null;
			const appraisalLink = appraisal ? await getLink(appraisal) : null;
			const deedLink = deed ? await getLink(deed) : null;

			const response = await api.put(`properties/${id}/`, {
				...data,
				pictures: imageLink || data.pictures,
				appraisal: appraisalLink || data.appraisal,
				deed_of_ownership: deedLink || data.deed_of_ownership,
			});
			console.log(response.data);
			toast.success("Successfully added property");
			setLoading(false);
			closeModel(false);
			setAdded((prev) => !prev);
			// Handle success, e.g., close the modal or show a success message
		} catch (error) {
			console.error("Error adding property:", error);
			toast.error("Error adding property");
			setLoading(false);
			// Handle error, e.g., show an error message
		}
	};

	return (
		<motion.div
			className='bg-black/50 hover:text-gray-800 text-gray-800 backdrop-blur-sm fixed w-screen h-screen left-0 top-0 grid place-content-center z-[99999]'
			onClick={() => closeModel(false)}>
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0 }}
				className='bg-white max-w-7xl mx-auto lg:w-[80vw] w-[95vw] h-[90vh] lg:h-[93vh] rounded-xl p-3 shadow-md flex flex-col justify-between py-8 items-center gap-10 relative'
				onClick={(e) => e.stopPropagation()}>
				<IoCloseCircleOutline
					className='absolute text-4xl right-3 top-3 cursor-pointer hover:text-red-600 transition-all duration-300'
					onClick={() => closeModel(false)}
				/>
				<h1 className='text-lg font-poppins font-medium underline'>Edit Document</h1>

				{fetchingData ? (
					<div className='w-full h-full grid place-content-center'>
						<Spinner />
					</div>
				) : (
					<div className='grid grid-cols-2 md:grid-cols-4 gap-5 text-sm font-poppins w-full overflow-auto flex-1'>
						{/*  type  */}
						<label
							htmlFor=''
							className='flex flex-col gap-1 col-span-1 items-start '>
							Property Type
							<select
								value={data.property_type}
								className='border border-gray-400 rounded-lg p-1'
								onChange={(e) => setData((prev) => ({ ...prev, property_type: e.target.value }))}>
								<option value='commercial'>Commercial</option>
								<option value='residential'>Residential</option>
							</select>
						</label>

						{/* location  */}
						<label className='col-span-1 flex flex-col gap-1'>
							Location
							<div className='flex gap-2 flex-wrap'>
								<input
									className='border border-gray-400 rounded-lg p-2 w-28'
									type='number'
									name='lattitude'
									value={data.latitude}
									onChange={(e) => setData((p) => ({ ...p, latitude: e.target.value }))}
									placeholder='lattitude'
								/>
								<input
									className='border border-gray-400 rounded-lg p-2 w-28'
									type='number'
									name='longitude'
									value={data.longitude}
									onChange={(e) => setData((p) => ({ ...p, longitude: e.target.value }))}
									placeholder='longitude'
								/>
							</div>
						</label>

						{/* pics  */}
						<label className='col-span-2 flex flex-col gap-2'>
							Upload Pictures
							<input
								type='file'
								className='file:border-none file:text-white file:bg-gray-800 file:p-1.5 border border-gray-400 rounded-lg file:hover:bg-primary file:transition-all'
								id='property_pictures'
								onChange={(e) => setImage(e)}
							/>
						</label>

						{/* description  */}
						<label className='col-span-full flex flex-col gap-2'>
							Property Description
							<textarea
								name='PropertyDescription'
								cols='20'
								rows='5'
								value={data.description}
								placeholder='description...'
								className='rounded-lg border border-gray-400 p-2'
								onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}></textarea>
						</label>

						{/* google code  */}
						<label className='col-span-1 flex flex-col gap-2'>
							Google Plus Code
							<input
								name='googlePlusCode'
								type='text'
								value={data.google_plus_code}
								placeholder='google plus code...'
								className='rounded-lg border border-gray-400 p-2'
								onChange={(e) => setData((prev) => ({ ...prev, google_plus_code: e.target.value }))}
							/>
						</label>

						{/* Deed of ownership  */}
						<label className='col-span-1 flex flex-col gap-2'>
							Deed of Ownership
							<input
								name='deedofownership'
								type='file'
								className='file:border-none file:text-white file:bg-gray-800 file:p-1.5 border border-gray-400 rounded-lg file:hover:bg-primary file:transition-all'
								onChange={(e) => setDeed(e)}
							/>
						</label>

						{/* appraisal  */}
						<label className='col-span-1 flex flex-col gap-2'>
							Appraisal
							<input
								name='appraisal'
								type='file'
								className='file:border-none file:text-white file:bg-gray-800 file:p-1.5 border border-gray-400 rounded-lg file:hover:bg-primary file:transition-all'
								onChange={(e) => setAppraisal(e)}
							/>
						</label>

						{/* owner  */}
						<label className='col-span-full flex flex-col gap-2'>
							Owner
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
								<input
									name='name'
									type='text'
									value={data.owner_name}
									placeholder='name...'
									className='rounded-lg border border-gray-400 p-2'
									onChange={(e) => setData((prev) => ({ ...prev, owner_name: e.target.value }))}
								/>
								<input
									name='address'
									type='text'
									value={data.owner_address}
									placeholder='address...'
									className='rounded-lg border border-gray-400 p-2'
									onChange={(e) => setData((prev) => ({ ...prev, owner_address: e.target.value }))}
								/>
								<input
									name='ownership'
									type='text'
									value={data.owner_percentage}
									placeholder='ownership %'
									className='rounded-lg border border-gray-400 p-2'
									onChange={(e) => setData((prev) => ({ ...prev, owner_percentage: e.target.value }))}
								/>
							</div>
						</label>

						<button
							className='p-2 rounded-lg bg-gray-700 flex items-center justify-center text-white text-sm font-poppins font-medium gap-2 w-52 hover:bg-primary transition-all group h-12'
							onClick={handlePostRequest}>
							{loading ? "Please wait..." : "Submit"} <FaArrowRight className='group-hover:translate-x-2 transition-all' />
						</button>
					</div>
				)}
			</motion.div>
			<Toaster
				position='bottom-center'
				reverseOrder={false}
			/>
		</motion.div>
	);
};

export default EditDataModal;
