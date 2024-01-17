import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import useAxios from "../../../../../utils/useAxios";

const EditUserModal = ({ closeModel }) => {
	const [loading, setLoading] = useState(false);
	const [userId, setUserId] = useState("");
	const [data, setData] = useState("");
	const api = useAxios();

	useEffect(() => {
		document.body.style.overflowY = "hidden";
		return () => (document.body.style.overflowY = "auto");
	}, []);

	return (
		<div
			className='bg-black/50 backdrop-blur-sm fixed w-screen h-screen left-0 top-0 grid place-content-center z-[99999]'
			onClick={() => closeModel(false)}>
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0 }}
				className='bg-white max-w-lg mx-auto w-[95vw] h-[90vh] lg:h-[93vh] rounded-xl p-3 shadow-md flex flex-col py-8 items-center gap-10 relative'
				onClick={(e) => e.stopPropagation()}>
				<IoCloseCircleOutline
					className='absolute text-4xl right-3 top-3 cursor-pointer hover:text-red-600 transition-all duration-300'
					onClick={() => closeModel(false)}
				/>

				<p className='text-lg font-poppins font-medium underline'>Edit User</p>
				<span>USERNAME</span>
			</motion.div>
		</div>
	);
};

export default EditUserModal;
