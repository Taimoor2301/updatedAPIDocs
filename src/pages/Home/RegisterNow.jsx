import React from "react";
import { Link } from "react-router-dom";

const RegisterNow = () => {
	return (
		<div className='bg-primary'>
			<div className='mx-auto max-w-7xl lg:py-12 py-6 flex flex-col gap-5 lg:flex-row items-center justify-between px-5 xl:px-0'>
				<div className='flex flex-col gap-2 text-center lg:text-left'>
					<h1 className='font-righteous text-xl tracking-wide text-gray-800'>ARE YOU LOOKING FOR A HOUSE OR CUSTOMER FOR YOUR PROPERTY SALE?</h1>
					<p className='text-sm font-medium text-white'>
						Please click the button for register, we will become your best agent and help you for both.
					</p>
				</div>

				<Link
					className='px-4 py-2 border-2 border-white hover:bg-transparent transition-all bg-white hover:text-white text-xl text-gray-800 font-righteous tracking-wide'
					to={"/"}>
					Register Now
				</Link>
			</div>
		</div>
	);
};

export default RegisterNow;
