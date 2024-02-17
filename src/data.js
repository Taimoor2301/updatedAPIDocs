import { API_BASE_URL } from './utils/constants'
let javascript, php, python;
const dummyJson = {
	"name": "Luke Skywalker",
	"height": "172",
	"mass": "77",
	"hair_color": "blond",
	"skin_color": "fair",
	"eye_color": "blue",
	"birth_year": "19BBY",
	"gender": "male",
	"homeworld": "https://swapi.dev/api/planets/1/",
	"created": "2014-12-09T13:50:51.644000Z",
	"edited": "2014-12-20T21:17:56.891000Z",
	"url": "https://swapi.dev/api/people/1/"
}




export const data = [
	{
	  title: "Get All Properties",
	  id: "#topic1",
	  description:
		"This API endpoint provides a way to retrieve a list of all properties. Properties may include information about real estate, products, or any other relevant entities depending on the context of the application.",
	  javascript: jsCode('properties'),
	  php: phpCode('properties'),
	  python: pythonCode('properties'),
	  result: JSON.stringify([
		{
		  "id": 6,
		  "property_type": "commercial",
		  "title": "Nomi313",
		  "description": "descr",
		  "pictures": "https://cloudflare-ipfs.com/ipfs/bafybeihhyovslgdffyx4ptc4ee67ubiy3l7pnntg4heudsel6cy5n6i4fa/loading.png",
		  "location": "abc",
		  "latitude": "1265",
		  "longitude": "15445",
		  "google_plus_code": "12",
		  "deed_of_ownership": "97fbb4d2-42c2-472d-9e4c-2ac4a2efe127-CV_Shahbaz_Ali_feb2024.pdf",
		  "appraisal": "87a6a98b-0f55-4814-96a7-0b5dbd95816f-CryptoLocker_Issues (1).pdf",
		  "owner_name": "Albert Licencse Testing 2",
		  "owner_address": "0xab92489887C8Dd100f64b52fd65203717480E0d0",
		  "owner_percentage": "100",
		  "removed": false,
		  "listed_on": false,
		  "user": 11
		},
		{
		  "id": 7,
		  "property_type": "commercial",
		  "title": "Bhk",
		  "description": "Sas",
		  "pictures": "https://cloudflare-ipfs.com/ipfs/bafybeigl5qttvkubltq3z42f3txaj5pt5stwi2c57irctevxcyt7wqogvm/hero-1.png",
		  "location": "abc",
		  "latitude": "12",
		  "longitude": "11",
		  "google_plus_code": "12",
		  "deed_of_ownership": "dd29b13c-bca0-43bb-b087-23e95cd9a2a3-CV_Shahbaz_Ali_en_soldity.pdf",
		  "appraisal": "f557a1b5-71ce-4fb8-aa1d-467b888b6fe2-CV_Shahbaz_Ali_soliditypdf",
		  "owner_name": "baibars313",
		  "owner_address": "0x3D5C2B398F514Dfe452d7FA9A39c7094594d013D",
		  "owner_percentage": "70",
		  "removed": false,
		  "listed_on": false,
		  "user": 11
		}
	  ]),
	},
	{
	  title: "Get Property Details",
	  id: "#topic2",
	  description: "Get detailed information about a specific property.",
	  javascript: jsCode('properties/${id}'),
	  php: phpCode('properties/${id}'),
	  python: pythonCode('properties/{id}'),
	  result: JSON.stringify({
		"id": 6,
		"property_type": "commercial",
		"title": "Nomi313",
		"description": "descr",
		"pictures": "https://cloudflare-ipfs.com/ipfs/bafybeihhyovslgdffyx4ptc4ee67ubiy3l7pnntg4heudsel6cy5n6i4fa/loading.png",
		"location": "abc",
		"latitude": "1265",
		"longitude": "15445",
		"google_plus_code": "12",
		"deed_of_ownership": "97fbb4d2-42c2-472d-9e4c-2ac4a2efe127-CV_Shahbaz_Ali_feb2024.pdf",
		"appraisal": "87a6a98b-0f55-4814-96a7-0b5dbd95816f-CryptoLocker_Issues (1).pdf",
		"owner_name": "Albert Licencse Testing 2",
		"owner_address": "0xab92489887C8Dd100f64b52fd65203717480E0d0",
		"owner_percentage": "100",
		"removed": false,
		"listed_on": false,
		"user": 11
	  }),
	},
	{
	  title: "Get Listed Properties",
	  id: "#topic3",
	  description:
		"Retrieve all the properties listed for sale by you. This endpoint provides information about the properties currently available for listing.",
	  javascript: jsCode('listed/'),
	  php: phpCode('listed/'),
	  python: pythonCode('listed/'),
	  result: JSON.stringify([
		{
		  "id": 1,
		  "price_in_token": "10",
		  "price_in_eth": "0.01",
		  "expiry": "2024-01-11T23:29",
		  "property": 1
		},
		{
		  "id": 2,
		  "price_in_token": "0.02",
		  "price_in_eth": "0.01",
		  "expiry": "2024-01-24T14:07",
		  "property": 2
		},
		{
		  "id": 4,
		  "price_in_token": "667",
		  "price_in_eth": "0.01",
		  "expiry": "2024-01-24T16:09",
		  "property": 4
		}
	  ]),
	},
	{
	  title: "Get Listing Details",
	  id: "#topic4",
	  description: "Get detailed information about a specific listed property.",
	  javascript: jsCode('listed/${id}'),
	  php: phpCode('listed/${id}'),
	  python: pythonCode('listed/${id}'),
	  result: JSON.stringify(
		{
		  "id": 1,
		  "price_in_token": "10",
		  "price_in_eth": "0.01",
		  "expiry": "2024-01-11T23:29",
		  "property": 1
		}
	  ),
	},
	{
	  title: "Get Bought Properties",
	  id: "#topic5",
	  description: "Retrieve information about all the properties bought by your account.",
	  javascript: jsCode('bought'),
	  php: phpCode('bought'),
	  python: pythonCode('bought'),
	  result: JSON.stringify([
		{
		  "owner_name": "nomi790",
		  "buyer": "nomi790",
		  "property_type": "residential",
		  "id": 5
		}
	  ]),
	},
	{
	  title: "Get Sold Properties",
	  id: "#topic6",
	  description: "Retrieve information about all the properties sold by your account.",
	  javascript: jsCode('sold/'),
	  php: phpCode('sold/'),
	  python: pythonCode('sold/'),
	  result: JSON.stringify([
		{
		  "id": 5,
		  "property_type": "residential",
		  "title": "Title",
		  "description": "description",
		  "pictures": "",
		  "location": "abc",
		  "latitude": "12",
		  "longitude": "11",
		  "google_plus_code": "12",
		  "deed_of_ownership": "e3d2a056-1038-497b-93c6-1e16a9261a65-CV_Shahbaz_AliResume (1).pdf",
		  "appraisal": "7a28226e-d309-453b-a958-c6f9984cfcfc-CV_Shahbaz_Ali_en(3).json",
		  "owner_name": "baibars313",
		  "owner_address": "1846  BRIARHILL LANE",
		  "owner_percentage": "12678",
		  "removed": false,
		  "listed_on": false,
		  "user": 11
		}
	  ]),
	},
	{
	  title: "Get Authorized Users",
	  id: "#topic8",
	  description:
		"Retrieve information about all the users that have access to the properties that you have created.",
	  javascript: jsCode('authorized_users/owner'),
	  php: phpCode('authorized_users/owner'),
	  python: pythonCode('authorized_users/owner'),
	  result: JSON.stringify([
		{
		  "id": 9,
		  "date": "2024-02-09T08:26:19.610746Z",
		  "username": "nomi790",
		  "profile_photo": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
		  "created_at": "2024-02-09T08:26:19.610812Z",
		  "role": "Buyer",
		  "edit_permissions": false,
		  "property": 5,
		  "user": 11
		}
	  ]),
	},
	{
	  title: "Get Authorized Properties",
	  id: "#topic9",
	  description: "Retrieve information about all the properties that you have access.",
	  javascript: jsCode('authorized_users/users'),
	  php: phpCode('authorized_users/users'),
	  python: pythonCode('authorized_users/users'),
	  result: JSON.stringify([
		{
		  "id": 9,
		  "date": "2024-02-09T08:26:19.610746Z",
		  "username": "nomi790",
		  "profile_photo": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
		  "created_at": "2024-02-09T08:26:19.610812Z",
		  "role": "Buyer",
		  "edit_permissions": false,
		  "property": 5,
		  "user": 11
		}
	  ]),
	},
	{
	  title: "Get Property Versions",
	  id: "#topic10",
	  description: `This API endpoint, accessible through a GET request to /api/property_versions/{property_id}, 
	  offers a valuable functionality for retrieving previous versions of a property object. 
	  By specifying the unique identifier (property_id) in the URL, users can access a chronological 
	  history of modifications made to the property. 
	  The response is a JSON array containing version-specific metadata, including timestamps, user identifiers, 
	  and the state of the property at each point in time. This feature enables users to track changes, 
	  review historical property data, and facilitates auditing or reverting to specific versions as needed.
	  It enhances transparency and accountability in managing property information within an application or system.`,
	  javascript: jsCode('property_versions'),
	  php: phpCode('property_versions'),
	  python: pythonCode('property_versions'),
	  result: JSON.stringify([
		{
		  "edited_by": "nomi790",
		  "updated_at": "2024-02-16T07:29:25.729074Z",
		  "update_summary": "updating appraisal",
		  "id": 8
		}
	  ]),
	},
	{
	  title: "Get Property Version Details",
	  id: "#topic11",
	  description: `This API endpoint, accessible through a GET request to /api/property_versions/id, 
	  offers a valuable functionality for retrieving detail of previous versions of a property object. 
	  By specifying the unique identifier (property_id) in the URL, users can access a chronological 
	  history of modifications made to the property. 
	  The response is a JSON array containing version-specific metadata, including timestamps, user identifiers, 
	  and the state of the property at each point in time. This feature enables users to track changes, 
	  review historical property data, and facilitates auditing or reverting to specific versions as needed.
	  It enhances transparency and accountability in managing property information within an application or system.`,
	  javascript: jsCode('property_version/${id}'),
	  php: phpCode('property_version/${id}'),
	  python: pythonCode('property_version/{id}'),
	  result: JSON.stringify({
		"title": "Title",
		"user": 11,
		"property_type": "commercial",
		"description": "",
		"pictures": "https://cloudflare-ipfs.com/ipfs/bafybeic6r7hmtoug6affbbnonjdjwt3sphuyrrkxn3c6wfkkobp6ench44/logo.png",
		"location": "abc",
		"latitude": "7.90",
		"longitude": "73.1484943",
		"google_plus_code": "UHG",
		"owner_name": "Shahbaz Ali",
		"owner_address": "1846  BRIARHILL LANE",
		"owner_percentage": "100"
	  }),
	},
  ];


