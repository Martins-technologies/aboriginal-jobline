const KEY = "aboriginal.session";

export function readSession() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeSession(session) {
  try {
    localStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem("servicecare.session");
  } catch {
    /* ignore */
  }
}

export function getStoredAccessToken() {
  const cached = readSession();
  return cached?.accessToken || cached?.access_token || null;
}
