import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "@/service/firebaseConfig";

function RequireAuth({ children }) {
  const [authState, setAuthState] = useState({
    ready: false,
    user: null,
    error: null,
  });

  useEffect(() => {
    return onAuthStateChanged(
      auth,
      (user) => setAuthState({ ready: true, user, error: null }),
      (error) => setAuthState({ ready: true, user: null, error }),
    );
  }, []);

  if (!authState.ready) {
    return (
      <div role="status" className="p-10 text-center">
        Checking your session...
      </div>
    );
  }

  if (authState.error) {
    return (
      <div role="alert" className="p-10 text-center">
        Unable to verify your session. Please try again.
      </div>
    );
  }

  if (!authState.user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RequireAuth;
