import "./navbar.css";
import { Link, NavLink } from "react-router-dom";
import { FaPhoneAlt, FaSearch } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaLinkedin, FaFacebook, FaGooglePlus, FaTwitter, FaBars } from "react-icons/fa";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IoMdClose } from "react-icons/io";
import logo from "../../assets/logo/logo.svg";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../store/auth";
import { logout } from "../../utils/auth";

const Navbar = () => {
	const [navOpen, setNavOpen] = useState(false);
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn)();
	const navbarRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (navbarRef.current && !navbarRef.current.contains(event.target)) {
				setNavOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	return (
		<div className='sticky top-0 z-[999] bg-white' ref={navbarRef}>
			<SubNav />
			<nav className='px-5 xl:px-0 max-w-7xl flex justify-between items-left gap-3 py-1.5 mx-auto font-righteous bg-white'>
				<div>
					<Link to='/'>
						<img
							src={logo}
							className='w-52'
							alt=''
						/>
					</Link>
				</div>
				<div className='text-xl lg:flex hidden gap-0 navlinks'>
					<NavLink
						to={"/"}
						className='grid place-content-center  py-2 px-3'>
						Home
					</NavLink>
					<NavLink
						to={"/about"}
						className='grid place-content-center py-2 px-3'>
						About
					</NavLink>
					<NavLink
						to={"/docs"}
						className='grid place-content-center py-2 px-3'>
						Docs
					</NavLink>
					<NavLink
						to={"/dashboard"}
						className='grid place-content-center py-2 px-3'>
						Dashboard
					</NavLink>
					<NavLink
						to={"/privacy"}
						className='grid place-content-center py-2 px-3'>
						Privacy Policy
					</NavLink>
					{isLoggedIn &&
						<NavLink
							to={'/auth/login'}
							onClick={() => {
								setNavOpen(false)
								logout()
							}}
							className='grid place-content-center py-2 px-3'>
							Logout
						</NavLink>
					}
				</div>
				<div className='lg:flex hidden items-center gap-1'>
					<ConnectButton />
				</div>
				<div
					className='text-2xl text-gray-800 lg:hidden'
					onClick={() => setNavOpen(!navOpen)}>
					{navOpen ? <IoMdClose /> : <FaBars />}
				</div>
			</nav>
			<div className={`lg:hidden transition-all duration-300 overflow-hidden ${!navOpen ? "h-0" : "h-[370px] border-b-2"}`}>
				<div className='text-x flex flex-col py-3 gap-5 font-righteous navlinks items-start'>
					<NavLink
						to={"/"}
						onClick={() => setNavOpen(false)}
						className='grid place-content-center  py-2 px-3'>
						Home
					</NavLink>
					<NavLink
						to={"/about"}
						onClick={() => setNavOpen(false)}
						className='grid place-content-center py-2 px-3'>
						About
					</NavLink>
					<NavLink
						to={"/dashboard"}
						onClick={() => setNavOpen(false)}
						className='grid place-content-center py-2 px-3'>
						Dashboard
					</NavLink>
					<NavLink
						to={"/docs"}
						onClick={() => setNavOpen(false)}
						className='grid place-content-center py-2 px-3'>
						Docs
					</NavLink>
					<NavLink
						to={"/privacy"}
						onClick={() => setNavOpen(false)}
						className='grid place-content-center py-2 px-3'>
						Privacy Policy
					</NavLink>
					{isLoggedIn &&
						<NavLink
							to={'/auth/login'}
							onClick={() => {
								setNavOpen(false)
								logout()
							}}
							className='grid place-content-center py-2 px-3'>
							Logout
						</NavLink>
					}

					<div className='flex justify-center items-center gap-1'>
						<ConnectButton />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;

const SubNav = () => {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn)();
	const allUserData = useAuthStore((state) => state.getAllUserData)();

	const [loggedIn, setLoggedIn] = useState(isLoggedIn);


	useEffect(() => {
		if (allUserData !== null) {
			setLoggedIn(true);
		}
	}, [allUserData]);

	return (
		<div className='bg-black font-righteous text-gray-300  py-1 z-50'>
			<div className='max-w-7xl mx-auto flex px-5 xl:px-0 md:flex-row gap-1 items-center justify-evenly md:justify-between flex-wrap'>
				<span className='flex items-center gap-2 text-xs md:text-md'>
					<FaPhoneAlt />
					Need Support ? +411-555-555-5
				</span>
				{!loggedIn && (
					<span>
						<Link
							to={"/auth/login"}
							className='flex items-center text-xs md:text-md gap-2'>
							<IoPerson />
							Login/Registration
						</Link>
					</span>
				)}
				<span className='flex gap-2 items-center md:text-4xl'>
					<a href='#'>
						<FaFacebook />
					</a>
					<a href='#'>
						<FaTwitter />
					</a>
					<a href='#'>
						<FaGooglePlus />
					</a>
					<a href='#'>
						<FaLinkedin />
					</a>
				</span>
			</div>
		</div>
	);
};
