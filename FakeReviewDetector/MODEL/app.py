from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
import pickle
import numpy as np
from model import *

app = Flask(__name__)
api = Api(app)

filename = 'finalized_model.sav'
model = pickle.load(open(filename, 'rb'))



# argument parsing
parser = reqparse.RequestParser()
parser.add_argument('query')


class Predict(Resource):
    def get(self):
        # use parser and find the user's query
        args = parser.parse_args()
        user_query = args['query']

        prediction = predictLabel(user_query,model)
        #pred_proba = model.predict_proba(uq_vectorized)
        #print(prediction)

        # round the predict proba value and set to new variable
        #confidence = round(pred_proba[0], 3)

        # create JSON object
        output = {'prediction': prediction} #'confidence': confidence}

        return output


# Setup the Api resource routing here
# Route the URL to the resource
api.add_resource(Predict, '/')


if __name__ == '__main__':
    app.run(debug=True)
