import tensorflow as tf

model = tf.keras.models.load_model('./model/face_model_V2.keras')

# Save architecture to a JSON file
with open('model_architecture.json', 'w') as json_file:
    json_file.write(model.to_json())

model.save_weights('model_weights.weights.h5')

