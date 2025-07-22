from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import requests
import io

app = FastAPI()

# ✅ Add CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Replace with your Azure details
AZURE_SUBSCRIPTION_KEY = "12OraUPwInb9Gb0LyCQycn4uoAxuFRQWLYR1j1aPIe5DiwXDCC5EJQQJ99BBACYeBjFXJ3w3AAAEACOG7sdg"
AZURE_ENDPOINT = "https://hacktest2211.cognitiveservices.azure.com/"  
AZURE_DESCRIBE_URL = f"{AZURE_ENDPOINT}/vision/v3.2/describe"

# 🔹 API route for URL-based image analysis
@app.post("/analyze/url/")
async def analyze_image_url(image_url: str):
    headers = {
        "Ocp-Apim-Subscription-Key": AZURE_SUBSCRIPTION_KEY,
        "Content-Type": "application/json"
    }
    data = {"url": image_url}
    
    response = requests.post(AZURE_DESCRIBE_URL, headers=headers, json=data)

    if response.status_code == 200:
        result = response.json()
        return {"description": result["description"]["captions"][0]["text"]}
    else:
        return {"error": response.json()}

# 🔹 API route for local file upload
@app.post("/analyze/upload/")
async def analyze_image_upload(file: UploadFile = File(...)):
    headers = {"Ocp-Apim-Subscription-Key": AZURE_SUBSCRIPTION_KEY}

    image_data = await file.read()

    response = requests.post(AZURE_DESCRIBE_URL, headers=headers, files={"file": io.BytesIO(image_data)})

    if response.status_code == 200:
        result = response.json()
        return {"description": result["description"]["captions"][0]["text"]}
    else:
        return {"error": response.json()}
