import { db } from "@/service/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import {
  SelectBudgetOptions,
  SelectTravelesList,
} from "../constants/options.jsx";
import { toast } from "sonner";
import { generateAIResponse, AI_PROMPT } from "@/service/AIModel.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/service/firebaseConfig";

function CreateTrip() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelers, setTravelers] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Generate trip using Gemini

    const generateTrip = async (signedInUser) => {
    // Wait until Firebase has finished restoring the saved session
    await auth.authStateReady();
    const firebaseUser = signedInUser || auth.currentUser;

    if (!firebaseUser) {
      setOpenDialog(true);
      toast.error("Please login before generating your trip.");
      return;
    }

    try {
      setLoading(true);

      toast.info("Generating your trip...");

      const FINAL_PROMPT = AI_PROMPT.replace("{location}", destination.trim())
        .replace("{days}", days)
        .replace("{budget}", budget)
        .replace("{travelers}", travelers);

      const result = await generateAIResponse(FINAL_PROMPT);

      console.log("Generated Trip JSON:", result);

      const docRef = await addDoc(collection(db, "AITrips"), {
        userId: firebaseUser.uid,
        userEmail: firebaseUser.email,
        userSelection: {
          destination: destination.trim(),
          days: Number(days),
          budget,
          travelers,
        },
        tripData: result,
        createdAt: serverTimestamp(),
      });

      console.log("Trip saved with ID:", docRef.id);

      toast.success("Trip generated and saved successfully!");

      navigate("/view-trip/" + docRef.id);
    } catch (error) {
      console.error("Trip generation error:", error);

      toast.error("Failed to generate or save trip", {
        description: error.message || "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login and retrieve user profile
    const login = async () => {
    let user;
    try {
      const provider = new GoogleAuthProvider();
        // Firebase opens the Google sign-in popup, authenticates the user and returns a Firebase user object.
      const result = await signInWithPopup(auth, provider);
      user = result.user;

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: user.email,
          name: user.displayName,
          picture: user.photoURL,
        }),
      );

      toast.success("Google login successful!");
      setOpenDialog(false);
    } catch (error) {
      console.error("Google login error:", error.code, error.message);
      const messages = {
        "auth/popup-closed-by-user": "The sign-in window was closed before finishing.",
        "auth/cancelled-popup-request": "Another sign-in window was already open. Try again.",
        "auth/popup-blocked": "Your browser blocked the sign-in popup. Allow popups for this site and try again.",
        "auth/unauthorized-domain": "This domain is not authorised in Firebase. Add it under Authentication > Settings > Authorized domains (use localhost, not 127.0.0.1).",
        "auth/operation-not-allowed": "Google sign-in is not enabled in Firebase. Enable it under Authentication > Sign-in method.",
        "auth/network-request-failed": "Network error while signing in. Check your connection.",
      };

      if (error.code !== "auth/popup-closed-by-user") {
        toast.error("Login failed", {
          description: messages[error.code] || error.message,
        });
      }
      return;
    }

    // Login worked: continue into trip generation with the user we just got
    await generateTrip(user);
  };

  // Validate form and check authentication
  const handleGenerateTrip = async () => {
    if (!destination.trim()) {
      toast.error("Destination required", {
        description: "Please enter your destination.",
      });
      return;
    }

    if (
      !days ||
      !Number.isInteger(Number(days)) ||
      Number(days) < 1 ||
      Number(days) > 5
    ) {
      toast.error("Invalid duration", {
        description: "Choose between 1 and 5 days.",
      });
      return;
    }

    if (!budget) {
      toast.error("Budget required", {
        description: "Please select your budget.",
      });
      return;
    }

    if (!travelers) {
      toast.error("Travelers required", {
        description: "Please select your travel companions.",
      });
      return;
    }

    // Check whether user is logged in
    // Check Firebase Authentication
        await auth.authStateReady();
    if (!auth.currentUser) {
      setOpenDialog(true);
      return;
    }

    await generateTrip();
  };

  return (
    <div className="sm:mx-10 md:px-32 lg:px-56 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️ 🌴
      </h2>

      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 grid gap-16">
        {/* Destination */}
        <div>
          <h2 className="text-xl font-medium">
            What is destination of choice?
          </h2>

          <input
            type="text"
            list="destinations"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Select or enter a destination"
            className="mt-4 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          <datalist id="destinations">
            <option value="Japan" />
            <option value="Goa, India" />
            <option value="Manali, India" />
            <option value="Paris, France" />
            <option value="Dubai, UAE" />
            <option value="Bali, Indonesia" />
            <option value="London, United Kingdom" />
          </datalist>
        </div>

        {/* Number of days */}
        <div>
          <h2 className="text-xl font-medium">
            How many days are you planning your trip?
          </h2>

          <input
            type="number"
            min="1"
            max="5"
            value={days}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "" || (Number(value) >= 1 && Number(value) <= 5)) {
                setDays(value);
              }
            }}
            placeholder="Enter 1 to 5 days"
            className="mt-4 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          <p className="mt-2 text-sm text-gray-500">
            Maximum trip duration: 5 days
          </p>
        </div>

        {/* Budget */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item) => (
              <div
                key={item.id}
                onClick={() => setBudget(item.title)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
                  ${
                    budget === item.title
                      ? "border-black border-2 shadow-lg bg-gray-50"
                      : "border-gray-200"
                  }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your adventure?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            {SelectTravelesList.map((item) => (
              <div
                key={item.id}
                onClick={() => setTravelers(item.title)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
                  ${
                    travelers === item.title
                      ? "border-black border-2 shadow-lg bg-gray-50"
                      : "border-gray-200"
                  }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <p className="text-sm mt-2">{item.people}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Trip */}
      <div className="my-10 justify-end flex ">
        <button
          disabled={loading}
          type="button"
          onClick={handleGenerateTrip}
          className="mt-10 mb-10 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </button>
      </div>

      {/* Google Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Sign in with Google
            </DialogTitle>

            <DialogDescription className="text-center">
              Sign in securely to continue creating your personalized trip.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center my-4">
            <img src="/logo.svg" alt="App logo" className="h-12 w-auto" />
          </div>

          <button
            type="button"
            onClick={() => login()}
            className="w-full mt-3 p-3 border rounded-lg flex gap-3 items-center justify-center hover:bg-gray-100"
          >
            <FcGoogle className="h-7 w-7" />
            Sign In With Google
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
