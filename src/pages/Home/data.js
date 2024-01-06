import { FaHouse } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
export const data = {
	status: {
		name: "Status",
		options: ["Any Status", "For Rent", "For Sale"],
	},
	state: {
		name: "state",
		options: ["Any State", "New York", "Washington", "Caofornia"],
	},
	bedrooms: {
		name: "bedrooms",
		options: ["Bedrooms", 1, 2, 3],
	},
	bathrooms: {
		name: "bathrooms",
		options: ["Bathrooms", 1, 2, 3],
	},
	type: {
		name: "type",
		options: ["Any Type", "house", "office", "appartment"],
	},
};

export const options = [
	{
		heading: "property booking",
		detail: "Nunc. Lectus eget. Iaculis dui velit velit turpis lacus nostra a aliquet integer",
		link: "/",
		Icon: FaBuilding,
	},

	{
		heading: "payment guarantee",
		detail: "Nunc. Lectus eget. Iaculis dui velit velit turpis lacus nostra a aliquet integer",
		link: "/",
		Icon: FaPencilAlt,
	},
	{
		heading: "house managment",
		detail: "Nunc. Lectus eget. Iaculis dui velit velit turpis lacus nostra a aliquet integer",
		link: "/",
		Icon: FaHouse,
	},
	{
		heading: "Property deal",
		detail: "Nunc. Lectus eget. Iaculis dui velit velit turpis lacus nostra a aliquet integer",
		link: "/",
		Icon: MdWork,
	},
];

export const recentProperty = [
	{
		id: 1,
		type: "Commercial",
		heading: "Popular apartment in the Multan",
		location: "122N Morgan St, Chicago , IL 60607 , USA",
		price: "1,300.00",
		bedrooms: 3,
		bathrooms: 2,
		landArea: 110,
		image:
			"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb3BlcnR5fGVufDB8fDB8fHww",
	},
	{
		id: 2,
		heading: "Popular apartment in the Islamabad",
		location: "122N Morgan St, Chicago , IL 60607 , USA",
		price: "1,300.00",
		bedrooms: 3,
		type: "Commercial",
		bathrooms: 2,
		landArea: 110,
		image:
			"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb3BlcnR5fGVufDB8fDB8fHww",
	},
	{
		id: 3,
		heading: "Palaza in Rawalpindi Pakistan",
		location: "122N Morgan St, Chicago , IL 60607 , USA",
		price: "1,300.00",
		bedrooms: 3,
		type: "Commercial",
		bathrooms: 2,
		landArea: 110,
		image:
			"https://images.unsplash.com/photo-1448630360428-65456885c650?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D",
	},
	{
		id: 4,
		heading: "Popular apartment in the Karachi",
		location: "122N Morgan St, Chicago , IL 60607 , USA",
		price: "1,300.00",
		bedrooms: 3,
		type: "Recidential",
		bathrooms: 2,
		landArea: 110,
		image:
			"https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb3BlcnR5fGVufDB8fDB8fHww",
	},
	{
		id: 5,
		type: "Recidential",
		heading: "Popular Recidential Building in the city Bahawalpur",
		location: "122N Morgan St, Chicago , IL 60607 , USA",
		price: "1,300.00",
		bedrooms: 3,
		bathrooms: 2,
		landArea: 110,
		image:
			"https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHByb3BlcnR5fGVufDB8fDB8fHww",
	},
	{
		id: 6,
		type: "Recidential",
		heading: "Popular apartment in the city delhi",
		location: "122N Morgan St, Chicago , IL 60607 , USA",
		price: "1,300.00",
		bedrooms: 3,
		bathrooms: 2,
		landArea: 110,
		image:
			"https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHByb3BlcnR5fGVufDB8fDB8fHww",
	},
];

export const feedback = [
	{
		name: "Taimoor Ali",
		feedback:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. !",
	},
	{
		name: "Haider Ali",
		feedback:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. !",
	},
	{
		name: "Shehbaz Ali",
		feedback:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. !",
	},
	{
		name: "Pathaan",
		feedback:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. !",
	},
];

export const news = [
	{
		img: "https://plus.unsplash.com/premium_photo-1684445034834-c8dec93ed218?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHByb3BlcnR5fGVufDB8fDB8fHww",
		postedBy: "Arcu Eget",
		date: "April 25 , 2017",
		detail:
			"Ac aliquam erat. Rhoncus ad senectus magnais metus fermentum nullam facilisi fames malesu ada potenti. Magna ac amet placerat vivamus litora.",
		id: 1,
	},
	{
		img: "https://plus.unsplash.com/premium_photo-1684348962314-64fa628992f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fHByb3BlcnR5fGVufDB8fDB8fHww",
		postedBy: "Arcu Eget",
		date: "April 25 , 2017",
		detail:
			"Ac aliquam erat. Rhoncus ad senectus magnais metus fermentum nullam facilisi fames malesu ada potenti. Magna ac amet placerat vivamus litora.",
		id: 2,
	},
	{
		id: 3,
		img: "https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHByb3BlcnR5fGVufDB8fDB8fHww",
		postedBy: "Arcu Eget",
		date: "April 25 , 2017",
		detail:
			"Ac aliquam erat. Rhoncus ad senectus magnais metus fermentum nullam facilisi fames malesu ada potenti. Magna ac amet placerat vivamus litora.",
	},
];
