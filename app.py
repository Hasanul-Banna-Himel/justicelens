from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
from transformers import BlipProcessor, BlipForConditionalGeneration
import torch

app = FastAPI(
    title="AI Image Description API",
    description="Generate AI-powered descriptions for images",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading AI model...")
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")

device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)
print(f"Model loaded successfully on {device}")


def generate_description(image: Image.Image, detail_level: str = "normal") -> str:
    """Generate description for an image"""
    if detail_level == "short":
        max_length = 20
    elif detail_level == "detailed":
        max_length = 100
    else:
        max_length = 50
    
    inputs = processor(image, return_tensors="pt").to(device)
    outputs = model.generate(**inputs, max_length=max_length, num_beams=5)
    description = processor.decode(outputs[0], skip_special_tokens=True)
    
    return description


@app.post("/api/describe")
async def describe_image(
    image: UploadFile = File(..., description="Image file to describe"),
    detail_level: str = Form(default="normal", description="Detail level: short, normal, or detailed")
):
    """Upload an image file and get AI-generated description"""
    try:
        if detail_level not in ["short", "normal", "detailed"]:
            raise HTTPException(status_code=400, detail="Invalid detail_level. Use: short, normal, or detailed")
        
        contents = await image.read()
        pil_image = Image.open(io.BytesIO(contents)).convert('RGB')
        
        description = generate_description(pil_image, detail_level)
        
        width, height = pil_image.size
        
        return {
            "success": True,
            "description": description,
            "image_info": {
                "filename": image.filename,
                "width": width,
                "height": height,
                "content_type": image.content_type
            },
            "detail_level": detail_level
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
