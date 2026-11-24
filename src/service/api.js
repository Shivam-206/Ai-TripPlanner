import { auth } from "./firebaseConfig";

async function getFirebaseIdToken() {
  await auth.authStateReady();

  const user = auth.currentUser;
  if (!user) {
    const error = new Error("Not signed in");
    error.status = 401;
    throw error;
  }

  return user.getIdToken();
}

export async function apiRequest(path, options = {}) {
  const token = await getFirebaseIdToken();
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.error || "Request failed");
    error.status = response.status;
    throw error;
  }

  return data;
}

export async function apiImageRequest(path) {
  const token = await getFirebaseIdToken();
  const response = await fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const error = new Error(data?.error || "Image request failed");
    error.status = response.status;
    throw error;
  }

  return response.blob();
}

export function verifySession() {
  return apiRequest("/api/auth/verify", { method: "POST" });
}
