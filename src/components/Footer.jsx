import logo from "../assets/logo/logo-white.png";
import { FaFacebook, FaTwitter, FaGooglePlus, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdMail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import toast from "react-hot-toast";

const Footer = () => {
	return (
		<div className='bg-gray-800 text-white mt-10 lg:mt-0'>
			<div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 px-5 xl:px-0 gap-10 py-12'>
				<div className='col-span-1 flex flex-col items-center text-center md:items-start md:text-left gap-5'>
					<img
						src={logo}
						alt=''
					/>
					<p className='text-sm font-medium tracking-wide'>
					Introducing JaguarPalace, your seamless crypto locker solution that allows you to effortlessly store, share, and secure your important documents. With a user-friendly interface, interact seamlessly with the appraisal process, connecting with authorities to receive real-time updates on your real estate transactions. Experience simplicity and efficiency in managing your documents while staying informed about every crucial detail in your real estate journey. JaguarPalace — where simplicity meets sophistication for a secure and connected real estate experience.
					</p>
					<span className='flex gap-2 items-center text-4xl'>
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

				<div className='flex flex-col items-center lg:items-start text-center lg:text-start col-span-1 gap-3'>
					<h1 className='text-2xl font-righteous uppercase'>Get in touch</h1>

					<span className='flex flex-col items-center lg:items-start gap-2'>
						<span className='font-righteous text-lg flex items-center gap-1 uppercase'>
							<FaLocationDot className='text-primary' />
							office address
						</span>
						<address>1808 Tortuga Central pakway ste 7786 Litora GM , USA</address>
					</span>

					<a className='flex flex-col gap-2'href="tel:(555) 123-4567">
						<span  className='font-righteous flex gap-2 items-center text-lg uppercase'>
							<FaPhoneAlt className='text-primary' />
							call us 24/7
						</span>
						<span>(555) 123-4567</span>
					</a>
					<span className='flex flex-col gap-2'>
						<span className='font-righteous text-lg flex items-center gap-2 uppercase'>
							<MdMail className='text-primary' />
							email address
						</span>
						<a href='mailto:example@example.com'>example@example.com</a>
					</span>
				</div>

				<div className='col-span-1 lg:col-span-2 flex flex-col gap-4'>
					<h1 className='text-2xl font-righteous uppercase'>newsletter</h1>

					<p className='text-gray-300 text-sm'>Subscribe to our newsletter and we will inform you about newset project.</p>

					<input
						className='py-2 px-4 text-lg placeholder:font-righteous focus-within:outline-none text-gray-800'
						type='email'
						placeholder='Enter Your Email'
					/>

					<button onClick={()=>{
					toast.success("Subscribed successfully")
					}} className='text-white text-lg font-righteous uppercase py-2 px-5 bg-primary hover:bg-transparent border-2 border-primary hover:border-white transition-all'>
						Subscribe
					</button>
				</div>
			</div>
		</div>
	);
};

export default Footer;
