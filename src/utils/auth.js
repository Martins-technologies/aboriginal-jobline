import { useEffect, useState } from "react";

const STORAGE_KEY = "aboriginal-jobline-session";
const AUTH_EVENT = "auth-changed";

export function getSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function signIn({ email, username, role, remember }) {
  const session = {
    email,
    username,
    role,
    signedInAt: new Date().toISOString(),
  };
  const raw = JSON.stringify(session);

  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);

  if (remember) {
    localStorage.setItem(STORAGE_KEY, raw);
  } else {
    sessionStorage.setItem(STORAGE_KEY, raw);
  }

  window.dispatchEvent(new Event(AUTH_EVENT));
  return session;
}

export function signOut() {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function useSession() {
  const [session, setSession] = useState(getSession);

  useEffect(() => {
    const sync = () => setSession(getSession());
    window.addEventListener(AUTH_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(AUTH_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return session;
}
