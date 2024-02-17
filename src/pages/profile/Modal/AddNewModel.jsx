import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { getLink } from "../../../utils/getLink";
import toast, { Toaster } from "react-hot-toast";
import useAxios from "../../../utils/useAxios";

const AddNewModel = ({ closeModel, setAdded }) => {
	const dataTemplate = {
		title: "",
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

	const api = useAxios();

	const handlePostRequest = async () => {
		try {
			setLoading(true);
			// Upload images
			const imageLink = await getLink(image);
			// Create FormData object for deed and appraisal
			const formData = new FormData();
			// Append other data to FormData
			for (const key in data) {
				formData.append(key, data[key]);
			}
			formData.append('deed_of_ownership', deed);
			formData.append('appraisal', appraisal);
			formData.append('pictures',imageLink);
			// Make the API request
			const response = await api.post(`properties/`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			console.log(response.data);
			toast.success("Successfully added property");
			setLoading(false);
			closeModel(false);
			setAdded((prev) => !prev);
		} catch (error) {
			console.error("Error adding property:", error);
			toast.error("Error adding property");
			setLoading(false);
		}
	};


	return (
		<motion.div
			className='bg-black/50 backdrop-blur-sm fixed w-screen h-screen left-0 top-0 grid place-content-center z-[99999]'
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

				<h1 className='text-lg font-poppins font-medium underline'>Add Property</h1>
				<form onSubmit={(e)=>{
				e.preventDefault();
				handlePostRequest(e)
				}}>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-5 text-sm font-poppins w-full overflow-auto flex-1' style={{overflow:'auto'}}>
					{/*  type  */}
					<label
						htmlFor=''
						className='flex flex-col gap-1 col-span-1 items-start '>
						Property Type *
						<select
							required={true}
							value={data.property_type}
							className='border border-gray-400 rounded-lg p-1'
							onChange={(e) => setData((prev) => ({ ...prev, property_type: e.target.value }))}>
							<option value='commercial'>Commercial</option>
							<option value='residential'>Residential</option>
						</select>
					</label>

					{/* location  */}
					<label className='col-span-1 flex flex-col gap-1'>
						Location *
						<div className='flex gap-2 flex-wrap'>
							<input
							required={true}
								className='border rounded-lg border-gray-400 p-2 w-28'
								type='number'
								name='Lattitude'
								value={data.latitude}
								onChange={(e) => setData((p) => ({ ...p, latitude: e.target.value }))}
								placeholder='Latitude'
							/>
							<input
								required={true}
								className='border border-gray-400 rounded-lg p-2 w-28'
								type='number'
								name='Longitude'
								value={data.longitude}
								onChange={(e) => setData((p) => ({ ...p, longitude: e.target.value }))}
								placeholder='Longitude'
							/>
						</div>
					</label>

					{/* pics  */}
					<label className='col-span-2 flex flex-col gap-2'>
						Upload Pictures *
						
						<input
							type='file'
							required={true}
							className='file:border-none file:p-1.5  file:rounded-tl-lg file:rounded-bl-lg border border-gray-400 rounded-lg file:bg-gray-800 file:text-white'
							id='property_pictures'
							onChange={(e) => setImage(e)}
						/>
					</label>

					{/* title  */}
					<label className='col-span-2 lg:grid-cols-1 flex flex-col gap-2'>
						Title *
						<input
							name='title'
							required={true}
							type='text'
							value={data.title}
							placeholder='Title'
							className='rounded-lg border border-gray-400 p-2'
							onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
						/>
					</label>

					{/* description  */}
					<label className='col-span-full flex flex-col gap-2'>
						Property Description *
						<textarea
							name='PropertyDescription'
							required={true}
							cols='20'
							rows='5'
							value={data.description}
							placeholder='Description'
							className='rounded-lg border border-gray-400 p-2'
							onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}></textarea>
					</label>

					{/* google code  */}
					<label className='col-span-1 flex flex-col gap-2'>
						Google Plus Code *
						<input
							name='googlePlusCode'
							required={true}
							type='text'
							value={data.google_plus_code}
							placeholder='Google Plus Code'
							className='rounded-lg border border-gray-400 p-2'
							onChange={(e) => setData((prev) => ({ ...prev, google_plus_code: e.target.value }))}
						/>
					</label>

					{/* Deed of ownership  */}
					<label className='col-span-2 lg:col-span-1 flex flex-col gap-2'>
						Deed of Ownership *
						<input
							name='Deedofownership'
							required={true}
							type='file'
							className='file:border-none file:p-1.5  file:rounded-tl-lg file:rounded-bl-lg border border-gray-400 rounded-lg file:bg-gray-800 file:text-white'
							onChange={(e) => setDeed(e.target.files[0])}
						/>
					</label>

					{/* appraisal  */}
					<label className='col-span-2 lg:col-span-1 flex flex-col gap-2'>
						Appraisal *
						<input
							name='Appraisal'
							required={true}
							type='file'
							className='file:border-none file:p-1.5  file:rounded-tl-lg file:rounded-bl-lg border border-gray-400 rounded-lg file:bg-gray-800 file:text-white'
							onChange={(e) => setAppraisal(e.target.files[0])}
						/>
					</label>

					{/* owner  */}
					<label className='col-span-full flex flex-col gap-2'>
						Owner *
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
							<input
								name='name'
								required={true}
								type='text'
								value={data.owner_name}
								placeholder='Name'
								className='rounded-lg border border-gray-400 p-2'
								onChange={(e) => setData((prev) => ({ ...prev, owner_name: e.target.value }))}
							/>
							<input
								name='address'
								required={true}
								type='text'
								value={data.owner_address}
								placeholder='Address'
								className='rounded-lg border border-gray-400 p-2'
								onChange={(e) => setData((prev) => ({ ...prev, owner_address: e.target.value }))}
							/>
							<input
								name='ownership'
								required={true}
								type='text'
								value={data.owner_percentage}
								placeholder='Ownership %'
								className='rounded-lg border border-gray-400 p-2'
								onChange={(e) => setData((prev) => ({ ...prev, owner_percentage: e.target.value }))}
							/>
						</div>
					</label>

					<button
						disabled={loading}
						className='p-2 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg bg-gray-800 flex items-center justify-center text-white text-sm font-poppins font-medium gap-2 w-52 hover:bg-primary transition-all group h-12'
						type="submit">
						{loading ? "Please wait..." : "Submit"} <FaArrowRight className='group-hover:translate-x-2 transition-all' />
					</button>
				</div>
				</form>
			</motion.div>
			
		</motion.div>
	);
};

export default AddNewModel;
