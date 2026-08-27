export async function api(path, init = {}, token) {
  const baseUrl = (import.meta.env.VITE_API_URL || "http://localhost:4000/api").replace(/\/$/, "");
  const slug = import.meta.env.VITE_SITE_SLUG || "aboriginal-jobline";
  const url = `${baseUrl}${path}`;

  const headers = {
    "Content-Type": "application/json",
    "X-Site-Slug": slug,
    ...init.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}
