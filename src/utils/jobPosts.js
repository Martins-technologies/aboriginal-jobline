const STORAGE_KEY = "aboriginal-jobline-job-posts";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveJobPost(post) {
  const current = readAll();
  current.unshift(post);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return post;
}
