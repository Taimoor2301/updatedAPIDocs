import { useEffect, useState } from "react";
import PaymentModel from "../Modal/PaymentModel";
import { AnimatePresence } from "framer-motion";

const WalletTab = () => {
	const balance = 9876554.33;
	const [openModel, setOpenModel] = useState(false);

	useEffect(() => {
		if (openModel) {
			document.body.style.overflowY = "hidden";
		} else {
			document.body.style.overflowY = "auto";
		}
	}, [openModel]);

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-5 relative'>
			<AnimatePresence mode='popLayout'>{openModel && <PaymentModel closeModel={setOpenModel} />}</AnimatePresence>
			<h1 className='text-2xl font-poppins font-bold tracking-wide col-span-full text-center py-6'>Wallet</h1>

			<div className='col-span-full text-center font-righteous flex flex-col items-center text-gray-500'>
				Current Wallet Balance
				<span className='text-gray-800 text-5xl'>$ {balance}</span>
			</div>

			<div className='font-righteous col-span-full flex flex-col items-center gap-4'>
				<button
					className='text-lg text-purple-500 border-2 border-purple-500 hover:bg-purple-500 hover:text-white font-poppins py-1.5 w-44 rounded-md transition-all duration-500'
					onClick={() => setOpenModel(true)}>
					Recharge
				</button>
				<button className='text-lg bg-gray-800 text-white border-2 hover:border-purple-500 border-transparent hover:bg-purple-500 hover:text-white font-poppins py-1.5 w-44 rounded-md transition-all duration-500'>
					Convert
				</button>
			</div>
		</div>
	);
};

export default WalletTab;
