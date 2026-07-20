from flask import Flask, jsonify, request
from flask_cors import CORS
import base64
import cv2

from Main import Main

app = Flask(__name__)
CORS(app)


@app.route("/getTest",methods=['GET'])
def getTest() :
  return jsonify({"cnes": "hamza ouadoud"})

@app.route("/getPersences", methods=['POST'])
def get_persences():

  try:
    
    image_data = request.json

    obj = Main(image_data["image"]) 


    cnes = obj.getList()

    print(cnes)

    return jsonify({"cnes": cnes})

  except Exception as e:

    print("Error:", e)  # Print the error message for debugging
    return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)
