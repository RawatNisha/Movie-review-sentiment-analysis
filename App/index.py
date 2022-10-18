from flask import Flask,render_template,request,jsonify
from nltk.corpus import stopwords
import re
import pickle
import tensorflow
import os
from Functions import *


class_list=["Negative","Positive"]

with open('../Models/Vectorizer.pickle',"rb") as f:
    Vectorizer=pickle.load(f)
    
app=Flask(__name__)

stemmer = PorterStemmer()

Regular_expression_definition_for_html_tags=re.compile('<.*?>')
Regular_expression_definition_for_digits=re.compile('\d+\s|\s\d+|\s\d+\s')
english_stop_words=stopwords.words('english')

def preprocessing_of_sentence(text):
    text = text.lower()
    text = re.sub('<br />', '', text) 
    text = re.sub(r"http\S+|www\S+|https\S+", '', text, flags=re.MULTILINE)
    text = re.sub(r'\@w+|\#','', text)
    text = re.sub(r'[^\w\s]','', text)
    text=Regular_expression_definition_for_html_tags.sub(r" ",text)
    text=Regular_expression_definition_for_digits.sub(r" ",text)
    punctuations = [".",",","!","?","'",'"',":",";","*","-","/","+","%","$","#","@","(",")","[","]","{","}"]
    for i in punctuations:
        text = text.replace(i," ")
        
    text=text.split()
    text=[word for word in text if len(word)>1 and word not in english_stop_words]
    text=[stemmer.stem(word) for word in text]
    print(text)
    
    Vector=Vectorizer.transform([" ".join(text)])
    return Vector

def getSentimentFromNeuranNetwork(value):
    if value>0.65:
        return "Positive"
    elif value<0.35:
        return "Negative"
    else:
        return "Neutral"


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getresult',methods=['POST','GET'])
def getfinalresult():
    print("getresult is requested")
    if request.method=='POST':
        print("Post Method")
        # print(request.json['review'])
        if request.json['review']=="":
            return jsonify({"data":"ERROR"})
        else:
            input_=preprocessing_of_sentence(request.json['review'])
            NeuralNetworkModel=tensorflow.keras.models.load_model('../Models/NeuralNetworkModel.h5')
            print(NeuralNetworkModel.predict(input_.toarray())[0][0])
            prediction=getSentimentFromNeuranNetwork(NeuralNetworkModel.predict(input_.toarray())[0][0])
            if prediction=="Positive":
                return jsonify({"data":"Positive"})
            elif prediction=="Negative":
                return jsonify({"data":"Negative"})
            else:
                return jsonify({"data":"Neutral"})
    else:
        return jsonify({"data":"ERROR"})

@app.route('/validate',methods=['POST','GET'])
def getValidation():
    print("getresult is requested")
    if request.method=='POST':
        print("Post Method")
        # print(request.json['review'])
        if request.json['review']=="":
            return jsonify({"data":"ERROR"})
        else:
            value=scriptValidation(request.json['review'])
            print(value)
            if value==True:
                return jsonify({"data":"Valid"})
            else:
                return jsonify({"data":"Invalid"})
    else:
        return jsonify({"data":"ERROR"})

@app.route('/filterthetext',methods=['POST','GET'])
def getFiltration():
    print("getresult is requested")
    if request.method=='POST':
        print("Post Method")
        # print(request.json['review'])
        if request.json['review']=="":
            return jsonify({"data":"ERROR"})
        else:
            value=filtaration(request.json['review'])
            print(value)
            return jsonify({"data":value})
    else:
        return jsonify({"data":"ERROR"})
    
@app.route('/tokenize',methods=['POST','GET'])
def getTokens():
    print("getresult is requested")
    if request.method=='POST':
        print("Post Method")
        # print(request.json['review'])
        if request.json['review']=="":
            return jsonify({"data":"ERROR"})
        else:
            value=Tokenization(request.json['review'])
            print(value)
            returningvalue=f"[ {value[0]}"
            for i in range(1,len(value)):
                returningvalue+=f" , {value[i]} "
            returningvalue+=" ]"
            return jsonify({"data":returningvalue})
    else:
        return jsonify({"data":"ERROR"})

if __name__=='__main__':
    app.run(debug=True)
    # webbrowser.open("http://127.0.0.1:5000/")