function jsCode(endpoint) {
	return `async function fetchData() {
	try {
		const response = await fetch('${API_BASE_URL}/${endpoint}', {
			method: 'GET',
			headers: {
				'x-api-key': 'YOUR_API_KEY', // Replace 'YOUR_API_KEY' with the actual API key
				'Content-Type': 'application/json',
			}
		});

		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error('Error fetching data:', error.message);
	}
}`
}

function phpCode(endpoint) {
	return `<?php

	function fetchData() {
			// Replace 'YOUR_API_KEY' and 'API_BASE_URL' with the actual API key and base URL
			$apiBaseUrl = '${API_BASE_URL}';
			$apiEndpoint = '/${endpoint}';
			$apiKey = 'YOUR_API_KEY';

			$url = $apiBaseUrl . $apiEndpoint;
			$headers = array(
					'x-api-key: $apiKey,
					'Content-Type: application/json',
			);

			$ch = curl_init($url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

			try {
					$response = curl_exec($ch);

					// Check for cURL errors
					if (curl_errno($ch)) {
							throw new Exception('cURL error: ' . curl_error($ch));
					}

					$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

					// Check for HTTP errors
					if ($httpCode >= 400) {
							throw new Exception('HTTP error! Status: ' . $httpCode);
					}

					$data = json_decode($response, true);
					echo 'Fetched data: ';
					print_r($data);

					// You can do something with the fetched data here

			} catch (Exception $error) {
					echo 'Error fetching data: ' . $error->getMessage();
			} finally {
					curl_close($ch);
			}
	}

	// Call the function to fetch data
	fetchData();

	?>
	`
}

function pythonCode(endpoint) {
	return `import requests

	def fetch_data():
			# Replace 'YOUR_API_KEY' and 'API_BASE_URL' with the actual API key and base URL
			api_base_url = '${API_BASE_URL}'
			api_endpoint = '/${endpoint}'
			api_key = 'YOUR_API_KEY'

			headers = {
					'x-api-key': f'{api_key}',
					'Content-Type': 'application/json',
			}

			try:
					response = requests.get(f'{api_base_url}{api_endpoint}', headers=headers)

					# Raise an exception for HTTP errors
					response.raise_for_status()

					data = response.json()
					print('Fetched data:', data)

					# You can do something with the fetched data here

			except requests.exceptions.RequestException as error:
					print('Error fetching data:', error)

	# Call the function to fetch data
	fetch_data()
	`
}