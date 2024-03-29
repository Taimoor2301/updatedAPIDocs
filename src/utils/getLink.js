import axios from "axios";
export const getLink = async (event) => {
	const file = event.target.files[0];

	try {
		// Create form data to send the file
		const formData = new FormData();
		formData.append("file", file);

		// Upload file to NFT.Storage
		const response = await axios.post("https://api.nft.storage/upload", formData, {
			headers: {
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGYyNTdBZUIwMzI0YkJCMmZCNjA1NjMwNjMwRTNiMzNFNmJiZjREYWYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4ODExNjE0ODM3MCwibmFtZSI6Im5ldHdvcmtpbmcifQ.bLYpVNRTDFj5IN-c0bs0hpq2plz8Npd1NsaeuvJhvTw",
				"Content-Type": "multipart/form-data",
			},
		});
		// Get the image link from the response
		const imageLink = response.data.value.cid;
		const completeImageLink = `https://cloudflare-ipfs.com/ipfs/${imageLink}/${file.name}`;

		// Set the image link in the state
		// (you might want to use this value in your application)
		console.log(completeImageLink);
		// Display a success message
		return completeImageLink;
	} catch (error) {
		// Display an error message if the upload fails
		console.error("Error uploading image:", error);
		return null;
	} finally {
		console.log("Upload process completed");
	}
};
