import pyrebase
import os

import logging

import MySQLdb.cursors
import re

from flask import Flask, flash, redirect, render_template, request, session,make_response, abort, url_for

from werkzeug.utils import secure_filename
basedir = os.path.abspath(os.path.dirname(__file__))
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
# from firebase_admin import auth
app = Flask(__name__)       #Initialze flask constructor
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

EXIFTOOL_PATH ="sudo chmod a+x"+os.path.abspath(os.path.dirname(__file__)) + "/exiftool.exe"

ELEMENTS_PER_PAGE = 50

#Add your own details
config = {


    "apiKey": "AIzaSyDtqr58_Sfj_KBkUxlVtCiDHQATf73yzNw",
    "authDomain": "test-c1ccd.firebaseapp.com",
    "databaseURL": "https://test-c1ccd-default-rtdb.firebaseio.com",
    "projectId": "test-c1ccd",
    "storageBucket": "test-c1ccd.appspot.com",
    "messagingSenderId": "638404195953",
    "appId": "1:638404195953:web:ff87b33a0637940e9b0dd0"
}

#initialize firebase
firebase = pyrebase.initialize_app(config)
storage = firebase.storage()
auth = firebase.auth()
db = firebase.database()
data = os.path.abspath(os.path.dirname(__file__)) + "/test-c1ccd-ac6db04afd07.json"
cred = credentials.Certificate(data)
firebase_admin.initialize_app(cred)
fb = firestore.client()

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SECRET_KEY'] = '545454'

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOADED_PHOTOS_DEST'] = os.path.join(basedir, 'uploads') # you'll need to create a folder named uploads
# app.config['POSTS_PHOTOS_DEST'] = os.path.join(basedir, 'posts')

from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
app.secret_key = '545454'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3308
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'event_db'

mysql = MySQL(app)
from PIL import Image
from PIL.ExifTags import TAGS

# class UploadForm(FlaskForm):
#     photo = FileField(validators=[FileAllowed(photos, 'Image Only!'), FileRequired('Choose a file!')])
#     submit = SubmitField('Upload')


#Initialze person as dictionary
person = {"is_logged_in": False, "name": "", "email": "", "uid": "","profile_url":""}
from datetime import datetime

now = datetime.now()

current_time = now.strftime("%H:%M:%S")
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#Login
@app.route('/')
@app.route("/login")
def login():
    return render_template("login.html")

#Sign up/ Register
@app.route("/signup")
def signup():
    return render_template("signup.html")
