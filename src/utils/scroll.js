function navOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--nav-height");
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed * 16 : 72;
}

export function scrollToTopInstant() {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  html.style.scrollBehavior = previous;
}

export function scrollToId(id, { behavior = "smooth" } = {}) {
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - navOffset();
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}
