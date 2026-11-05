import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/service/firebaseConfig";

function Header() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const userData = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        picture: firebaseUser.photoURL,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setOpenDialog(false);
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className="p-3 shadow-sm flex justify-between items-center px-5">
        <img src="/logo.svg" alt="logo" />

        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <a href="/create">
                <Button variant="outline" className="rounded-full">
                  + Create Trip
                </Button>
              </a>

              <a href="/my-trips">
                <Button variant="outline" className="rounded-full">
                  My Trips
                </Button>
              </a>

              <Popover>
                <PopoverTrigger>
                  <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold uppercase cursor-pointer">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                </PopoverTrigger>

                <PopoverContent>
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
          )}
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Sign in with Google
            </DialogTitle>

            <DialogDescription className="text-center">
              Sign in securely to create and manage your personalized trips.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center my-4">
            <img src="/logo.svg" alt="App logo" className="h-12 w-auto" />
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleLogin}
            className="w-full mt-3 p-3 border rounded-lg flex gap-3 items-center justify-center hover:bg-gray-100 disabled:opacity-50"
          >
            <FcGoogle className="h-7 w-7" />
            {loading ? "Signing in..." : "Sign In With Google"}
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;