@app.route("/create/<user>",methods=["POST","GET"])
def create(user):
    uid=user
    m=[]
    e = []
    char_ref = fb.collection('search').document('chara')
    chac = char_ref.get()
    m=(chac.to_dict()['tag'])
    print(m)
    #timestamp = datetime.datetime(2017, 12, 1, 0, 0).timestamp()

    file_url=""

    if request.method == "POST":  # Only listen to POST
        result = request.form  # Get the data submitted
        caption = result["caption"]
        characteristic = result["characteristic"]
        characteristic=characteristic.split(",")
        characteristic = [each_string.lower() for each_string in characteristic]
        m=m+characteristic
        l=set(m)
        m=l
        try:
            if request.method == 'POST':
                # check if the post request has the file part

                file = request.files['file']
                # If the user does not select a file, the browser submits an
                # empty file without a filename.
                if file.filename == '':
                    flash('No selected file')
                    return redirect(request.url)
                if file and allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    file.save(os.path.join(app.config['UPLOADED_PHOTOS_DEST'], filename))
                    path_local = app.config['UPLOADED_PHOTOS_DEST'] + "/" + filename
                    path_on_cloud = "photos/" + uid + "/" + str(hash(path_local)) + ".jpg"

                    storage.child(path_on_cloud).put(path_local)
                    file_url = storage.child("photos/" + uid + "/" + str(hash(path_local)) + ".jpg").get_url(
                        None)
                    doc_ref = fb.collection(uid).document(str(hash(path_local)))
                    pub_ref = fb.collection('posts').document(str(hash(path_local)))

                    print(m)
                    image = Image.open(path_local)

                    q = []

                    exifdata = image.getexif()
                    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                    cursor.execute('INSERT INTO posts VALUES (NULL, % s, % s, % s)', (file_url, caption, uid))
                    mysql.connection.commit()


                    # looping through all the tags present in exifdata
                    for tagid in exifdata:
                        # getting the tag name instead of tag id
                        tagname = TAGS.get(tagid, tagid)

                        # passing the tagid to get its respective value
                        value = exifdata.get(tagid)

                        # printing the final result
                        s = f"{tagname:24}:{value}"
                        if (tagname != "MakerNote" and tagname != "UserComment"):
                            e.append(s)
                        print(s)
                    print(e)
                    doc_ref.set({
                        u'url': file_url,
                        u'caption': caption,
                        u'timestamp': firestore.SERVER_TIMESTAMP,
                        u'metadata': e,
                        u'characteristic': characteristic,
                        u'user': uid

                        })
                    pub_ref.set({
                        u'url': file_url,
                        u'caption': caption,
                        u'timestamp': firestore.SERVER_TIMESTAMP,
                        u'metadata': e,
                        u'characteristic': characteristic,
                        u'user': uid

                        })
                    char_ref.set({
                        u'tag':m
                    })

                    for s in characteristic:
                        chac_ref = fb.collection(s.lower()).document(str(hash(path_local)))
                        chac_ref.set({
                            u'url': file_url,
                            u'caption': caption,
                            u'timestamp': firestore.SERVER_TIMESTAMP,
                            u'metadata': e,
                            u'characteristic': characteristic,
                            u'user': uid

                            })


                            # NB : you won't get an IntegrityError when reading





                success = True




            else:
                success = False


        except:
            #If there is any error, redirect back to login
            return redirect(url_for('welcome',_external=True,user=uid))


    return render_template("create.html", file_url=file_url,user=uid,metadata=e)

@app.route("/posts/<user>",methods=["POST","GET"])
def posts(user):
    uid=user
    u = fb.collection('posts')
    d = u.stream()
    a = []
    c = []
    t = []
    m = []
    key=[]
    usernames=[]
    user_emails=[]
    user_profiles=[]

    char_ref = fb.collection('search').document('chara')
    chac = char_ref.get()
    chac=(chac.to_dict()['tag'])
    print(chac)


    for doc in d:
        key.append(str(doc.id))
        print(doc.id)
        a.append(u'{}'.format(doc.to_dict()['url']))
        c.append(u'{}'.format(doc.to_dict()['caption']))
        t.append(u'{}'.format(doc.to_dict()['timestamp']))

        m.append(doc.to_dict()['metadata'])
        id = u'{}'.format(doc.to_dict()[u'user'])
        users_ref = fb.collection(u'users').document(id)
        user_doc = users_ref.get()
        name = u'{}'.format(user_doc.to_dict()['name'])
        usernames.append(name)
        email = u'{}'.format(user_doc.to_dict()['email'])
        user_emails.append(email)
        profile = u'{}'.format(user_doc.to_dict()['profile_url'])
        user_profiles.append(profile)
        print(u'{}'.format(doc.to_dict()['url']))
        print(m)
    if request.method == "POST":
        a = []
        c = []
        t = []
        m = []
        usernames = []
        user_emails = []
        user_profiles = []
        # Only listen to POST

        result = request.form  # Get the data submitted
        tag = result["tag"]
        print(tag)
        tagname= fb.collection(tag)
        k= tagname.stream()
        for doc in k:
            key.append(doc.id)

            a.append(u'{}'.format(doc.to_dict()['url']))
            c.append(u'{}'.format(doc.to_dict()['caption']))
            t.append(u'{}'.format(doc.to_dict()['timestamp']))
            m.append(doc.to_dict()['metadata'])
            id=u'{}'.format(doc.to_dict()[u'user'])
            users_ref = fb.collection(u'users').document(id)
            user_doc = users_ref.get()
            name = u'{}'.format(user_doc.to_dict()['name'])
            usernames.append(name)
            email = u'{}'.format(user_doc.to_dict()['email'])
            user_emails.append(email)
            profile = u'{}'.format(user_doc.to_dict()['profile_url'])
            user_profiles.append(profile)
            print(u'{}'.format(doc.to_dict()['url']))
            print(m)







    return render_template("posts.html",files_list=a,caption=c,timestamps=t,metadata=m,l=len(a),user=uid,usernames=usernames,user_emails=user_emails,user_profiles=user_profiles,tags=chac,key=key)
