# Streamlined Architecture for 8-Hour Development

## Project Structure

```dir
/pages
  index.js                    # Landing page with crime feed
  /auth
    login.js                  # Simple login/signup
  /crime
    report.js                # Crime reporting form
    [id].js                  # Individual crime view
  /api
    /crime
      report.js             # Handle crime reporting
      feed.js              # Get paginated crime feed
    /auth
      verify.js           # Basic auth endpoints
    azure-cv.js          # Computer vision integration

/components
  CrimeMap.js           # Heatmap component
  CrimeCard.js          # Card for displaying crimes
  ReportForm.js         # Crime reporting form
  Header.js             # Navigation header

/lib
  firebase.js          # Firebase configuration
  azure.js            # Azure CV configuration
```

## Key Technical Decisions

1. Authentication:

   - Use Firebase phone auth only
   - Skip email verification to save time
   - Store minimal user data

2. Database Schema (Firestore):

```javascript
crimes: {
  id: string,
  location: GeoPoint,
  imageUrl: string,
  description: string,      // From Azure CV
  timestamp: timestamp,
  userId: string,
  verificationScore: number
}

comments: {
  crimeId: string,
  userId: string,
  text: string,
  proofUrl: string,        // Required proof image
  timestamp: timestamp
}
```

3. API Routes:

   - /api/crime/report: POST - Create new crime report
   - /api/crime/feed: GET - Fetch paginated crime feed
   - /api/vote: POST - Handle verification votes

4. Azure CV Integration:
   - Single endpoint for image analysis
   - Cache results in Firestore
   - Use scene description + object detection

## Performance Optimizations

1. Image Handling:

   - Client-side image compression before upload
   - Generate thumbnails for feed view
   - Lazy load images in feed

2. Data Loading:
   - Implement infinite scroll
   - Cache first page results
   - Real-time updates only for nearby crimes

## Winning Features

1. Smart Verification:

   - Weight votes based on user proximity to crime location
   - Auto-verification through image similarity with other reports
   - Real-time notification for nearby verified crimes

2. Visual Impact:

   - Clean, minimal UI focusing on map and images
   - Smooth animations for votes and updates
   - Mobile-first design for demo impact

3. Demo Flow:
   - Preset test data for realistic demo
   - Prepared crime scenarios for live reporting
   - Quick stats dashboard for impact
