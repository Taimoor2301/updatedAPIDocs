import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { data } from "../../data";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Home() {
	return (
		<div className='grid grid-cols-10 h-[90vh]'>
			<Sidebar />
			<HomeContent />
		</div>
	);
}

const HomeContent = () => {
	return (
		<div className='px-5 lg:py-14 col-span-full lg:col-span-8 overflow-auto max-h-full scroll-smooth'>
			<h1 className='text-2xl text-center lg:text-6xl lg:text-left font-poppins md:pl-10 font-extrabold text-gray-800 my-10'>Documentation</h1>

			{data.map((d) => (
				<Element
					key={d.id}
					{...d}
				/>
			))}
		</div>
	);
};

const Element = ({ title, description, javascript, python, php, id }) => {
	const [activeCode, setActiveCode] = useState("javascript");
	const [copy, setCopy] = useState(false);
	const code = activeCode === "javascript" ? javascript : activeCode === "python" ? python : php;

	function handleCopy() {
		setCopy(true);
		window.navigator.clipboard.writeText(code);

		setTimeout(() => {
			setCopy(false);
		}, 4000);
	}
	return (
		<div
			className='flex flex-col gap-3.5 lg:py-14 py-4 lg:px-10 border-b-2'
			id={id}>
			<h1 className='text-xl lg:text-3xl underline underline-offset-8 font-semibold tracking-wide font-poppins text-gray-700'>{title}</h1>
			<div className='flex gap-2 py-1.5 px-2'>
				{codeOptions.map((o) => (
					<button
						onClick={() => setActiveCode(o)}
						key={o}
						className={`text-sm font-poppins bg-gray-300 hover:bg-purple-500 transition-all duration-300 hover:text-white rounded-md p-2 ${
							activeCode === o && "bg-purple-500 text-white"
						}`}>
						{o}
					</button>
				))}
			</div>

			<div className='rounded-xl overflow-hidden'>
				<div className='flex justify-between bg-gray-600 text-gray-300 font-poppins items-center py-1.5 px-5 text-sm font-medium'>
					<span>Code Example</span>
					<span
						className={`p-1 ${copy ? "bg-green-500" : "bg-gray-500 hover:bg-purple-500"} transition-all rounded-lg text-white cursor-pointer`}
						onClick={handleCopy}>
						{!copy ? "Copy Code" : "Copied"}
					</span>
				</div>
				<SyntaxHighlighter
					style={atomOneDark}
					wrapLongLines='true'
					wrapLines='true'
					language={activeCode}
					customStyle={{ padding: "25px" }}>
					{code}
				</SyntaxHighlighter>
			</div>

			<p className='text-md font-light font-poppins'>{description}</p>
		</div>
	);
};

const codeOptions = ["javascript", "python", "php"];
