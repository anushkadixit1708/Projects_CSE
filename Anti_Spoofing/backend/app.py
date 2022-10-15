import face_recognition
from flask import Flask,request
from flask_cors import CORS
import cv2
import numpy as np
from database import update_secret,create_user,get_user
from livelines_net import detect_fake
import threading
import base64
import json
from database import get_user

rupin_image = face_recognition.load_image_file("abc.jpg")
rupin_face_encoding = face_recognition.face_encodings(rupin_image)[0]

# Create arrays of known face encodings and their names
known_face_encodings = [
    rupin_face_encoding
]
known_face_names = [
    "Rupin"
]

face_locations = []
face_encodings = []
face_names = []

app = Flask(__name__)
CORS(app)

verdict_buffer = {
    "real": 0,
    "fake": 0    
}

ans = {
    "name": "",
    "verdict": "",
    "buffer": verdict_buffer
}


def check_and_get_user(pin:str):
    if (ans["verdict"] == "real"):
        res= get_user(ans["name"], pin)
        print("res",res)
        return res
    else:
        raise Exception("User not in current frame or is not present in person")

@app.route("/feed")
def data():
    ans["buffer"] = json.loads(json.dumps(verdict_buffer))
    verdict_buffer["real"] =0
    verdict_buffer["fake"] =0
    return ans

@app.route("/user",methods=['POST',"PATCH"])
def access():
    data = request.json
    user = check_and_get_user(data["pin"])
    print("user",user)
    if request.method == "PATCH":
        update_secret(user,data["newSecret"])
        return {
            "status": "success"
        }
    else:
        return user  


def run_api():
    app.run(host='0.0.0.0', port=5000,debug=True, use_reloader=False)

if __name__ == '__main__':
    threading.Thread(target=run_api).start()


    video_capture = cv2.VideoCapture(0)
    while True:
        # Grab a single frame of video
        ret, frame = video_capture.read()

        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = frame


        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]

        # Only process every other frame of video to save time
        # if process_this_frame:
            # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]

            face_names.append(name)
        verdict = "fake" # by default
        # Display the results
        for (top, right, bottom, left), name in zip(face_locations, face_names):
            # Scale back up face locations since the frame we detected in was scaled to 1/4 size

            fakeness_verdict_current_frame = detect_fake((top, right, bottom, left), frame)
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
            # Draw a label with a name below the face
            cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, "{} , ({})".format(name,fakeness_verdict_current_frame), (left + 6, bottom - 6), font,0.5, (255, 255, 255), 1)
            verdict_buffer[fakeness_verdict_current_frame] += 1
            verdict = ("fake" if verdict_buffer["fake"] > verdict_buffer["real"] else "real")
            ans = {
                "name": name,
                "verdict": verdict
            }
            break
        else:
            ans = {
                "name": "",
                "verdict":verdict
            }
        # Display the resulting image
        # cv2.imshow('Video', frame)
        retval, buffer_img= cv2.imencode('.jpg', frame)
        data = base64.b64encode(buffer_img)
        ans["img"] = str(data)
        # Hit 'q' on the keyboard to quit!
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break


    # Release handle to the webcam
    video_capture.release()
    # cv2.destroyAllWindows()
