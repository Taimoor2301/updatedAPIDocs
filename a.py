import requests

url = "https://embtaku.pro/streaming.php?id=NjM5Nw==&title=Baby%2C+Please+Kill+Me%21+Episode+13&typesub=SUB"
response = requests.get(url)

if response.status_code == 200:
    print("Request was successful!")
    print("Response content:")
    print(response.text)
else:
    print(f"Request failed with status code {response.status_code}")
# 03345906558
# fasisal jatt sgd