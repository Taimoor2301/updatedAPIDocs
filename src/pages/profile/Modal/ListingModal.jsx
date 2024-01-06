import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import useAxios from "../../../utils/useAxios";
import Spinner from "../../../components/Spinner";
import { ethers } from "ethers";
import Contract from "../../../utils/useContract";
import { useAccount } from "wagmi";
import { useEthersSigner } from '../../../utils/EthSigner';
import { FaEthereum } from "react-icons/fa";
const ListingModal = ({ closeModel, setAdded, id }) => {
	const api = useAxios();
	const provider = useEthersSigner()
	const [data, setData] = useState("");
	const [fetchingData, setFetchingData] = useState(true);
	const [loading, setLoading] = useState(false);
	const { isConnected } = useAccount()


	// inputs
	const [endTime, setEndTime] = useState(0);
	const [uri, setUri] = useState("");
	const [tokenPrice, setTokenPrice] = useState(0);
	const [ethPrice, setEthPrice] = useState(0);
	const [limiTed, setLimited] = useState(false);
	const [dateTime, setDateTime] = useState('')
	const [fetcherror, setFetcherror] = useState(false)

	function calculateRemainingSecondsFromEvent(dateTimeValue) {
		// Extract the value from the event

		// Convert the input value (assuming it's in ISO format or any recognized format)
		const inputDateTime = new Date(dateTimeValue).getTime(); // Convert to milliseconds

		// Get the current time in milliseconds
		const currentTime = new Date().getTime();

		// Calculate the difference in milliseconds
		const timeDifference = inputDateTime - currentTime;

		// Convert milliseconds to seconds
		const remainingSeconds = Math.floor(timeDifference / 1000);
		setEndTime(remainingSeconds)
		return remainingSeconds;
	}


	async function createItem() {
		setLoading(true)
		console.log(isConnected)
		if (!isConnected) {
			toast.error("please connect your wallet")
			setLoading(false)
			return
		}
		let rem_secs = calculateRemainingSecondsFromEvent(dateTime)
		console.log(endTime)
		if (endTime === '' || endTime <= 0 && !limiTed) {
			toast.error(`please check input field of unlimted sale and time ${endTime === '' || endTime <= 0 ? "invalid ending time value if you dont want to implement time choose unlimited" : ""}`)
			setLoading(false)
			console.log()
			return
		}
		try {
			const contract = await Contract(provider)
			const ethValue = ethers.parseUnits(ethPrice.toString(), 'ether');
			const tokenval = ethers.parseUnits(tokenPrice.toString(), 'ether');
			const tx = await contract.createItem(id, ethValue, tokenval, uri, limiTed, endTime);
			await tx.wait();

			if (fetcherror) {
				await api.post("/listed/", { price_in_eth: ethPrice, price_in_token: tokenPrice, property: id, expiry: dateTime })
			}
			else {
				await api.put(`/listed/${id}/`, { price_in_eth: ethPrice, price_in_token: tokenPrice, property: id, expiry: dateTime })
			}
			toast.success("listed successfully")
			fetchData()
		} catch (error) {
			toast.error(`${error.message != undefined ? error.message : error}`)
			console.log(error)
		}
		setLoading(false)

	}



	useEffect(() => {
		document.body.style.overflowY = "hidden";
		return () => (document.body.style.overflowY = "auto");
	}, [isConnected]);

	const fetchData = async () => {
		try {
			setFetchingData(true);
			const response = await api.get(`listed/${id}`);
			setData(response.data);
			setTokenPrice(response.data.price_in_token)
			setEthPrice(response.data.price_in_eth)
			setDateTime(response.data.expiry)

			// console.log(response.data);
			setFetchingData(false);
			setFetcherror(false)
		} catch (error) {
			console.log(error);
			setFetchingData(false);
			setFetchingData(false)
			setFetcherror(true)
			toast.error("something went wong");
		}
	};



	useEffect(() => {
		fetchData();
		setUri(window.origin + '/details/' + id)
		console.log(id)
	}, []);

	return (
		<motion.div style={{ overflow: "auto" }}
			className='bg-black/50 hover:text-gray-800 text-gray-800 backdrop-blur-sm fixed w-screen h-screen left-0 top-0 grid place-content-center z-[99999]'
			onClick={() => closeModel(false)}>
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0 }}
				className='bg-white min-w-[90vw]  md:min-w-[500px] mx-auto  rounded-xl p-3 shadow-md  py-8 gap-5 relative'
				onClick={(e) => e.stopPropagation()}>
				<IoCloseCircleOutline
					className='absolute text-4xl right-3 top-3 cursor-pointer hover:text-red-600 transition-all duration-300'
					onClick={() => closeModel(false)}
				/>
				{!fetchingData &&
					<div style={{ margin: '20px', fontSize: 12, fontWeight: 'bold', color: 'green' }} >
						<div className="gd-item">
							<div>Price in Matic:</div>
							<div style={{ display: "inline" }}><p>{data?.price_in_eth} <FaEthereum size={20} /></p></div>
						</div>
						<div className="gd-item">
							<div>Price in Token:</div>
							<div style={{ display: "inline" }}><p>{data?.price_in_token} <FaEthereum size={20} /></p></div>
						</div>

						<div className="gd-item">
							<div>Expires On:</div>
							<div style={{ display: "inline" }}>{data?.expiry?.split('T')[0]}  {data?.expiry?.split('T')[1]}</div>
						</div>

					</div>


				}
				<h1 className='text-lg font-poppins font-medium underline text-center'>Add to Listing</h1>

				<div className='grid grid-cols-1 md:p-10 p-3 gap-3 md:gap-6 place-content-center'>
					<div className='flex flex-col gap-1.5 col-span-1'>
						<label className='text-gray-700 font-bold text-xl'>Price In Eth</label>
						<input
							type='number'
							name='Price In Eth'
							value={ethPrice}
							onChange={(e) => setEthPrice(e.target.value)}
							className='border border-purple-500 rounded-lg p-3 '
						/>
					</div>

					<div className='flex flex-col gap-1.5 col-span-1'>
						<label className='text-gray-700 font-bold text-xl'>Price In Token</label>
						<input
							type='number'
							name='Price In Token'
							value={tokenPrice}
							placeholder=''
							onChange={(e) => setTokenPrice(e.target.value)}
							className='border border-purple-500 rounded-lg p-3 '
						/>
					</div>
					<div className='flex flex-col gap-1.5 col-span-1'>
						<label className='text-gray-700 font-bold text-xl' >Select Sale Type</label>
						<select className='border border-purple-500 rounded-lg p-3 ' name="isUnlimited" id="" onChange={(e) => {
							if (e.target.value == "2") {
								setLimited(false)
							}
							else {
								setLimited(true)
								const currentDateTimeInSeconds = Math.floor(new Date().getTime() / 1000)+(60*60*24*7)
								setEndTime(currentDateTimeInSeconds)
								
							}
						}}>
							<option value="2">Limited Time</option>
							<option value="1">Unlimited</option>
						</select>
					</div>

					{!limiTed &&

						<div className='flex flex-col gap-1.5 col-span-1'>
							<label className='text-gray-700 font-bold text-xl'>Ending Time</label>
							<input onChange={(e) => {
								calculateRemainingSecondsFromEvent(e.target.value)
								setDateTime(e.target.value)
							}}
								type='datetime-local'
								name='endingTime'
								value={dateTime}
								placeholder=''
								className='border border-purple-500 rounded-lg p-3 '
							/>
						</div>

					}




					<div
						className='col-span-full flex justify-center'
						onClick={createItem}>
						<button className='max-w-xl w-full py-2 font-bold rounded-lg text-xl bg-purple-500 text-white'>
							{loading ? "Please Wait..." : "Submit"}
						</button>
					</div>
				</div>
			</motion.div>
			<Toaster
				position='bottom-center'
				reverseOrder={false}
			/>
		</motion.div >
	);
};

export default ListingModal;
