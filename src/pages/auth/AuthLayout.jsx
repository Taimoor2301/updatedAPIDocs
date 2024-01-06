import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
	return (
		<div className='bg-gray-100'>
			<main className='py-10 flex flex-col rounded-xl justify-center items-center gap-5 px-5 lg:px-0 bg-white'>
				<Outlet />
			</main>
		</div>
	);
}
