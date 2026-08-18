import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToId, scrollToTopInstant } from "../../utils/scroll";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (!hash) {
      scrollToTopInstant();
      return;
    }

    const id = decodeURIComponent(hash.replace("#", ""));
    let frame = 0;
    let attempts = 0;

    const tryScroll = () => {
      if (scrollToId(id)) return;
      attempts += 1;
      if (attempts < 24) {
        frame = requestAnimationFrame(tryScroll);
      } else {
        scrollToTopInstant();
      }
    };

    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
