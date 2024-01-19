import React, { useEffect, useState } from "react";
import ProfileTab from "./Tabs/Profile_Tab/ProfileTab";
import ListingTab from "./Tabs/Listing_Tab/ListingTab";
import HistoryTab from "./Tabs/History_Tab/HistoryTab";
import WalletTab from "./Tabs/Wallet_Tab/WalletTab";
import { useUserData } from "../../utils/useUserData";
import { GrEdit } from "react-icons/gr";
import Spinner from "../../components/Spinner";
import { getLink } from "../../utils/getLink";
import toast, { Toaster } from "react-hot-toast";
import useAxios from "../../utils/useAxios";
import Settings from "./Tabs/SettingsTab/MainSettingsComponent";

const Profile = () => {
	const [activeTab, setActiveTab] = useState("Profile");
	const [profileImageUrl, setProfileImageUrl] = useState("");
	const [coverImageUrl, setCoverImageUrl] = useState("");
	const { userData, loading, error } = useUserData();
	const api = useAxios();

	const [profileImage, setProfileImage] = useState(null);
	const [coverImage, setCoverImage] = useState(null);

	useEffect(() => {
		if (profileImage || (userData && userData.profile_image)) {
			setProfileImageUrl(userData.profile_image);
		}
	}, [profileImage, userData]);

	useEffect(() => {
		if (coverImage || (userData && userData.cover_image)) {
			setCoverImageUrl(userData.cover_image);
		}
	}, [profileImage, userData]);

	const handleProfileImageChange = async (e, type) => {
		const imageLink = await getLink(e);

		const dataWithNewImage = type === "profile" ? { ...userData, profile_image: imageLink } : { ...userData, cover_image: imageLink };

		try {
			await api.put("profile/", dataWithNewImage);
			toast.success("Successfully updated");
			type === "profile" ? setProfileImageUrl(imageLink) : setCoverImageUrl(imageLink);
		} catch (error) {
			toast.error(`${error}`);
			type === "profile" ? setProfileImageUrl(userData.profile_image) : setCoverImageUrl(userData.cover_image);
		}
	};

	if (loading) {
		return (
			<div className='w-full h-screen grid place-content-center'>
				<Spinner />
			</div>
		);
	} else if (error) {
		return <p>server error {`${error}`}</p>;
	} else {
		return (
			<div className='lg:py-10 py-5'>
				<div className='max-w-7xl mx-auto'>
					<div className='h-[20rem] p-2 relative group/cover'>
						<img
							className='w-full h-full object-cover rounded-2xl '
							src={coverImageUrl}
						/>

						<label
							htmlFor='coverImage'
							className='absolute z-[1000] bg-primary backdrop-blur-sm transition-all duration-300 flex justify-center items-center text-white font-poppins cursor-pointer lg:text-2xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] opacity-0 group-hover/cover:opacity-100 h-14 aspect-square rounded-full hover:scale-125 hover:bg-primary'>
							<GrEdit />
							<input
								type='file'
								className='absolute hidden'
								id='coverImage'
								onChange={(e) => handleProfileImageChange(e, "cover")}
							/>
						</label>

						<div className='aspect-square rounded-full h-[8rem] lg:h-[15rem] absolute lg:top-[50%] bottom-[-4rem] lg:left-[75%] left-[50%] translate-x-[-50%] lg:translate-x-0 border-white border-4 shadow-md overflow-hidden group transition-all duration-500'>
							<img
								className='w-full h-full object-cover object-center'
								src={profileImageUrl}
								alt=''
							/>
							<label
								htmlFor='profilePic'
								className='absolute inset-0 z-[1000] bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-center text-white font-poppins cursor-pointer text-xs lg:text-lg'>
								<GrEdit
									className='hover:scale-150 transition-all'
									title='change'
								/>
							</label>
							<input
								type='file'
								className='absolute hidden'
								id='profilePic'
								onChange={(e) => handleProfileImageChange(e, "profile")}
							/>
						</div>
					</div>

					<div className='bg-white rounded-xl px-5 py-6 mt-20 border'>
						<div className='flex justify-center items-center gap-y-2 flex-wrap'>
							{buttons.map((button, i) => (
								<TabButton
									key={i}
									{...button}
									active={activeTab}
									onclick={setActiveTab}
								/>
							))}
						</div>

						<div className='py-5 md:px-3'>{buttons.map((b, i) => (b.name === activeTab ? <b.el key={i} /> : null))}</div>
					</div>
				</div>

				<Toaster
					position='bottom-center'
					reverseOrder={false}
				/>
			</div>
		);
	}
};

export default Profile;

const buttons = [
	{ name: "Profile", el: ProfileTab },
	{ name: "Listing", el: ListingTab },
	{ name: "History", el: HistoryTab },
	{ name: "Wallet", el: WalletTab },
	{ name: "Settings", el: Settings },
];

function TabButton({ name, active, onclick }) {
	return (
		<button
			onClick={() => onclick(name)}
			className={`${
				active === name && "bg-primary text-white"
			} font-poppins md:text-lg rounded-lg font-medium transition-all duration-500 py-2 px-5`}>
			{name}
		</button>
	);
}
