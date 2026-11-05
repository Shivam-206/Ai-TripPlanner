# AI Trip Planner

Plan your next trip with the help of AI. **AI Trip Planner** is a React web application that generates personalized travel plans based on your destination, trip duration, budget, and travel group.

<p align="center">
  <a href="https://ai-trip-planner-rho-vert.vercel.app/"><strong>🚀 Open Live Demo</strong></a>
</p>

## Overview

Instead of spending hours researching where to go, AI Trip Planner helps you get started with an AI-generated itinerary. Enter your travel preferences, generate a trip plan, and revisit your saved trips whenever you need them.

## Features

- **Personalized trip generation:** Generate a travel plan based on destination, number of days, budget, and traveller type.
- **AI-generated itinerary:** Get a day-wise schedule with suggested places, visit timings, descriptions, and travel-time details.
- **Hotel suggestions:** View hotel recommendations included in the generated trip data.
- **Google sign-in:** Authenticate using your Google account through Firebase Authentication.
- **Save your trips:** Store generated trip details in Cloud Firestore.
- **My Trips:** View trips saved to your account.
- **Trip details page:** Open a saved trip and review its itinerary.
- **Destination images:** Retrieve place photos using the Google Places API.
- **Responsive interface:** Built with Tailwind CSS for a layout that adapts to different screen sizes.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React | Building the user interface |
| Vite | Development server and production build |
| Tailwind CSS | Styling and responsive layouts |
| shadcn/ui | UI components |
| Google Gemini API | Generating trip plans and itinerary data |
| Firebase Authentication | Google sign-in |
| Cloud Firestore | Saving and retrieving user trips |
| Google Places API (New) | Searching places and retrieving photos |
| Axios | Making API requests |
| React Router | Client-side navigation |
| Sonner | Toast notifications |

## How It Works

1. Open the application and go to **Create Trip**.
2. Enter a destination, trip duration, budget, and traveller type.
3. Sign in with Google when prompted.
4. The application sends the travel preferences to the Gemini API.
5. Gemini returns structured trip data, including hotel suggestions and a day-wise itinerary.
6. The trip is saved in Cloud Firestore under the signed-in user's account.
7. Open **My Trips** to find and revisit your saved plans.

## Getting Started

### Prerequisites

Make sure you have the following installed or configured:

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- A Google Gemini API key
- A Firebase project with Authentication and Cloud Firestore enabled
- A Google Cloud project with Places API (New) enabled

### 1. Clone the repository

```bash
git clone https://github.com/Shivam-206/Ai-TripPlanner.git
cd Ai-TripPlanner
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GOOGLE_PLACE_API_KEY=your_google_places_api_key
```

Replace the placeholder values with your own API keys. Do not commit your real API keys or `.env.local` file to GitHub.

### 4. Configure Firebase

Create or select a Firebase project and:

1. Register a Web App in Firebase.
2. Enable **Google** as a sign-in provider in Authentication.
3. Create a Cloud Firestore database.
4. Add your Firebase web app configuration to `src/service/firebaseConfig.jsx`.
5. Configure Firestore security rules so users can only access their own trip documents.
6. Add your deployed domain to Firebase Authentication's authorized domains.

### 5. Configure Google Places API

In Google Cloud Console, enable **Places API (New)** and use its API key for `VITE_GOOGLE_PLACE_API_KEY`. Restrict the key to the required API and your development/production website referrers. Follow Google's current billing requirements for the API.

### 6. Run the development server

```bash
npm run dev
```

Open the local URL printed in your terminal (usually `http://localhost:5173`).

### 7. Create a production build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Environment Variables on Vercel

The live application is deployed on Vercel. To configure its API keys:

1. Open your project in the [Vercel Dashboard](https://vercel.com/dashboard).
2. Go to **Settings → Environment Variables**.
3. Add `VITE_GEMINI_API_KEY` and `VITE_GOOGLE_PLACE_API_KEY`.
4. Redeploy the application so the new values are included in the build.

> **Security note:** Vite variables prefixed with `VITE_` are included in the client-side bundle. They are not private server secrets. Use API restrictions, quotas, and appropriate security rules. Never put service-account credentials or other privileged secrets in frontend code.

## Project Structure

A simplified view of the main application areas:

```text
src/
├── components/       # Shared UI and application components
├── constants/        # Prompt and selection options
├── service/          # Gemini, Firebase, and Places API setup
├── create-trip/      # Trip creation flow
├── my-trips/         # Saved trips page
└── view-trip/        # Generated trip details and itinerary
```

*Folder names may vary as the project evolves.*

## Live Demo

Try the deployed application here:

**[https://ai-trip-planner-rho-vert.vercel.app/](https://ai-trip-planner-rho-vert.vercel.app/)**

## Screenshots

Screenshots of the application can be added here to show the home page, trip creation form, generated itinerary, and saved trips dashboard.

## Future Improvements

- Add richer recommendations for local restaurants and food.
- Include estimated trip costs and transportation options.
- Add practical destination-specific travel tips.
- Improve itinerary customization and editing.
- Add more detailed trip planning and sharing options.

## Contributing

This is a personal learning and portfolio project. Suggestions and feedback are welcome. If you find an issue, feel free to open a GitHub issue.

## Author

**Shivam Chaudhary**

- GitHub: [@Shivam-206](https://github.com/Shivam-206)
- Project Repository: [Ai-TripPlanner](https://github.com/Shivam-206/Ai-TripPlanner)
- Live Demo: [AI Trip Planner](https://ai-trip-planner-rho-vert.vercel.app/)

---

If you find this project useful, consider giving the repository a ⭐.