@app.route("/details/<user>/<key>",methods=["POST","GET"])
def details(key,user):

    m=[]
    uid=user
    doc_ref = fb.collection(u'posts').document(key)
    doc = doc_ref.get()
    a=u'{}'.format(doc.to_dict()['url'])
    c=u'{}'.format(doc.to_dict()['caption'])
    t=u'{}'.format(doc.to_dict()['timestamp'])
    image_location =a
    m.append(doc.to_dict()['metadata'])
    id = u'{}'.format(doc.to_dict()[u'user'])
    users_ref = fb.collection(u'users').document(id)
    user_doc = users_ref.get()
    name = u'{}'.format(user_doc.to_dict()['name'])

    email = u'{}'.format(user_doc.to_dict()['email'])

    profile = u'{}'.format(user_doc.to_dict()['profile_url'])

    print(u'{}'.format(doc.to_dict()['url']))
    print(m)



    return render_template("details.html", file=a, caption=c, timestamps=t, metadata=m, l=len(a), user=uid,
                           username=name, user_email=email, user_profile=profile,
                           key=key)
@app.route("/delete/<user>/<key>",methods=["POST","GET"])
def delete(user,key):
    uid=user
    doc_ref = fb.collection(u'posts').document(key)
    doc = doc_ref.get()
    a = u'{}'.format(doc.to_dict()['url'])
    print(a)
    doc_ref_1=fb.collection(uid).document(key)
    c= doc_ref.get().to_dict()['characteristic']
    print(c)
    # cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    # cursor.execute('DELETE FROM posts WHERE url="%s" ' % (str(a)))
    # mysql.connection.commit()
    fb.collection(u'posts').document(key).delete()
    fb.collection(uid).document(key).delete()
    for i in c:
        fb.collection(i).document(key).delete()
    return redirect(url_for('welcome',_external=True,user=uid))


#Welcome page
@app.route("/welcome/<user>",methods=["POST","GET"])
def welcome(user):
    key=[]



    for f in os.listdir('uploads'):
        if f.endswith('.jpg'):
            os.remove(os.path.join('uploads', f))
    filename=""
    path_local=""
    person["is_logged_in"] == True
    if person["is_logged_in"] == True:
        doc_ref = fb.collection(u'users').document(user)
        file_url = storage.child("avtars/" + user + ".jpg").get_url(None)
        users_ref = fb.collection(u'users').document(user)


        profile_url = storage.child("avtars/" + user + ".jpg").get_url(None)
        doc = doc_ref.get()
        # name = u'{}'.format(doc.to_dict()['name'])
        # email=u'{}'.format(doc.to_dict()['email'])
        # profile=u'{}'.format(doc.to_dict()['profile_url'])


        # form = UploadForm()

        if request.method == 'POST':
                # check if the post request has the file part

            file = request.files['file']
                # If the user does not select a file, the browser submits an
                # empty file without a filename.
            if file.filename == '':
                flash('No selected file')
                return redirect(request.url)
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOADED_PHOTOS_DEST'], filename))
                path_local = app.config['UPLOADED_PHOTOS_DEST'] + "/" + filename
                path_on_cloud = "avtars/" + user + ".jpg"

                storage.child(path_on_cloud).put(path_local)
                file_url = storage.child("avtars/" + user + ".jpg").get_url(None)
                doc_ref.update({
                    u'profile_url': file_url

                })
                # doc_ref.set({
                #         u'name': name,
                #         u'email': email,
                #         u'profile_url': file_url,
                #
                #     })


                os.remove(app.config['UPLOADED_PHOTOS_DEST']+"/"+ filename)


                success = True

            else:
                success = False
        #files_list = os.listdir(app.config['UPLOADED_PHOTOS_DEST'])
        #file_url = photos.url(filename)

        #profile_url=storage.child("avtars/"+person["uid"]+".jpg").get_url(None)
        u = fb.collection(user)
        d = u.stream()
        a=[]
        c=[]
        t=[]
        m=[]


        for doc in d:
            key.append(str(doc.id))
            a.append(u'{}'.format(doc.to_dict()['url']))
            c.append(u'{}'.format(doc.to_dict()['caption']))
            t.append(u'{}'.format(doc.to_dict()['timestamp']))
            m.append(doc.to_dict()['metadata'])


            print(u'{}'.format(doc.to_dict()['url']))
            print(m)
        doc = doc_ref.get()
        name = u'{}'.format(doc.to_dict()['name'])
        email=u'{}'.format(doc.to_dict()['email'])
        profile=u'{}'.format(doc.to_dict()['profile_url'])
        print(name,email,profile)

        return render_template("welcome.html", key=key,email = email, name = name,uid=user,file_url=profile,files_list=a,caption=c,timestamps=t,metadata=m,l=len(a),d=d)
    else:
        return redirect(url_for('login',_external=True))

