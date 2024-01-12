import React, { useEffect, useState } from "react";
import { data } from "../data";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

export default function Sidebar() {
	const [openSidebar, setOpensidebar] = useState(false);

	useEffect(() => {
		document.body.style.overflowY = openSidebar ? "hidden" : "auto";
	}, [openSidebar]);

	const [active, setActive] = useState(data[0].id);

	return (
		<>
			<div className='text-3xl fixed bottom-5 left-5 p-2 rounded-lg bg-primary text-white lg:hidden'>
				<FaBars onClick={() => setOpensidebar(true)} />
			</div>

			<div
				className={`${
					openSidebar ? "w-full" : "w-0"
				} lg:w-full transition-all duration-500 lg:static fixed inset-0 lg:col-span-2 border h-screen lg:h-auto max-h-full overflow-auto  bg-gray-50 font-poppins z-[99999999999999] lg:z-[99]`}>
				<h1 className='text-2xl pt-5 px-5 font-semibold text-gray-700 flex justify-between'>
					Contents{" "}
					<ImCross
						className='lg:hidden'
						onClick={() => setOpensidebar(false)}
					/>{" "}
				</h1>

				<div className='flex flex-col gap-4 p-5 overflow-y-auto py-5'>
					{data.map((t) => (
						<TopicName
							active={active}
							setActive={setActive}
							{...t}
							key={t.id}
							setOpensidebar={setOpensidebar}
						/>
					))}
				</div>
			</div>
		</>
	);
}

const TopicName = ({ title, id, setOpensidebar, active, setActive }) => {
	return (
		<a
			className={`lg:p-3 py-2 hover:bg-primary border ${
				active === id && "bg-primary text-white"
			} duration-300 transition-all lg:rounded-lg min-w-max`}
			href={`#${id}`}
			onClick={() => {
				setActive(id);
				setOpensidebar(false);
			}}>
			{title}
		</a>
	);
};
