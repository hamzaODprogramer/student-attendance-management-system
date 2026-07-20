import requests

url = "https://hamzaod-ests.onrender.com/en/api/etudiant"
headers = {
    'Authorization': '123e4567-e89b-12d3-a456-4266554dsdsd',  # Ensure 'Bearer ' prefix
    'Content-Type': 'application/json'
}
students = []

try:
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        students = (response.json())["result"]
    else:
        print(f"Request failed with status code: {response.status_code}")
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")



# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv

# load_dotenv()

# mongodb_uri = os.getenv('MONGODB_URI')

# client = MongoClient(mongodb_uri)

# db = client['test']
# collection = db['etudiants']

# documents = collection.find({})

# students = []

# for document in documents:
#     students.append(document)

# print(students


