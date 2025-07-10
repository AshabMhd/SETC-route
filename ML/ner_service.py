# ner_service.py

import os
import spacy
from flask import Flask, request, jsonify, make_response # Added make_response
from flask_cors import CORS

# 1) Load your trained spaCy model (adjust the path as needed)
MODEL_PATH = os.path.join(os.path.dirname(__file__), "voice_transport_ner")
nlp = spacy.load(MODEL_PATH)

app = Flask(__name__)
# Apply CORS settings: Allow requests to /extract from http://localhost:5173
CORS(app, resources={r"/extract": {"origins": "http://localhost:5173"}})

@app.route("/extract", methods=["POST", "OPTIONS"]) # Added OPTIONS
def extract():
    if request.method == "OPTIONS": # Handle preflight requests
        # flask-cors should handle this automatically with the app-level config.
        # If not, a more explicit response might be needed here.
        response = make_response()
        # response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173") # Usually handled by flask-cors
        # response.headers.add("Access-Control-Allow-Headers", "Content-Type") # Usually handled by flask-cors
        # response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS") # Usually handled by flask-cors
        return response
    
    # if request.method == "POST": # This check becomes redundant if OPTIONS returns
    # The original POST logic follows
    data = request.get_json() or {}
    text = data.get("text", "")
    doc = nlp(text)
    locations = [ent.text for ent in doc.ents if ent.label_ == "GPE"]
    result = {
        "from": locations[0] if len(locations) > 0 else None,
        "to": locations[1] if len(locations) > 1 else None,
    }
    return jsonify(result)

if __name__ == "__main__":
    print("Starting ner_service on http://0.0.0.0:5500 …")
    app.run(host="0.0.0.0", port=5500, debug=True)
