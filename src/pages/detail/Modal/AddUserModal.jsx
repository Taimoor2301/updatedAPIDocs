import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../../../utils/constants";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";

export default function AddNewUser({ closeModal }) {
	const [loading, setLoading] = useState(false);
	const [userId, setUserId] = useState("");
	const { id } = useParams();

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = "auto");
	}, []);

	async function searchUser(e) {
		e.preventDefault();
		setLoading(true);
		alert(userId);
	}

	return (
		<div
			className='bg-black/50 backdrop-blur-sm fixed w-screen h-screen left-0 top-0 grid place-content-center z-[99999]'
			onClick={() => closeModal(false)}>
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0 }}
				onClick={(e) => e.stopPropagation()}
				className='bg-white max-w-xl mx-auto lg:w-[80vw] w-[95vw] h-[90vh] lg:h-[93vh] rounded-xl p-3 shadow-md flex flex-col py-8 items-center gap-10 relative'>
				<IoCloseCircleOutline
					onClick={() => closeModal(false)}
					className='absolute text-4xl right-3 top-3 cursor-pointer hover:text-red-600 transition-all duration-300'
				/>

				<h1 className='text-xl font-bold text-center'>Authorize New User</h1>

				<form
					className='flex gap-2 w-full'
					onSubmit={searchUser}>
					<input
						type='text'
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						placeholder='Enter User ID'
						className='p-2 flex-1 rounded-md border border-gray-700 bg-gray-50'
					/>

					<button
						type='submit'
						disabled={loading}
						className='text-white font-medium bg-gray-800 hover:bg-primary disabled:hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-80 px-4 py-2 rounded text-lg transition-all w-[10rem] max-h-full'>
						{loading ? <Spinner /> : "Search"}
					</button>
				</form>
			</motion.div>
		</div>
	);
}

const ListElement = ({ data, setSelected }) => {
	return (
		<div className='py-4 px-2 border-b flex items-center gap-5 w-full rounded-lg text-xs relative group'>
			<IoCloseCircle
				onClick={() => setSelected(data.user)}
				className='text-red-500 text-2xl opacity-0 group-hover:opacity-100 absolute top-[-5px] right-[-5px] transition-all hover:scale-150'
				title='remove user'
			/>
			<img
				src={data.profile_photo}
				alt=''
				className='w-8 aspect-square rounded-full border-2 border-gray-700 object-cover'
			/>
			<span className='w-52 font-semibold'>{data?.username}</span>
			<span className='w-full text-end font-medium underline'>{data?.date}</span>
		</div>
	);
};
