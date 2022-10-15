import cv2
from tensorflow.keras.preprocessing.image import img_to_array
import os
import numpy as np
from tensorflow.keras.models import model_from_json
from tensorflow.keras.models import load_model

# # Load Face Detection Model
# face_cascade = cv2.CascadeClassifier("models/haarcascade_frontalface_default.xml")
# # Load Anti-Spoofing Model graph
# json_file = open('model.json','r')
# loaded_model_json = json_file.read()
# json_file.close()
# model = model_from_json(loaded_model_json)
# # load antispoofing model weights 
# model.load_weights('test_2.h5')
model = load_model ("test_2.h5")
def detect_fake(face,frame):
    (top, right, bottom, left) = face
    x = top
    y = left
    w = right - left
    h = bottom - top
    # gray = cv2.cvtColor(frame,cv2.COLOR_RGB2GRAY)
    # face = gray[y-5:y+h+5,x-5:x+w+5]
    face = frame[top:bottom, left:right]
    resized_face = cv2.resize(face,(224,224))
    resized_face = resized_face.astype("float") / 255.0
    # resized_face = img_to_array(resized_face)
    resized_face = np.expand_dims(resized_face, axis=0)
    # pass the face ROI through the trained liveness detector
    # model to determine if the face is "real" or "fake"
    preds =np.argmax( model.predict(resized_face))
    # print(preds)
    if preds> 0.5:
        label = 'fake'
    else:
        label = 'real'
    return label