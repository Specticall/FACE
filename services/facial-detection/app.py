from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import base64
from PIL import Image
import io
import os
import uuid
from config.config import classnames 

app = Flask(__name__)

model = tf.keras.models.load_model('./model/face_model_V2.keras')
MODEL_SIZE = 180


def preprocess_image(image):
    image = image.convert('RGB')
    image = image.resize((MODEL_SIZE, MODEL_SIZE))
    image = np.array(image)
    image = image / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.route("/diagnose-face", methods=["POST"])
def diagnose_face():
  try:
    # Get the base64 image from the request
    data = request.json
    base64_image = data['base64_image'].split(",")[1]
    
    # Decode the base64 image
    image_data = base64.b64decode(base64_image)
    image = Image.open(io.BytesIO(image_data))

    # Generate a unique filename
    filename = f"{uuid.uuid4()}.png"
    filepath = os.path.join('./', filename)

    # Save the image
    image.save(filepath)

    # Preprocess the image
    preprocessed_image = preprocess_image(image)

    # Make predictions
    predictions = model.predict(preprocessed_image)
    
    # Convert predictions to a list
    predictions_list = predictions.tolist()

    # Get the class names for the highest and second highest predictions
    predicted_classname = classnames[np.argmax(predictions_list)]

    return jsonify({
        'predicted_classname': predicted_classname,
    })
  except Exception as e:
      return jsonify({
          'error': str(e)
      }), 400

if __name__ == '__main__':
    app.run(debug=True)