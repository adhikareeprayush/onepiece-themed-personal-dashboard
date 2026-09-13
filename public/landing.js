const reveals = document.querySelectorAll(".land-reveal:not(.land-hero-copy)");

if (reveals.length && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

const session = await fetch("/api/session").then((r) => r.json()).catch(() => ({ authenticated: false }));
if (session.authenticated) window.location.replace("/app");
