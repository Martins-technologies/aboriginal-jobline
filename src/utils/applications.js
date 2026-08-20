const STORAGE_KEY = "aboriginal-jobline-applications";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(applications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

export function getApplications() {
  return readAll();
}

export function getApplication(jobId) {
  return readAll().find((item) => item.jobId === jobId) || null;
}

export function saveApplication(application) {
  const current = readAll().filter((item) => item.jobId !== application.jobId);
  current.unshift(application);
  writeAll(current);
  return application;
}
