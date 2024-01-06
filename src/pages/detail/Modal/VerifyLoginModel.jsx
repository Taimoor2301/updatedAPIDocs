import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Login from "../../auth/Login";
export default function VerifyLoginModel() {
	return (
		<motion.div className='bg-black/50 backdrop-blur-sm fixed w-screen h-screen left-0 top-0 grid place-content-center z-[99999]'>
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0 }}
				className='bg-white max-w-7xl mx-auto lg:w-[80vw] w-[95vw] h-[90vh] lg:h-[93vh] rounded-xl p-3 shadow-md flex flex-col justify-between py-8 items-center gap-10 relative'>
				<IoCloseCircleOutline className='absolute text-4xl right-3 top-3 cursor-pointer hover:text-red-600 transition-all duration-300' />

				<div className='flex flex-col w-full max-w-lg h-full border-2 border-purple-500 rounded-lg p-5 justify-between'>
					<Login />
				</div>
			</motion.div>
			<Toaster
				position='bottom-center'
				reverseOrder={false}
			/>
		</motion.div>
	);
}