#If someone clicks on login, they are redirected to /result
@app.route("/result", methods = ["POST", "GET"])
def result():
    trigger=False
    if request.method == "POST":        #Only if data has been posted
        result = request.form           #Get the data
        email = result["email"]
        password = result["pass"]
        try:
            #Try signing in the user with the given information
            user = auth.sign_in_with_email_and_password(email, password)
            session['loggedin'] = True
            session['id'] = user['localId']
            session['username'] = email
            #Insert the user data in the global person
            global person
            person["is_logged_in"] = True
            # person["email"] = user["email"]
            # person["uid"] = user["localId"]
            # person["idToken"] = user["idToken"]
            #Get the name of the user
            # users_ref = fb.collection(u'users').document(user['localId'])
            # doc = users_ref.get()
            # bal = u'{}'.format(doc.to_dict()['name'])
            # print(bal)
            #
            # data = db.child("users").get()
            # person["name"] = u'{}'.format(doc.to_dict()['name'])
            # person["email"]=u'{}'.format(doc.to_dict()['email'])


            # return render_template('login.html',trigger=person["is_logged_in"])
            return redirect(url_for('welcome',_external=True,user=user["localId"]))
        except:
            #If there is any error, redirect back to login
            return redirect(url_for('login',_external=True))
    # else:
    #     if person["is_logged_in"] == True:
    #
    #         return redirect(url_for('welcome',_external=True))
    #     else:
    #         return redirect(url_for('login',_external=True))

#If someone clicks on register, they are redirected to /register
@app.route("/register", methods = ["POST", "GET"])
def register():
    if request.method == "POST":        #Only listen to POST
        result = request.form           #Get the data submitted
        email = result["email"]
        password = result["pass"]
        name = result["name"]

        #Try creating the user account using the provided data
        auth.create_user_with_email_and_password(email, password)
        #Login the user
        user = auth.sign_in_with_email_and_password(email, password)
        #Add data to global person
        global person
        person["is_logged_in"] = True
        # person["email"] = user["email"]
        # person["uid"] = user["localId"]
        # person["idToken"] = user["idToken"]
        # person["name"] = name
        #Append data to the firebase realtime database
        # data = {"name": name, "email": email}
        # db.child("users").child(user["localId"]).set(data)
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('INSERT INTO people VALUES (% s, % s, NULL )', (name, email))
        mysql.connection.commit()
        doc_ref = fb.collection(u'users').document(user["localId"])
        doc_ref.set({
            u'name': name,
            u'email':email,
            u'profile_url':''

        })



        #Go to welcome page
        return redirect(url_for('welcome',_external=True,user=user["localId"]))
    else:
            #If there is any error, redirect to register
        return redirect(url_for('register',_external=True))

@app.route("/logout", methods = ["POST", "GET"])
def logout():
    auth.current_user=None
    person = {"is_logged_in": False, "name": "", "email": "", "uid": "", "profile_url": ""}
    person["is_logged_in"]=False
    # person["name"]=""
    # person["email"]=""
    # person["uid"]=""
    # person["profile_url"]=""
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    return redirect(url_for('login',_external=True))

if __name__ == "__main__":
    # port = int(os.environ.get('PORT', 5000))
    app.run(debug=True)
