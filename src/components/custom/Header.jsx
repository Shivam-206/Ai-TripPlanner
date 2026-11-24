import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/service/firebaseConfig";
import { verifySession } from "@/service/api";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
      } else {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          picture: firebaseUser.photoURL,
        });
      }

      setAuthReady(true);
    });

    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
      setOpenDialog(false);
      await verifySession();
    } catch (error) {
      console.error("Google login failed:", error);
      if (auth.currentUser) {
        toast.error("Signed in, but the server could not verify your session.", {
          description: error.message,
        });
      } else if (error.code !== "auth/popup-closed-by-user") {
        toast.error("Google login failed", {
          description: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed", {
        description: error.message,
      });
    }
  };

  return (
    <>
      <div className="p-3 shadow-sm flex justify-between items-center px-5">
        <img src="/logo.svg" alt="logo" />

        <div>
          {authReady && user ? (
            <div className="flex flex-wrap items-center justify-end gap-3">
              <Link to="/create-trip">
                <Button variant="outline" className="rounded-full">
                  + Create Trip
                </Button>
              </Link>

              <Link to="/my-trips">
                <Button variant="outline" className="rounded-full">
                  My Trips
                </Button>
              </Link>

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
          ) : authReady ? (
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
          ) : null}
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
