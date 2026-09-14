import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, ApiError } from "../api";
import { isRecruiterRole, isSeekerRole } from "../mappers";
import { clearSession, readSession, writeSession } from "./session";

const AuthContext = createContext(null);

function normalizeSession(raw) {
  if (!raw) return null;
  return {
    accessToken: raw.accessToken || raw.access_token,
    refreshToken: raw.refreshToken || raw.refresh_token,
    expiresAt: raw.expiresAt || raw.expires_at,
    tokenType: raw.tokenType || raw.token_type,
    user: raw.user || null,
    profile: raw.profile || null,
  };
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => normalizeSession(readSession()));
  const [loading, setLoading] = useState(Boolean(readSession()?.accessToken || readSession()?.access_token));
  const [bootstrapped, setBootstrapped] = useState(false);

  const persist = useCallback((next) => {
    const mapped = normalizeSession(next);
    setSession(mapped);
    if (mapped?.accessToken) writeSession(mapped);
    else clearSession();
    return mapped;
  }, []);

  const signOut = useCallback(() => {
    persist(null);
  }, [persist]);

  const loadMe = useCallback(
    async (accessToken) => {
      const data = await api("/auth/me", { token: accessToken });
      return persist({
        accessToken,
        refreshToken: session?.refreshToken,
        expiresAt: session?.expiresAt,
        tokenType: session?.tokenType,
        user: data.user,
        profile: data.profile,
      });
    },
    [persist, session?.expiresAt, session?.refreshToken, session?.tokenType],
  );

  useEffect(() => {
    let active = true;
    const token = session?.accessToken;
    if (!token) {
      setLoading(false);
      setBootstrapped(true);
      return undefined;
    }
    setLoading(true);
    api("/auth/me", { token })
      .then((data) => {
        if (!active) return;
        persist({
          ...session,
          user: data.user,
          profile: data.profile,
        });
      })
      .catch(() => {
        if (active) persist(null);
      })
      .finally(() => {
        if (active) {
          setLoading(false);
          setBootstrapped(true);
        }
      });
    return () => {
      active = false;
    };
    // Only re-run when the access token changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.accessToken]);

  const applyAuthPayload = useCallback(
    async (data) => {
      const accessToken = data.session?.access_token;
      if (!accessToken) {
        persist(null);
        return {
          session: null,
          confirmationRequired: Boolean(data.confirmationRequired),
          user: data.user || null,
          company: data.company || null,
        };
      }
      const mapped = persist({
        accessToken,
        refreshToken: data.session?.refresh_token,
        expiresAt: data.session?.expires_at,
        tokenType: data.session?.token_type,
        user: data.user,
        profile: null,
      });
      try {
        const withProfile = await loadMe(accessToken);
        return { ...withProfile, confirmationRequired: false, company: data.company || null };
      } catch {
        return { ...mapped, confirmationRequired: false, company: data.company || null };
      }
    },
    [loadMe, persist],
  );

  const signIn = useCallback(
    async (email, password, expectedRole) => {
      const data = await api("/auth/sign-in", {
        method: "POST",
        body: { email, password },
      });
      const accessToken = data.session?.access_token;
      if (!accessToken) {
        persist(null);
        throw new ApiError({
          status: 401,
          code: "SIGN_IN_FAILED",
          message: "That email or password did not match our records.",
        });
      }

      const me = await api("/auth/me", { token: accessToken });
      const actualRole = me.profile?.role;

      const wantsSeeker = expectedRole === "job_seeker";
      const wantsEmployer = expectedRole === "recruiter";
      const isSeekerAccount = isSeekerRole(actualRole);
      const isEmployerAccount = isRecruiterRole(actualRole);

      if (wantsSeeker && !isSeekerAccount) {
        persist(null);
        throw new ApiError({
          status: 403,
          code: "ROLE_MISMATCH_SEEKER",
          message:
            "These credentials belong to an employer account. Use the Employer tab to sign in, or register a separate job seeker account with a different email.",
        });
      }
      if (wantsEmployer && !isEmployerAccount) {
        persist(null);
        throw new ApiError({
          status: 403,
          code: "ROLE_MISMATCH_EMPLOYER",
          message:
            "These credentials belong to a job seeker account. Use the Job Seeker tab to sign in, or register a separate employer account with a different email.",
        });
      }

      return persist({
        accessToken,
        refreshToken: data.session?.refresh_token,
        expiresAt: data.session?.expires_at,
        tokenType: data.session?.token_type,
        user: me.user,
        profile: me.profile,
      });
    },
    [persist],
  );

  const signUp = useCallback(
    async (payload) => {
      const data = await api("/auth/sign-up", {
        method: "POST",
        body: payload,
      });
      return applyAuthPayload(data);
    },
    [applyAuthPayload],
  );

  const role = session?.profile?.role || "";
  const value = useMemo(
    () => ({
      session,
      user: session?.user || null,
      profile: session?.profile || null,
      role,
      isAuthenticated: Boolean(session?.accessToken),
      isSeeker: isSeekerRole(role),
      isRecruiter: isRecruiterRole(role),
      loading,
      bootstrapped,
      signIn,
      signUp,
      signOut,
      refreshProfile: () => (session?.accessToken ? loadMe(session.accessToken) : Promise.resolve(null)),
    }),
    [bootstrapped, loadMe, loading, role, session, signIn, signOut, signUp],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
