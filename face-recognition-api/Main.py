import requests
import os
import numpy as np
import cv2
import face_recognition
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv
from connectDB import students  # Assurez-vous d'avoir une importation correcte de vos données d'étudiants

load_dotenv()

class Main:
    def __init__(self, image_url):
        self.image_url = image_url
        self.students = students
        self.cnes = []
        self.api_url = os.getenv('API_URL')
        self.api_key = os.getenv('API_KEY')

    def getList(self):
        try:
            # Téléchargez l'image à partir de l'URL
            response = requests.get(self.image_url)
            image = Image.open(BytesIO(response.content))
            image_array = np.array(image)
            image_array = cv2.cvtColor(image_array, cv2.COLOR_BGR2RGB)

            # Obtenez les encodages faciaux pour l'image de la classe
            face_encodings = face_recognition.face_encodings(image_array)

            if len(face_encodings) == 0:
                return []

            # Comparez les encodages faciaux avec les encodages des étudiants
            for student in self.students:
                student_image_url = student['image']
                is_present = self.compare_student_to_class(student_image_url, image_array, face_encodings)
                if is_present:
                    self.cnes.append(student['cne'])

            return self.cnes

        except Exception as e:
            print("Error:", e)  # Affichez le message d'erreur pour le débogage
            return []

    def compare_student_to_class(self, student_image_url, class_image_array, class_encodings):
        try:
            # Chargez l'image de l'étudiant
            student_response = requests.get(student_image_url)
            student_image = Image.open(BytesIO(student_response.content))
            student_image_array = np.array(student_image)
            student_image_array = cv2.cvtColor(student_image_array, cv2.COLOR_BGR2RGB)

            # Obtenez l'encodage facial pour l'image de l'étudiant
            student_encodings = face_recognition.face_encodings(student_image_array)

            if len(student_encodings) == 0:
                return False

            student_encoding = student_encodings[0]

            # Comparez les encodages faciaux
            results = face_recognition.compare_faces(class_encodings, student_encoding)

            return any(results)  # True si l'étudiant est présent, False sinon

        except Exception as e:
            print("Error:", e)  # Affichez le message d'erreur pour le débogage
            return False



