import { Route, Routes } from "react-router-dom";
import Mainslider from "./Mainslider";
import Search from "./Search";
import Options from "./Options";
import RecentProperties from "./RecentProperties";
import WhatAreYouLooking from "./WhatAreYouLooking";
import ClientFeedback from "./ClientFeedback";
import RegisterNow from "./RegisterNow";
import RecentNews from "./RecentNews";

const Home = () => {
	return (
		<main className='bg-gray-100'>
			<Mainslider />
			<Search />
			<Options />
			<RecentProperties />
			<WhatAreYouLooking />
			<ClientFeedback />
			<RecentNews />
			<RegisterNow />
		</main>
	);
};

export default Home;
