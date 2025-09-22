from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
from azure.core.credentials import AzureKeyCredential
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Read credentials from environment variables
endpoint = os.getenv("VISION_ENDPOINT")
key = os.getenv("VISION_KEY")

if not endpoint or not key:
    raise ValueError("Please set VISION_ENDPOINT and VISION_KEY environment variables.")

# Initialize Azure Vision client
client = ImageAnalysisClient(endpoint=endpoint, credential=AzureKeyCredential(key))

app = FastAPI(title="Image Captioning API", version="1.0")

class ImageUrlRequest(BaseModel):
    url: str

@app.post("/caption/url")
def caption_from_url(req: ImageUrlRequest):
    """Generate a caption from an image URL"""
    result = client.analyze_from_url(
        image_url=req.url,
        visual_features=[VisualFeatures.CAPTION],
        gender_neutral_caption=True
    )
    if result.caption:
        return {"caption": result.caption.text, "confidence": result.caption.confidence}
    return {"error": "No caption detected"}

@app.post("/caption/file")
def caption_from_file(file: UploadFile = File(...)):
    """Generate a caption from a local file upload"""
    # Read the file as bytes
    image_bytes = file.file.read()

    # Analyze using the main `analyze` method
    result = client.analyze(
        image_data=image_bytes,
        visual_features=[VisualFeatures.CAPTION],
        gender_neutral_caption=True
    )

    if result.caption:
        return {"caption": result.caption.text, "confidence": result.caption.confidence}
    return {"error": "No caption detected"}
