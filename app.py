import os

import requests
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile

# Load .env file
load_dotenv()

# Read credentials from environment variables
endpoint = os.getenv("VISION_ENDPOINT")  # e.g., "https://<your-resource>.cognitiveservices.azure.com/"
key = os.getenv("VISION_KEY")

if not endpoint or not key:
    raise ValueError("Please set VISION_ENDPOINT and VISION_KEY environment variables.")

app = FastAPI(title="Image Captioning API", version="1.0")


@app.post("/caption/file")
def caption_from_file(file: UploadFile = File(...)):
    """Generate a caption from a local file upload using REST API"""
    image_bytes = file.file.read()

    # REST API URL for image analysis
    url = f"{endpoint}/vision/v3.2/analyze?visualFeatures=Description"

    headers = {
        "Ocp-Apim-Subscription-Key": key
    }

    files = {
        "image": ("image.jpg", image_bytes)
    }

    response = requests.post(url, headers=headers, files=files)
    
    if response.status_code != 200:
        return {"error": f"Azure Vision API error: {response.text}"}

    data = response.json()

    # Extract caption
    captions = data.get("description", {}).get("captions", [])
    if captions:
        caption = captions[0]
        return {"caption": caption.get("text"), "confidence": caption.get("confidence")}
    
    return {"error": "No caption detected"}
