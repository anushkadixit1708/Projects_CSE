import csv
from sklearn.svm import LinearSVC
from nltk.classify import SklearnClassifier
from random import shuffle
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import precision_recall_fscore_support
from sklearn.metrics import accuracy_score
import numpy as np
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.tokenize import RegexpTokenizer
from nltk.stem import WordNetLemmatizer
from nltk.util import ngrams
import string
from nltk.tokenize import word_tokenize
nltk.download('punkt')
import nltk
nltk.download('stopwords')
import nltk
nltk.download('wordnet')


def loadData(path, Text=None):
    with open(path) as f:
        reader = csv.reader(f, delimiter='\t')
        next(reader)
        for line in reader:
            (Id, Text, Label) = parseReview(line)
            rawData.append((Id, Text, Label))
            preprocessedData.append((Id, preProcess(Text), Label))


def splitData(percentage):
    dataSamples = len(rawData)
    halfOfData = int(len(rawData) / 2)
    trainingSamples = int((percentage * dataSamples) / 2)
    for (_, Text, Label) in rawData[:trainingSamples] + rawData[halfOfData:halfOfData + trainingSamples]:
        trainData.append((toFeatureVector(preProcess(Text)), Label))
    for (_, Text, Label) in rawData[trainingSamples:halfOfData] + rawData[halfOfData + trainingSamples:]:
        testData.append((toFeatureVector(preProcess(Text)), Label))
def parseReview(reviewLine):
    # Should return a triple of an integer, a string containing the review, and a string indicating the label
    s=""
    if reviewLine[1]=="__label1__":
        s = "fake"
    else:
        s = "real"
    return (reviewLine[0], reviewLine[8], s)
def preProcess(text):
    return word_tokenize(text)


featureDict = {}


def toFeatureVector(tokens):
    localDict = {}
    for token in tokens:
        if token not in featureDict:
            featureDict[token] = 1
        else:
            featureDict[token] = +1

        if token not in localDict:
            localDict[token] = 1
        else:
            localDict[token] = +1

    return localDict
def predictLabels(reviewSamples, classifier):
    return classifier.classify_many(map(lambda t: t[0], reviewSamples))

def predictLabel(reviewSample, classifier):
    return classifier.classify(toFeatureVector(preProcess(reviewSample)))

rawData = []
preprocessedData = []
trainData = []
testData = []


fakeLabel = 'fake'
realLabel = 'real'
table = str.maketrans({key: None for key in string.punctuation})

def preProcess(text):
    # Should return a list of tokens
    lemmatizer = WordNetLemmatizer()
    filtered_tokens=[]
    stop_words = set(stopwords.words('english'))
    text = text.translate(table)
    for w in text.split(" "):
        if w not in stop_words:
            filtered_tokens.append(lemmatizer.lemmatize(w.lower()))
    return filtered_tokens



fakeLabel = 'fake'
realLabel = 'real'
table = str.maketrans({key: None for key in string.punctuation})
def preProcess(text):
    # Should return a list of tokens
    lemmatizer = WordNetLemmatizer()
    filtered_tokens=[]
    lemmatized_tokens = []
    stop_words = set(stopwords.words('english'))
    text = text.translate(table)
    for w in text.split(" "):
        if w not in stop_words:
            lemmatized_tokens.append(lemmatizer.lemmatize(w.lower()))
        filtered_tokens = [' '.join(l) for l in nltk.bigrams(lemmatized_tokens)] + lemmatized_tokens
    return filtered_tokens


def loadData(path, Text=None):
    with open(path) as f:
        reader = csv.reader(f, delimiter='\t')
        next(reader)
        for line in reader:
            (Id, Rating, verified_Purchase, product_Category, Text, Label) = parseReview(line)
            rawData.append((Id, Rating, verified_Purchase, product_Category, Text, Label))
            # preprocessedData.append((Id, preProcess(Text), Label))


def splitData(percentage):
    dataSamples = len(rawData)
    halfOfData = int(len(rawData) / 2)
    trainingSamples = int((percentage * dataSamples) / 2)
    for (_, Rating, verified_Purchase, product_Category, Text, Label) in rawData[:trainingSamples] + rawData[
                                                                                                     halfOfData:halfOfData + trainingSamples]:
        trainData.append((toFeatureVector(Rating, verified_Purchase, product_Category, preProcess(Text)), Label))
    for (_, Rating, verified_Purchase, product_Category, Text, Label) in rawData[trainingSamples:halfOfData] + rawData[
                                                                                                               halfOfData + trainingSamples:]:
        testData.append((toFeatureVector(Rating, verified_Purchase, product_Category, preProcess(Text)), Label))

def parseReview(reviewLine):
    # Should return a triple of an integer, a string containing the review, and a string indicating the label
    s=""
    if reviewLine[1]=="__label1__":
        s = "fake"
    else:
        s = "real"
    return (reviewLine[0], reviewLine[2], reviewLine[3],reviewLine[4], reviewLine[8], s)
table = str.maketrans({key: None for key in string.punctuation})
def preProcess(text):
    # Should return a list of tokens
    lemmatizer = WordNetLemmatizer()
    filtered_tokens=[]
    lemmatized_tokens = []
    stop_words = set(stopwords.words('english'))
    text = text.translate(table)
    for w in text.split(" "):
        if w not in stop_words:
            lemmatized_tokens.append(lemmatizer.lemmatize(w.lower()))
        filtered_tokens = [' '.join(l) for l in nltk.bigrams(lemmatized_tokens)] + lemmatized_tokens
    return filtered_tokens


featureDict = {}  # A global dictionary of features



#import pickle
#classifier = pickle.load( open( "finalized_model.sav", "rb" ) )
#predictions = predictLabels(testData, classifier)