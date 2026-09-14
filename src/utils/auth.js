import { useAuth } from "../lib/auth/AuthContext";
import { clearSession, readSession } from "../lib/auth/session";

export function getSession() {
  return readSession();
}

export function signOut() {
  clearSession();
}

export function useSession() {
  try {
    const { session, profile, user } = useAuth();
    if (!session) return null;
    return {
      email: profile?.email || user?.email || "",
      username: profile?.full_name || user?.email || "",
      role: profile?.role || "",
    };
  } catch {
    const cached = readSession();
    if (!cached) return null;
    const user = cached.user || {};
    const profile = cached.profile || {};
    return {
      email: profile.email || user.email || "",
      username: profile.full_name || user.email || "",
      role: profile.role || "",
    };
  }
}
