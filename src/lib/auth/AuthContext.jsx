import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";
import { clearSession, readSession, writeSession } from "./session";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const cached = readSession();
    if (cached) {
      return {
        accessToken: cached.accessToken || cached.access_token,
        refreshToken: cached.refreshToken || cached.refresh_token,
        expiresAt: cached.expiresAt || cached.expires_at,
        user: cached.user,
        profile: cached.profile,
      };
    }
    return null;
  });

  const [loadingProfile, setLoadingProfile] = useState(false);

  // Synchronize session state to local storage
  useEffect(() => {
    if (session) {
      writeSession(session);
    } else {
      clearSession();
    }
  }, [session]);

  // Load full user profile details upon token changes
  useEffect(() => {
    if (session?.accessToken && !session.profile) {
      let active = true;
      setLoadingProfile(true);
      api("/v1/auth/me", {}, session.accessToken)
        .then((profileData) => {
          if (active) {
            setSession((curr) => curr ? { ...curr, profile: profileData } : null);
          }
        })
        .catch((err) => {
          console.error("Failed to load profile, signing out", err);
          if (active) {
            signOut();
          }
        })
        .finally(() => {
          if (active) setLoadingProfile(false);
        });
      return () => {
        active = false;
      };
    }
  }, [session?.accessToken]);

  const signIn = async (email, password) => {
    const data = await api("/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const mapped = {
      accessToken: data.session?.access_token || data.session?.accessToken,
      refreshToken: data.session?.refresh_token || data.session?.refreshToken,
      expiresAt: data.session?.expires_at || data.session?.expiresAt,
      user: data.user,
      profile: null,
    };

    setSession(mapped);
    return mapped;
  };

  const signUp = async (email, password, fullName, role) => {
    return api("/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        full_name: fullName,
        role,
      }),
    });
  };

  const refresh = async () => {
    if (!session?.refreshToken) return;
    try {
      const data = await api("/v1/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refresh_token: session.refreshToken }),
      });
      const mapped = {
        accessToken: data.session?.access_token || data.session?.accessToken,
        refreshToken: data.session?.refresh_token || data.session?.refreshToken,
        expiresAt: data.session?.expires_at || data.session?.expiresAt,
        user: data.user,
        profile: data.user,
      };
      setSession(mapped);
    } catch (e) {
      console.error("Token refresh failed, signing out", e);
      signOut();
    }
  };

  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        profile: session?.profile || session?.user || null,
        loading: loadingProfile,
        signIn,
        signUp,
        signOut,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export default AuthContext;
