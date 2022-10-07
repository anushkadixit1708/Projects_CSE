import os

import imutils
from tensorflow import keras
import cv2
import numpy as np
from tensorflow.python.keras.applications.mobilenet_v2 import preprocess_input

from source.utils import load_cascade_detector, preprocess_face_frame, decode_prediction, write_bb

POSSIBLE_EXT = [".png", ".jpg", ".jpeg"]
model = keras.models.load_model('models/mask_mobilenet.h5')
face_detector_model = load_cascade_detector()


def detect_mask_in_image(image):
    image = imutils.resize(image, width=600)

    # convert an image from one color space to another
    # (to grayscale)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_detector_model.detectMultiScale(gray,
                                                 scaleFactor=1.05,
                                                 minNeighbors=4,
                                                 minSize=(40, 40),
                                                 flags=cv2.CASCADE_SCALE_IMAGE,
                                                 )
    clone_image = image.copy()

    faces_dict = {"faces_list": [],
                  "faces_rect": []
                  }

    for rect in faces:
        (x, y, w, h) = rect
        face_frame = clone_image[y:y + h, x:x + w]
        # preprocess image
        face_frame_array = preprocess_face_frame(face_frame)

        faces_dict["faces_list"].append(face_frame_array)
        faces_dict["faces_rect"].append(rect)

    if faces_dict["faces_list"]:
        faces_preprocessed = preprocess_input(np.array(faces_dict["faces_list"]))
        preds = model.predict(faces_preprocessed)
        for i, pred in enumerate(preds):
            mask_or_not, confidence = decode_prediction(pred)
            write_bb(mask_or_not, confidence, faces_dict["faces_rect"][i], clone_image)

    return clone_image


def test_on_custom_image(path):
    filename, file_extension = os.path.splitext(path)
    if file_extension not in POSSIBLE_EXT:
        raise Exception("possible file extensions are .png, .jpg, .jpeg")
    if not os.path.exists(path):
        raise FileNotFoundError("file not found")
    image = cv2.imread(path)
    image_masked = detect_mask_in_image(image)
    cv2.imwrite(filename + "_mask_detected.png", image_masked)
    return


if __name__ == '__main__':
    path = input("please enter your image filepath:")
    test_on_custom_image(path)
