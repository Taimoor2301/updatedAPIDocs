import React, { useState } from "react";
import APIkey from "./API_Key/APIKey";
import AuthorizedUsers from "./Auth_users/AuthorizedUsers";
import AuthorizedDocs from "./Auth_Docs/AuthorizedDocs";

export default function Settings() {
	const [active, setActive] = useState("API Key");
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-5 relative'>
			<p className='text-2xl font-poppins font-bold tracking-wide col-span-full text-center py-6'>Settings</p>

			<ButtonList
				active={active}
				setActive={setActive}
			/>

			{buttons.map((but) => (but.name === active ? <but.el key={but.name} /> : null))}
		</div>
	);
}

const ButtonList = ({ active, setActive }) => {
	function TabButton({ name, active, onclick }) {
		return (
			<button
				onClick={() => onclick(name)}
				className={`${active === name && "bg-primary text-white"} font-poppins md:text-lg text-xs font-medium transition-all duration-500 py-2 px-5`}>
				{name}
			</button>
		);
	}
	return (
		<div className='col-span-full flex justify-center items-center'>
			<div className='border-2 overflow-hidden rounded-md border-gray-800 grid grid-cols-3'>
				{buttons.map((i) => (
					<TabButton
						key={i.name}
						name={i.name}
						active={active}
						onclick={setActive}
					/>
				))}
			</div>
		</div>
	);
};

const buttons = [
	{ name: "API Key", el: APIkey },
	{ name: "Authorized Users", el: AuthorizedUsers },
	{ name: "Authorized Docs", el: AuthorizedDocs },
];
