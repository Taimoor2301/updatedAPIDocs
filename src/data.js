import {API_BASE_URL} from './utils/constants'
let javascript , php , python;
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
		title: "Get all properties",
		id: "#topic1",
		description:
			"This API endpoint provides a way to retrieve a list of all properties. Properties may include information about real estate, products, or any other relevant entities depending on the context of the application.",
		javascript : jsCode('properties'),
		php : phpCode('properties')


					,
		python :pythonCode('properties'), result: JSON.stringify(dummyJson)
	},
	{
		title: "Get property details",
		id: "#topic2",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "Get listed properties",
		id: "#topic3",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "Get listing details",
		id: "#topic4",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "Get bought properties",
		id: "#topic5",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "Get sold properties",
		id: "#topic6",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "Get buyers",
		id: "#topic7",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "Get authorized users",
		id: "#topic8",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "Get propert versions",
		id: "#topic9",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},

];


function jsCode(endpoint){
 return `async function fetchData() {
	try {
		const response = await fetch('${API_BASE_URL}/${endpoint}', {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer YOUR_API_KEY', // Replace 'YOUR_API_KEY' with the actual API key
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

function phpCode(endpoint){
	return `<?php

	function fetchData() {
			// Replace 'YOUR_API_KEY' and 'API_BASE_URL' with the actual API key and base URL
			$apiBaseUrl = '${API_BASE_URL}';
			$apiEndpoint = '/${endpoint}';
			$apiKey = 'YOUR_API_KEY';

			$url = $apiBaseUrl . $apiEndpoint;
			$headers = array(
					'Authorization: Bearer ' . $apiKey,
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

function pythonCode(endpoint){
	return `import requests

	def fetch_data():
			# Replace 'YOUR_API_KEY' and 'API_BASE_URL' with the actual API key and base URL
			api_base_url = '${API_BASE_URL}'
			api_endpoint = '/${endpoint}'
			api_key = 'YOUR_API_KEY'

			headers = {
					'Authorization': f'Bearer {api_key}',
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