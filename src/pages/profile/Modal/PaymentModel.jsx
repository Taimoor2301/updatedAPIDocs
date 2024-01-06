import { useState } from "react";
import { motion } from "framer-motion";
import { FaCoins, FaArrowRight } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";

const PaymentModel = ({ closeModel }) => {
	const handleClick = (e) => {
		e.stopPropagation();
	};

	const [activeTab, setActiveTab] = useState("peer");
	const changeTab = (name) => {
		setActiveTab(name);
	};

	return (
		<motion.div
			className='bg-black/50 backdrop-blur-sm fixed w-screen h-screen left-0 top-0 grid place-content-center z-[99999]'
			onClick={() => closeModel(false)}>
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0 }}
				className='bg-white max-w-7xl mx-auto lg:w-[80vw] w-[95vw] h-[90vh] lg:h-[93vh] rounded-xl p-3 shadow-md flex flex-col items-center gap-10 relative'
				onClick={(e) => handleClick(e)}>
				<IoCloseCircleOutline
					className='absolute text-4xl right-3 top-3 cursor-pointer hover:text-red-600 transition-all duration-300'
					onClick={() => closeModel(false)}
				/>
				<div className='border border-gray-800 rounded-xl justify-self-center flex gap-2'>
					<TabButton name='crypto' Icon={FaCoins} active={activeTab} onclick={changeTab} />
					<TabButton name='peer' Icon={MdOutlinePayment} active={activeTab} onclick={changeTab} />
				</div>

				<div className='flex-1 w-full'>{activeTab !== "crypto" ? <PeerPayment /> : <CryptoPayment />}</div>
			</motion.div>
		</motion.div>
	);
};

export default PaymentModel;

const CryptoPayment = () => {
	return (
		<div className='flex gap-1 flex-col xl:flex-row h-full'>
			<div className='rounded-xl overflow-hidden max-h-[20rem] lg:max-h-[100%] flex-1'>
				<img src={img1} alt='' className='w-full h-full object-center object-cover' />
			</div>

			<div className='col-span-1 border rounded-xl px-3 py-5 flex-1'>
				<h1 className='text-xl font-righteous text-center'>Payment via Crypto</h1>
			</div>
		</div>
	);
};
const PeerPayment = () => {
	return (
		<div className='flex gap-1 flex-col xl:flex-row h-full'>
			<div className='rounded-xl overflow-hidden max-h-[20rem] lg:max-h-[100%] flex-1'>
				<img src={img2} alt='' className='w-full h-full object-center object-cover' />
			</div>

			<div className='border rounded-xl px-3 py-5 flex-1 grid grid-cols-2 gap-4 p-2 place-content-start'>
				<h1 className='col-span-full text-md font-poppins font-medium pt-4 pb-10 text-xl'>Payment Mehtod</h1>

				<div className='flex flex-col col-span-full text-sm'>
					<span className='flex gap-2 items-center font-medium'>
						<FaArrowRight className='text-lg text-purple-500' /> Credit or Debit Card
					</span>
				</div>

				<div className='flex flex-col gap-0.5 col-span-full md:col-span-1'>
					<input type='text' className='border p-2 rounded-lg focus:outline-purple-500' placeholder='first name' />
					<label className='text-sm font-poppins text-gray-600 font-medium'>First Name</label>
				</div>
				<div className='flex flex-col gap-0.5 col-span-full md:col-span-1'>
					<input type='text' className='border p-2 rounded-lg focus:outline-purple-500' placeholder='last name' />
					<label className='text-sm font-poppins text-gray-600 font-medium'>Last Name</label>
				</div>
				<div className='flex flex-col gap-0.5 col-span-full md:col-span-1'>
					<input type='number' className='border p-2 rounded-lg focus:outline-purple-500' placeholder='card number' />
					<label className='text-sm font-poppins text-gray-600 font-medium'>Card Number</label>
				</div>
				<div className='flex flex-col gap-0.5 col-span-full md:col-span-1'>
					<input type='text' className='border p-2 rounded-lg focus:outline-purple-500' placeholder='CVC' />
					<label className='text-sm font-poppins text-gray-600 font-medium'>CVC</label>
				</div>
				<div className='flex flex-col gap-0.5 col-span-full md:col-span-1'>
					<input type='text' className='border p-2 rounded-lg focus:outline-purple-500' placeholder='MM/YY' />
					<label className='text-sm font-poppins text-gray-600 font-medium'>Card Expiration</label>
				</div>

				<div className='col-span-full'>
					<button className='flex gap-2 items-center group text-white font-poppins font-medium bg-purple-500 rounded-lg px-4 py-2'>
						Continue <FaArrowRight className='group-hover:translate-x-2 transition-all duration-300' />
					</button>
				</div>
			</div>
		</div>
	);
};

const img1 =
	"https://img.freepik.com/free-vector/flat-design-cryptocurrency-concept_23-2149166905.jpg?size=626&ext=jpg&ga=GA1.1.2038201854.1686040080&semt=ais";

const img2 =
	"https://img.freepik.com/free-vector/gradient-installment-illustration_23-2149397487.jpg?size=600&ext=jpg&ga=GA1.1.2038201854.1686040080&semt=ais";

function TabButton({ name, active, onclick, Icon }) {
	return (
		<button
			onClick={() => onclick(name)}
			className={`${
				active === name && "bg-purple-500 text-white"
			} font-poppins md:text-lg rounded-lg font-medium transition-all duration-500 py-2 px-5 flex gap-2 items-center`}>
			{name} {Icon && <Icon />}
		</button>
	);
}
