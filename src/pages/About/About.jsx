import React from "react";

export default function About() {
	return (
		<div className=''>
			<div className='max-w-7xl mx-auto px-5 py-10 lg:px-0'>
				<h1 className='text-5xl font-righteous py-10'>About Us</h1>

				<div className='text-lg tracking-wide'>
					<Heading>Welcome to Jaguar Palace – Your Gateway to Real Estate Excellence</Heading>
					<Paragraph>
						At Jaguar Palace, we believe in more than just buying and selling properties; we believe in transforming dreams into reality. Our journey
						began with a simple yet profound vision: to redefine the real estate experience. Today, we stand as a testament to that vision, having
						evolved into a dynamic platform that goes beyond transactions, creating lasting connections within the realm of property.
					</Paragraph>
				</div>

				<Heading>Our Story</Heading>

				<Paragraph>
					Jaguar Palace was born from a passion for real estate and a desire to simplify the property journey. Established [insert founding year], our
					founders envisioned a space where buyers and sellers could seamlessly connect, where dreams of a perfect home or a lucrative investment
					could find a welcoming reality. From the inception, we set out to be more than just a marketplace—we aimed to be a trusted partner in your
					real estate endeavors.
				</Paragraph>
				<Heading>Our Mission</Heading>

				<Paragraph>
					At the core of Jaguar Palace is a mission to redefine the way people buy and sell properties. We strive to create a platform that empowers
					individuals, whether they are first-time buyers, seasoned investors, or those looking to sell their cherished property. Our commitment is to
					provide a transparent, user-friendly, and reliable space where your real estate aspirations can flourish.
				</Paragraph>
				<Heading>The Jaguar Palace Experience</Heading>

				<Paragraph>
					Embark on a journey with Jaguar Palace, and discover a world where your property dreams become a reality. Whether you're looking to buy your
					dream home, sell a property close to your heart, or invest in the next big opportunity, we are here to guide you.
				</Paragraph>
				<Heading>Join the Jaguar Palace Family</Heading>

				<Paragraph>
					As we continue to redefine the real estate landscape, we invite you to be a part of the Jaguar Palace family. Explore the possibilities,
					connect with our vibrant community, and let us be the bridge that turns your real estate aspirations into achievements. At Jaguar Palace,
					it's not just about properties; it's about building futures, one dream at a time. Welcome to Jaguar Palace – Where Dreams Find Their Home.
				</Paragraph>
			</div>
		</div>
	);
}

const Heading = ({ children }) => {
	return <h2 className='font-righteous text-gray-800 my-5'>{children}</h2>;
};

const Paragraph = ({ children }) => {
	return <p>{children}</p>;
};
