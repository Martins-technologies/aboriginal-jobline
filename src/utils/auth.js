import { useAuth } from "../lib/auth/AuthContext";
import { readSession, clearSession } from "../lib/auth/session";

// Backwards compatibility functions that bridge to Context where appropriate
export function getSession() {
  return readSession();
}

export function signIn({ email, username, role, remember }) {
  // Static helper fallback - normally components should call signIn from useAuth()
  const session = {
    email,
    username,
    role,
    signedInAt: new Date().toISOString(),
  };
  localStorage.setItem("servicecare.session", JSON.stringify({ user: session }));
  window.dispatchEvent(new Event("auth-changed"));
  return session;
}

export function signOut() {
  clearSession();
  window.dispatchEvent(new Event("auth-changed"));
}

export function useSession() {
  try {
    const { session, profile } = useAuth();
    if (!session) return null;
    return {
      email: profile?.email || session.user?.email || "",
      username: profile?.full_name || session.user?.full_name || "",
      role: profile?.role || session.user?.role || "",
    };
  } catch (e) {
    // Fallback if not wrapped in context provider
    const cached = readSession();
    if (cached) {
      const user = cached.user || {};
      return {
        email: user.email || "",
        username: user.full_name || user.username || "",
        role: user.role || "",
      };
    }
    return null;
  }
}
